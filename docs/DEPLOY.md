# AMOTAX — Vercel + Supabase Hetzner

## 1. Supabase (`supabase.aamihe.com`)

Tabelas `amotax_*` na instância Hetzner (partilhada com o site aamihe; dados AMOTAX ficam só nas tabelas `amotax_*`).

**Opção A — no seu Mac (SSH):**

```bash
cd /Users/macbook/Desktop/APP/Amotax
bash scripts/supabase/apply-hetzner.sh
```

**Opção B — Studio:** https://supabase.aamihe.com → SQL Editor → colar `scripts/supabase/amotax-schema.sql` → Run.

Se `amotax_members` já existia: executar também `scripts/supabase/amotax-add-registration-kind.sql`.

**Chaves** (servidor: `grep ANON_KEY /opt/supabase-aamihe/docker/.env`):

| Variável | Valor |
|----------|--------|
| `EXPO_PUBLIC_SUPABASE_URL` | `https://supabase.aamihe.com` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | `ANON_KEY` do Hetzner |

### Local (porta 3005)

```bash
cp mobile/.env.example mobile/.env
# preencher ANON_KEY
npm run dev
```

Sem `.env`, a app usa só `AsyncStorage` (offline).

---

## 2. Vercel

1. Importar `SilvaChamo/Amotax`.
2. Environment Variables: as duas `EXPO_PUBLIC_SUPABASE_*` acima.
3. Deploy.

```bash
npm run build:web
```

---

## 3. Dev

```bash
npm install --prefix mobile
npm run dev
```

→ http://localhost:3005
