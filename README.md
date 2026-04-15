# Diário

Site serverless para log diário pessoal. Registre transporte, música, séries, trabalho, gastos e mais — com campos extras personalizados em cada entrada.

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

### 2. Criar a tabela

No **SQL Editor** do Supabase, execute:

```sql
create table log_entries (
  id          uuid        default gen_random_uuid() primary key,
  date        date        not null,
  type        text        not null,
  data        jsonb       not null default '{}',
  custom_fields jsonb     not null default '{}',
  created_at  timestamptz default now()
);

create index on log_entries (date);

-- Habilitar Row Level Security
alter table log_entries enable row level security;

-- Acesso público (para uso pessoal sem autenticação)
create policy "public access"
  on log_entries for all
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

| Tipo | Campos |
|------|--------|
| 🚗 Transporte | Serviço, Sentido, De/Para, Valor |
| 🎵 Música | Artista, Álbum/Playlist, Contexto |
| 📺 Série/Filme | Tipo, Título, Episódio, Período |
| 💼 Trabalho | Horas, Descrição |
| 🍽️ Refeição | Refeição, Local, Valor |
| 📚 Leitura | Tipo, Título, Autor |
| 💸 Gasto | Descrição, Valor, Categoria |
| 📝 Nota | Texto livre |

Qualquer tipo aceita campos extras personalizados (chave + valor livre).

---

## Exportar dados

Com Supabase, acesse o **Table Editor** ou use o SQL Editor para exportar. Exemplo:

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
select date, sum((data->>'horas')::numeric) as horas
from log_entries
where type = 'trabalho'
group by date
order by date;
```
