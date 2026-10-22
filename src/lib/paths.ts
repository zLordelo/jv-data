/** Prefixa um caminho com o "base" do site. Na raiz do domínio, o base é "/". */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return base + path.replace(/^\//, '');
}
