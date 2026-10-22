#!/usr/bin/env bash
# Confere o site publicado: abre a página inicial e testa cada imagem, fonte e
# arquivo que ela usa. Falha se algum não responder 200 e tenta explicar o motivo.
#
# Uso: SITE_URL=https://jvdata.com.br [SERVER_IP=1.2.3.4] [EXPECTED_VERSION=<commit>] bash scripts/verificar-publicacao.sh
# SERVER_IP é usado quando o domínio ainda não resolve no DNS da máquina que roda o script.
set -uo pipefail

site="${SITE_URL%/}"
scheme="${site%%://*}"
host="${site#*://}"
host="${host%%/*}"
port=443
[ "$scheme" = "http" ] && port=80
case "$host" in
  *:*) port="${host##*:}"; host="${host%%:*}" ;;
esac

curl_base=(curl -sS -k --max-time 20)

if ! getent ahosts "$host" > /dev/null; then
  ip="${SERVER_IP:-}"
  if [ -n "$ip" ] && ! [[ "$ip" =~ ^[0-9.]+$ ]]; then
    ip="$(getent ahostsv4 "$ip" | awk 'NR==1 {print $1}')"
  fi
  if [ -z "$ip" ]; then
    echo "::error title=Domínio não encontrado::$host não existe no DNS e não há IP do servidor para testar."
    exit 1
  fi
  echo "::warning title=DNS::$host ainda não resolve no DNS do GitHub; testando direto no IP do servidor."
  curl_base+=(--resolve "$host:$port:$ip")
fi

status() { "${curl_base[@]}" -o /dev/null -w '%{http_code}' "$1" 2> /dev/null || true; }

strict=()
for arg in "${curl_base[@]}"; do [ "$arg" = "-k" ] || strict+=("$arg"); done
if ! "${strict[@]}" -o /dev/null "$site/" 2> /dev/null; then
  echo "::warning title=SSL::Não foi possível abrir $site/ com certificado válido. Confira em hPanel > Segurança > SSL."
fi

html="$("${curl_base[@]}" -L "$site/" 2> /dev/null)"
if [ -z "$html" ]; then
  echo "::error title=Site fora do ar::$site/ não respondeu."
  exit 1
fi
if ! printf '%s' "$html" | grep -q 'data-cta="hero"'; then
  echo "::error title=Página diferente::$site/ respondeu, mas não com a página da JV Data (pode ser a página padrão da Hostinger)."
  exit 1
fi

# O envio grava versao.txt com o commit publicado. Se o site no ar mostrar outra
# versão (ou nenhuma), o FTP gravou numa pasta diferente da que o domínio usa.
if [ -n "${EXPECTED_VERSION:-}" ]; then
  versao="$("${curl_base[@]}" -f "$site/versao.txt" 2> /dev/null | tr -d '[:space:]' | cut -c1-40)"
  if [ "$versao" != "$EXPECTED_VERSION" ]; then
    echo "::error title=Versão errada no ar::O site em $site não é a versão que acabou de ser enviada (versao.txt: '${versao:-ausente}'). O FTP gravou em ${FTP_DIR:-uma pasta} que não é a usada pelo domínio. Defina a variável FTP_SERVER_DIR com a pasta do site (ex.: domains/${host#www.}/public_html/)."
    exit 1
  fi
  echo "Versão no ar confere com a enviada: $versao"
fi

# Arquivos usados pela página (src, srcset, href) mais os de indexação.
paths="$(printf '%s' "$html" | grep -oE '/(_astro|assets)/[^"'"'"' ,)]+' | sort -u)
/robots.txt
/sitemap-index.xml
/manifest.webmanifest"

total=0
falhas=()
while IFS= read -r path; do
  [ -z "$path" ] && continue
  total=$((total + 1))
  code="$(status "$site$path")"
  if [ "$code" != "200" ]; then
    falhas+=("$code $path")
  fi
done <<< "$paths"

echo "Arquivos testados: $total. Com erro: ${#falhas[@]}."
[ "${#falhas[@]}" -eq 0 ] && exit 0

printf '  %s\n' "${falhas[@]}"
primeiro="${falhas[0]#* }"

# Diagnóstico: os arquivos foram para uma subpasta public_html dentro da pasta do site?
if [ "$(status "$site/public_html$primeiro")" = "200" ]; then
  echo "::error title=Pasta errada no FTP::Os arquivos foram enviados para public_html/public_html. A conta FTP já abre dentro do public_html: crie a variável FTP_SERVER_DIR com o valor ./ e publique de novo."
elif [ "$(status "$site/_astro/.htaccess")" = "500" ] || [ "$(status "$site$primeiro")" = "500" ]; then
  echo "::error title=Erro no servidor::A pasta _astro responde com erro 500. O servidor recusou a configuração de _astro/.htaccess."
else
  echo "::error title=Arquivos não encontrados::${#falhas[@]} arquivo(s) usados pela página não foram encontrados no servidor (ex.: $primeiro). Confira no Gerenciador de Arquivos se a pasta _astro está dentro de public_html."
fi
exit 1
