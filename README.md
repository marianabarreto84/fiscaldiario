# Diário

Site serverless para log diário pessoal. Registre transporte, refeições, séries, filmes, leitura, trabalho, gastos e mais — com campos extras personalizados em cada entrada.

Acesse pelo celular ou computador. Dados ficam no `localStorage` por padrão; configure o Supabase para sincronizar entre dispositivos.

---

## Como rodar localmente

Abra o `index.html` diretamente no navegador, ou use um servidor local:

```bash
npx serve .
# ou
python -m http.server
```

---

## Deploy (GitHub Pages)

1. Vá em **Settings → Pages** no repositório
2. Selecione a branch `main` e pasta `/` (root)
3. Salve — o site fica disponível em `https://<seu-usuario>.github.io/fiscaldiario`

---

## Configurar Supabase (opcional, mas recomendado para usar no celular)

Sem Supabase, os dados ficam apenas no navegador atual. Com Supabase, você acessa de qualquer dispositivo.

### 1. Criar o projeto

1. Crie uma conta gratuita em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em **Settings → API** e copie:
   - **Project URL**
   - **anon public** key

### 2. Criar as tabelas

No **SQL Editor** do Supabase, execute:

```sql
create table log_entries (
  id            uuid        default gen_random_uuid() primary key,
  date          date        not null,
  type          text        not null,
  data          jsonb       not null default '{}',
  custom_fields jsonb       not null default '{}',
  position      integer,
  created_at    timestamptz default now()
);

create index on log_entries (date);

alter table log_entries enable row level security;

create policy "public access"
  on log_entries for all
  using (true)
  with check (true);

-- Catálogo (séries, álbuns, etc.)
create table catalog (
  id       uuid default gen_random_uuid() primary key,
  category text not null,
  name     text not null,
  metadata jsonb not null default '{}',
  items    jsonb not null default '[]'
);

alter table catalog enable row level security;

create policy "public access"
  on catalog for all
  using (true)
  with check (true);
```

### 3. Configurar o site

Edite o arquivo `config.js` e preencha suas credenciais:

```js
window.SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
window.SUPABASE_KEY = 'sua-anon-key-aqui';
```

---

## Tipos de registro

| Tipo | Campos principais |
|------|-------------------|
| 🚗 Transporte | Serviço, De/Para, Início/Fim, Valor |
| 🎵 Música | Artista, Álbum/Playlist, Faixas, Contexto |
| 📺 Série | Tipo (Série/Anime), Título, Temporada, Episódio, Período |
| 🎬 Filme | Tipo (Filme/Documentário), Título, Período |
| 💼 Trabalho | Horas trabalhadas, Descrição |
| 🎓 Mestrado | Categoria (Dissertação/Monitoria/Artigo), Horas, Descrição |
| 🍽️ Refeição | Refeição, Local, Via (Restaurante/Bar/IFood/…), Valor |
| 📚 Leitura | Tipo, Título, Autor, Formato (Físico/Ebook/Audiobook), Dispositivo, Progresso |
| 💸 Gasto | Descrição, Valor, Categoria |
| 📝 Nota | Texto livre |

Todos os tipos aceitam um campo **Obs** opcional e campos extras personalizados (chave + valor livre).

---

## Catálogo de séries

O script `scripts/sync_series.py` sincroniza as séries do banco SQLite do [fiscaldeseries](https://github.com/marianabarreto84/fiscaldeseries) com o catálogo do Supabase. Para cada série, armazena todos os episódios em `items` e o próximo não assistido em `metadata`, permitindo autocompletar temporada/episódio no formulário.

```bash
py scripts/sync_series.py
```

---

## Baixar dados

Use o botão ↓ no cabeçalho para baixar os registros de um dia ou período em JSON.

Com Supabase, também é possível exportar via SQL Editor. Exemplos:

```sql
-- Todos os registros de uma data
select * from log_entries where date = '2026-04-15';

-- Gastos do mês
select data->>'descricao' as descricao,
       (data->>'valor')::numeric as valor,
       data->>'categoria' as categoria,
       date
from log_entries
where type = 'gasto'
  and date >= '2026-04-01'
order by date;

-- Horas trabalhadas por dia
select date, data->>'horas' as horas
from log_entries
where type in ('trabalho', 'mestrado')
order by date;
```
