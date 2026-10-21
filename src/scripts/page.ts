/**
 * Único JavaScript da página (~1 KB). O site funciona sem ele: links, FAQ e
 * botões de WhatsApp já vêm prontos no HTML. Aqui ficam só os detalhes de interação.
 */

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!toggle || !nav) return;

  const setOpen = (open: boolean) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    if (nav.classList.contains('is-open') && !nav.contains(target) && !toggle.contains(target)) setOpen(false);
  });
  matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

/** Sombra no cabeçalho e botão flutuante do WhatsApp, sem ouvir o evento de scroll. */
function initScrollState() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const waFloat = document.querySelector<HTMLElement>('[data-wa-float]');
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero || !('IntersectionObserver' in window)) {
    waFloat?.classList.add('is-visible');
    return;
  }

  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
  document.body.prepend(sentinel);

  new IntersectionObserver(([entry]) => {
    header?.classList.toggle('is-scrolled', !entry.isIntersecting);
  }).observe(sentinel);

  new IntersectionObserver(([entry]) => {
    waFloat?.classList.toggle('is-visible', !entry.isIntersecting);
  }).observe(hero);
}

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );
  items.forEach((el) => io.observe(el));
}

export function initPage() {
  initMenu();
  initScrollState();
  initReveal();
}
