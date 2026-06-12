import { createRoot } from 'react-dom/client';
import { LumaIframeOverlay } from './luma-iframe-overlay';
import { LUMA_EVENT_PAGE_URL } from './open-luma-register';

export function mountLumaOverlay() {
  const host = document.getElementById('luma-overlay-root');
  if (!host) return;

  host.removeAttribute('hidden');

  const defaultPageUrl =
    host.getAttribute('data-apply-url') ||
    host.dataset.applyUrl ||
    LUMA_EVENT_PAGE_URL;

  createRoot(host).render(<LumaIframeOverlay defaultPageUrl={defaultPageUrl} />);
}

if (typeof window !== 'undefined') {
  (window as Window & { WITLumaOverlayBundle?: { mountLumaOverlay: () => void } }).WITLumaOverlayBundle =
    { mountLumaOverlay };
}
