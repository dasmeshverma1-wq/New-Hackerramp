import { createRoot } from 'react-dom/client';
import { LumaRegisterSection } from './luma-register-section';

const LUMA_DEFAULT = 'https://luma.com/9ztehhkj';

export function mountLumaRegisterSection() {
  const rootEl = document.getElementById('luma-register-root');
  if (!rootEl) return;

  const applyHref =
    rootEl.getAttribute('data-apply-url') ||
    rootEl.dataset.applyUrl ||
    LUMA_DEFAULT;
  const lumaEventId = rootEl.getAttribute('data-luma-event-id') || '';

  createRoot(rootEl).render(
    <LumaRegisterSection applyHref={applyHref} lumaEventId={lumaEventId} />,
  );
}
