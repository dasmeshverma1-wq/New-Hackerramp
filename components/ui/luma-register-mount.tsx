import { createRoot } from 'react-dom/client';
import { LumaRegisterSection } from './luma-register-section';
import { LUMA_EVENT_ID, LUMA_EVENT_PAGE_URL } from './open-luma-register';

export function mountLumaRegisterSection() {
  const rootEl = document.getElementById('luma-register-root');
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
    <LumaRegisterSection applyHref={applyHref} lumaEventId={lumaEventId} />,
  );
}
