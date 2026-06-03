# AMOTAX — Associação Moçambicana de Moto Tax

Plataforma piloto (aplicativo móvel) para registo de mototaxistas, cotas mensais simbólicas, avisos e reuniões.

## Conteúdo da pasta

| Item | Descrição |
|------|-----------|
| `AMOTAX-Projecto-Piloto.docx` | Documento de projecto (Word) |
| `Ubuntu/` | Fontes oficiais do projecto |
| `mobile/` | Aplicativo Expo (React Native) |
| `scripts/generate-project-doc.mjs` | Regenerar o `.docx` |

## Identidade visual

- **Laranja:** `#E85D04` (primária)
- **Azul escuro:** `#0B2E4A` (primária)
- **Tipografia:** Ubuntu (Regular, Medium, Bold, Light)

## Executar o aplicativo

Na pasta **Amotax** (raiz):

```bash
npm install --prefix mobile
npm run dev
```

Abre o piloto na web em **http://localhost:3005**.

Alternativa (dentro de `mobile/`): `npm install` e `npm run dev`.

- **Android:** `npm run android` ou Expo Go no telemóvel
- **iOS:** `npm run ios` (macOS com Xcode)

## Piloto — credenciais de teste

| Função | Valor |
|--------|--------|
| Código SMS (OTP) | `123456` |
| Telefone admin | `840000000` ou `258840000000` |
| Cota mensal padrão | 100 MT |

### Fluxo membro

1. **Inscrever-me** → nome, telefone, zona, opt-in SMS  
2. OTP `123456`  
3. Aguardar activação (ou admin activa em **Painel**)  
4. **Cotas** → enviar foto do comprovativo  
5. **Reuniões** → confirmar presença  

### Fluxo administrador

1. Entrar com telefone admin → OTP `123456`  
2. **Painel de administração** → activar membros, aprovar cotas, publicar avisos, criar reuniões  

## Vercel + Supabase (piloto online)

Guia completo: **[docs/DEPLOY.md](docs/DEPLOY.md)**

- **Dev:** `npm run dev` → http://localhost:3005  
- **Produção:** Vercel + variáveis `EXPO_PUBLIC_SUPABASE_*`  
- **Dados partilhados:** Supabase (membros, cotas, avisos); sessão e lidas ficam no dispositivo  

## Próximas fases

- SMS real (provedor MZ) e M-Pesa / e-Mola  
- Site institucional AMOTAX  
- RLS/autenticação Supabase para produção  

## Regenerar documento Word

```bash
cd /Users/macbook/Desktop/APP/Amotax
node scripts/generate-project-doc.mjs
```
