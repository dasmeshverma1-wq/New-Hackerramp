import { createRoot } from 'react-dom/client';
import { MiniNavbar } from './mini-navbar';
import { LUMA_EVENT_ID, LUMA_EVENT_PAGE_URL } from './open-luma-register';

export function mountMiniNavbar() {
  const rootEl = document.getElementById('wit-mini-nav-root');
  if (!rootEl) return;

  const applyHref =
    rootEl.getAttribute('data-apply-url') ||
    rootEl.dataset.applyUrl ||
    LUMA_EVENT_PAGE_URL;

  const lumaEventId =
    rootEl.getAttribute('data-luma-event-id') ||
    rootEl.dataset.lumaEventId ||
    LUMA_EVENT_ID;

  createRoot(rootEl).render(
    <MiniNavbar applyHref={applyHref} lumaEventId={lumaEventId} applyId="nav-register-btn" />,
  );
}
