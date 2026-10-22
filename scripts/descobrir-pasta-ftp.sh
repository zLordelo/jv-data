#!/usr/bin/env bash
# Descobre, pelo FTP, a pasta que o domínio usa na Hostinger e grava em FTP_DIR
# (no arquivo $GITHUB_ENV quando roda no GitHub Actions).
#
# A pasta inicial da conta FTP muda conforme a conta:
#   - conta principal: abre em /home/uXXX, e o site fica em domains/<domínio>/public_html/
#     (o public_html dessa pasta é de outro site, não do domínio);
#   - conta do domínio: abre em domains/<domínio>, e o site fica em public_html/;
#   - conta criada dentro do site: já abre no public_html, e o site fica em ./
#
# Uso: SITE_URL=... FTP_HOST=... FTP_USERNAME=... FTP_PASSWORD=... [FTP_PROTOCOL=ftps]
#      [FTP_SERVER_DIR=pasta/] bash scripts/descobrir-pasta-ftp.sh
set -uo pipefail

domain="${SITE_URL#*://}"
domain="${domain%%/*}"
domain="${domain%%:*}"
domain="${domain#www.}"

curl_ftp=(curl -sS --max-time 30 -u "$FTP_USERNAME:$FTP_PASSWORD" --list-only)
if [ "${FTP_PROTOCOL:-ftps}" = "ftps" ]; then
  # Mesmo critério do envio: TLS obrigatório, sem exigir que o certificado bata com o IP.
  curl_ftp+=(--ssl-reqd -k)
fi
FTP_PORT="${FTP_PORT:-21}"

listar() { "${curl_ftp[@]}" "ftp://$FTP_HOST:$FTP_PORT/$1" 2> /dev/null; }
existe() { listar "$1" > /dev/null; }

raiz="$(listar "")" || {
  echo "::error title=FTP::Não foi possível listar a pasta inicial do FTP. Confira FTP_USERNAME e FTP_PASSWORD."
  exit 1
}
echo "Pastas na entrada do FTP: $(printf '%s' "$raiz" | tr '\r\n' '  ')"

if [ -n "${FTP_SERVER_DIR:-}" ]; then
  dir="$FTP_SERVER_DIR"
  echo "Usando a pasta definida na variável FTP_SERVER_DIR: $dir"
elif existe "domains/$domain/public_html/"; then
  dir="domains/$domain/public_html/"
elif existe "public_html/"; then
  dir="public_html/"
else
  dir="./"
fi

case "$dir" in */) ;; *) dir="$dir/" ;; esac
echo "Pasta do site no FTP: $dir"
if [ -n "${GITHUB_ENV:-}" ]; then
  echo "FTP_DIR=$dir" >> "$GITHUB_ENV"
fi
