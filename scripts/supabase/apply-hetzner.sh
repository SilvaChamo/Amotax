#!/usr/bin/env bash
# Aplica amotax-schema.sql no Postgres do Supabase Hetzner (supabase.aamihe.com).
# Executar no Mac, na raiz do repo Amotax: bash scripts/supabase/apply-hetzner.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
HOST="${AMOTAX_SSH_HOST:-37.27.17.25}"
PORT="${AMOTAX_SSH_PORT:-2234}"
SQL="${ROOT}/scripts/supabase/amotax-schema.sql"

echo "==> Enviar SQL para ${HOST}:${PORT}..."
scp -P "$PORT" "$SQL" "root@${HOST}:/root/amotax-schema.sql"

echo "==> Executar no Postgres (supabase-aamihe)..."
ssh "root@${HOST}" -p "$PORT" \
  "cd /opt/supabase-aamihe/docker && docker compose exec -T db psql -U postgres < /root/amotax-schema.sql"

echo "OK — tabelas amotax_* criadas. Use ANON_KEY de /opt/supabase-aamihe/docker/.env na app."
