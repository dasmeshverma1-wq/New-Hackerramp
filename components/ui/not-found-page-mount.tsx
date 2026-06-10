import { createRoot } from 'react-dom/client';
import { NotFoundPage } from './not-found-page';

export function mountNotFoundPage() {
  const rootEl = document.getElementById('not-found-root');
  if (!rootEl) return;

  const homeHref = rootEl.getAttribute('data-home-href') || rootEl.dataset.homeHref || 'women-in-tech.html';
  const homeLabel =
    rootEl.getAttribute('data-home-label') || rootEl.dataset.homeLabel || 'Back to Women in Tech';

  createRoot(rootEl).render(<NotFoundPage homeHref={homeHref} homeLabel={homeLabel} />);
}
