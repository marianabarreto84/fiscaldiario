"""
Importa séries do banco SQLite do fiscaldeseries para o catálogo do fiscaldiario.

Uso:
    py scripts/import_series.py

Pré-requisitos:
    - config.js preenchido com SUPABASE_URL e SUPABASE_KEY
    - Tabela `catalog` criada no Supabase (ver README.md)
"""

import sqlite3
import json
import urllib.request
import urllib.error
import re
from pathlib import Path

# ─── Configuração ─────────────────────────────────────────────────────────────

SQLITE_PATH = r"C:\Users\maria\Documents\GitHub\fiscaldeseries\data\tracker.db"
CONFIG_JS   = Path(__file__).parent.parent / "config.js"

# ─── Lê credenciais do config.js ──────────────────────────────────────────────

def read_credentials():
    text = CONFIG_JS.read_text(encoding="utf-8")
    url = re.search(r"SUPABASE_URL\s*=\s*'([^']+)'", text)
    key = re.search(r"SUPABASE_KEY\s*=\s*'([^']+)'", text)

    if not url or not url.group(1).strip():
        raise SystemExit("❌  SUPABASE_URL não encontrada em config.js")
    if not key or not key.group(1).strip():
        raise SystemExit("❌  SUPABASE_KEY não encontrada em config.js")

    return url.group(1).strip(), key.group(1).strip()

# ─── Supabase helpers ─────────────────────────────────────────────────────────

def supabase_get(base_url, api_key, path, params=""):
    url = f"{base_url}/rest/v1/{path}{'?' + params if params else ''}"
    req = urllib.request.Request(url, headers={
        "apikey": api_key,
        "Authorization": f"Bearer {api_key}",
    })
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


def supabase_post(base_url, api_key, path, payload):
    url = f"{base_url}/rest/v1/{path}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={
        "Content-Type": "application/json",
        "apikey": api_key,
        "Authorization": f"Bearer {api_key}",
        "Prefer": "return=minimal",
    }, method="POST")
    with urllib.request.urlopen(req) as r:
        return r.status

# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    supabase_url, supabase_key = read_credentials()

    # Busca séries já cadastradas no catálogo
    print("Verificando catalogo existente...")
    existing = supabase_get(supabase_url, supabase_key, "catalog",
                            "category=eq.serie&select=name")
    existing_names = {row["name"].lower() for row in existing}
    print(f"  {len(existing_names)} serie(s) ja no catalogo.\n")

    # Lê séries e episódios do SQLite
    conn = sqlite3.connect(SQLITE_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("SELECT id, title FROM series ORDER BY title")
    series_list = cur.fetchall()

    inserted = 0
    skipped_existing = 0
    skipped_no_episodes = 0

    for series in series_list:
        name = series["title"]

        if name.lower() in existing_names:
            print(f"  [skip] {name} (ja existe)")
            skipped_existing += 1
            continue

        cur.execute("""
            SELECT season, episode_number, title
            FROM episode
            WHERE series_id = ? AND ignored = 0
            ORDER BY season, episode_number
        """, (series["id"],))
        episodes = cur.fetchall()

        if not episodes:
            print(f"  [skip] {name} (sem episodios)")
            skipped_no_episodes += 1
            continue

        items = [
            f"{ep['season']}x{str(ep['episode_number']).zfill(2)} - {ep['title']}"
            for ep in episodes
        ]

        payload = {
            "category": "serie",
            "name": name,
            "metadata": {},
            "items": items,
        }

        try:
            supabase_post(supabase_url, supabase_key, "catalog", payload)
            print(f"  [ok]   {name} ({len(items)} episodios)")
            inserted += 1
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"  [erro] {name}: HTTP {e.code} - {body}")

    conn.close()

    print(f"""
-----------------------------------
  Inseridas:     {inserted}
  Ja existiam:   {skipped_existing}
  Sem episodios: {skipped_no_episodes}
-----------------------------------""")


if __name__ == "__main__":
    main()
