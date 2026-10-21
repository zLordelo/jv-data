/** Prefixa um caminho com o "base" do site (ex.: /jv-data/) para funcionar no GitHub Pages. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return base + path.replace(/^\//, '');
}
