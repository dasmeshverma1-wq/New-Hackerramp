import { createRoot } from 'react-dom/client';
import { MiniNavbar } from './mini-navbar';

const LUMA_DEFAULT = 'https://luma.com/9ztehhkj';

export function mountMiniNavbar() {
  const rootEl = document.getElementById('wit-mini-nav-root');
  if (!rootEl) return;

  const applyHref =
    rootEl.getAttribute('data-apply-url') ||
    rootEl.dataset.applyUrl ||
    LUMA_DEFAULT;

  createRoot(rootEl).render(
    <MiniNavbar applyHref={applyHref} applyId="nav-register-btn" />,
  );
}
