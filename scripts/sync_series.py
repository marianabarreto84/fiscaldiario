"""
Sincroniza series do banco SQLite do fiscaldeseries com o catalogo do fiscaldiario.

Para cada serie, armazena apenas os episodios a partir do primeiro nao assistido.
Assim o autocomplete no diario comeca exatamente de onde voce parou.

Uso:
    py scripts/import_series.py

Re-execute sempre que quiser atualizar o catalogo apos marcar episodios como vistos.
"""

import sqlite3
import json
import urllib.request
import urllib.error
import urllib.parse
import re
from pathlib import Path

# ─── Configuracao ─────────────────────────────────────────────────────────────

SQLITE_PATH = r"C:\Users\maria\Documents\GitHub\fiscaldeseries\data\tracker.db"
CONFIG_JS   = Path(__file__).parent.parent / "config.js"

# ─── Le credenciais do config.js ──────────────────────────────────────────────

def read_credentials():
    text = CONFIG_JS.read_text(encoding="utf-8")
    url = re.search(r"SUPABASE_URL\s*=\s*'([^']+)'", text)
    key = re.search(r"SUPABASE_KEY\s*=\s*'([^']+)'", text)
    if not url or not url.group(1).strip():
        raise SystemExit("SUPABASE_URL nao encontrada em config.js")
    if not key or not key.group(1).strip():
        raise SystemExit("SUPABASE_KEY nao encontrada em config.js")
    return url.group(1).strip(), key.group(1).strip()

# ─── Supabase helpers ─────────────────────────────────────────────────────────

def request(method, base_url, api_key, path, params="", payload=None):
    url = f"{base_url}/rest/v1/{path}{'?' + params if params else ''}"
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={
        "Content-Type": "application/json",
        "apikey": api_key,
        "Authorization": f"Bearer {api_key}",
        "Prefer": "return=minimal",
    })
    with urllib.request.urlopen(req) as r:
        body = r.read()
        return json.loads(body) if body else None

def get(base_url, key, path, params=""):
    return request("GET", base_url, key, path, params)

def post(base_url, key, path, payload):
    return request("POST", base_url, key, path, payload=payload)

def patch(base_url, key, path, params, payload):
    return request("PATCH", base_url, key, path, params=params, payload=payload)

# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    supabase_url, supabase_key = read_credentials()

    # Catalogo atual
    print("Carregando catalogo existente...")
    existing = get(supabase_url, supabase_key, "catalog",
                   "category=eq.serie&select=name")
    existing_names = {row["name"].lower() for row in (existing or [])}
    print(f"  {len(existing_names)} serie(s) ja no catalogo.\n")

    # Banco SQLite
    conn = sqlite3.connect(SQLITE_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("SELECT id, title FROM series ORDER BY title")
    series_list = cur.fetchall()

    inserted = updated = skipped = 0

    for series in series_list:
        name   = series["title"]
        s_id   = series["id"]

        # Todos os episodios da serie, em ordem
        cur.execute("""
            SELECT e.id, e.season, e.episode_number, e.title
            FROM episode e
            WHERE e.series_id = ? AND e.ignored = 0
            ORDER BY e.season, e.episode_number
        """, (s_id,))
        all_episodes = cur.fetchall()

        if not all_episodes:
            print(f"  [skip]    {name} (sem episodios)")
            skipped += 1
            continue

        # IDs ja assistidos
        ep_ids = [e["id"] for e in all_episodes]
        placeholders = ",".join("?" * len(ep_ids))
        cur.execute(f"""
            SELECT DISTINCT episode_id FROM watch_log
            WHERE episode_id IN ({placeholders})
        """, ep_ids)
        watched_ids = {row["episode_id"] for row in cur.fetchall()}

        # Encontra o primeiro nao assistido
        first_unwatched_idx = next(
            (i for i, e in enumerate(all_episodes) if e["id"] not in watched_ids),
            None
        )

        # Todos os episodios (para validacao de temporada/episodio no formulario)
        items = [
            f"{e['season']}x{str(e['episode_number']).zfill(2)} - {e['title']}"
            for e in all_episodes
        ]

        # Proximo episodio nao assistido (para pre-preenchimento do formulario)
        if first_unwatched_idx is None:
            metadata = {}
            label = f"{len(all_episodes)} ep(s), todos assistidos"
        else:
            next_ep = all_episodes[first_unwatched_idx]
            metadata = {
                "next_season":  next_ep["season"],
                "next_episode": next_ep["episode_number"],
            }
            label = f"{len(all_episodes)} ep(s), proximo: {next_ep['season']}x{str(next_ep['episode_number']).zfill(2)}"

        payload = {
            "category": "serie",
            "name": name,
            "metadata": metadata,
            "items": items,
        }

        name_encoded = urllib.parse.quote(name)

        try:
            if name.lower() in existing_names:
                patch(supabase_url, supabase_key, "catalog",
                      f"category=eq.serie&name=eq.{name_encoded}",
                      {"items": items})
                print(f"  [update]  {name} ({label})")
                updated += 1
            else:
                post(supabase_url, supabase_key, "catalog", payload)
                print(f"  [insert]  {name} ({label})")
                inserted += 1
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"  [erro]    {name}: HTTP {e.code} - {body}")

    conn.close()

    print(f"""
-----------------------------------
  Inseridas:     {inserted}
  Atualizadas:   {updated}
  Sem episodios: {skipped}
-----------------------------------""")


if __name__ == "__main__":
    main()
