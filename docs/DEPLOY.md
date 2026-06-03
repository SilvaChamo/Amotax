# AMOTAX — Vercel + Supabase

## 1. Supabase

1. Criar projecto em [supabase.com](https://supabase.com).
2. **SQL Editor** → colar e executar `scripts/supabase/amotax-schema.sql`.
3. **Project Settings → API** → copiar:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **anon public** → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### Local (porta 3005)

```bash
cp mobile/.env.example mobile/.env
# editar mobile/.env com URL e anon key
cd /Users/macbook/Desktop/APP/Amotax
npm run dev
```

Sem `.env`, a app usa só `AsyncStorage` (modo offline).

---

## 2. Vercel (produção web)

1. [vercel.com](https://vercel.com) → **Add New Project** → importar `SilvaChamo/Amotax`.
2. O `vercel.json` na raiz já define build e pasta `mobile/dist`.
3. **Environment Variables** (Production + Preview):

| Nome | Valor |
|------|--------|
| `EXPO_PUBLIC_SUPABASE_URL` | URL do projecto Supabase |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | chave anon |

4. **Deploy** → URL tipo `https://amotax-xxx.vercel.app`.

### Build local (testar antes do deploy)

```bash
npm run build:web
# ficheiros em mobile/dist
```

---

## 3. Desenvolvimento — porta 3005

Na raiz do repositório:

```bash
npm install --prefix mobile
npm run dev
```

Abrir **http://localhost:3005**

---

## Notas de segurança (piloto)

As políticas RLS actuais permitem leitura/escrita com a chave `anon` (adequado ao piloto). Antes de dados reais em escala, activar autenticação Supabase e políticas por utilizador.
