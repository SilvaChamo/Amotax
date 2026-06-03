#!/usr/bin/env bash
# Aplica amotax-schema.sql na instância Supabase Hetzner (supabase.aamihe.com).
# Uso: bash scripts/supabase/apply-on-aamihe-hetzner.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
HOST="${AMOTAX_HETZNER_HOST:-root@37.27.17.25}"
PORT="${AMOTAX_HETZNER_PORT:-2234}"
SQL="${ROOT}/scripts/supabase/amotax-schema.sql"
REMOTE_SQL="/root/amotax-schema.sql"
DOCKER_DIR="/opt/supabase-aamihe/docker"

echo "==> Enviar ${SQL}"
scp -P "$PORT" "$SQL" "${HOST}:${REMOTE_SQL}"

echo "==> Executar no Postgres (docker)"
ssh -p "$PORT" "$HOST" \
  "cd ${DOCKER_DIR} && docker compose exec -T db psql -U postgres < ${REMOTE_SQL}"

echo "OK — tabelas amotax_* na instância Hetzner."
