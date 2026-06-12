export const LUMA_EVENT_ID = 'evt-b2lMCTHMM9aJqbI';
export const LUMA_EVENT_PAGE_URL = `https://luma.com/event/${LUMA_EVENT_ID}`;
export const LUMA_IFRAME_EMBED_URL = `https://luma.com/embed/event/${LUMA_EVENT_ID}/simple`;
export const LUMA_CHECKOUT_SCRIPT_URL = 'https://embed.lu.ma/checkout-button.js';

/** @deprecated use LUMA_EVENT_PAGE_URL */
export const LUMA_REGISTER_DEFAULT_URL = LUMA_EVENT_PAGE_URL;

export function toLumaIframeEmbedUrl(url: string = LUMA_EVENT_PAGE_URL) {
  if (url.includes('/embed/event/')) return url;

  const evtMatch = url.match(/evt-[A-Za-z0-9]+/);
  if (evtMatch) {
    return `https://luma.com/embed/event/${evtMatch[0]}/simple`;
  }

  const slugMatch = url.match(/luma\.com\/(?:event\/)?([^/?#]+)/i);
  if (slugMatch && slugMatch[1] !== 'embed') {
    return `https://luma.com/embed/event/${slugMatch[1]}/simple`;
  }

  return LUMA_IFRAME_EMBED_URL;
}

export type LumaCheckoutLinkProps = {
  href: string;
  className?: string;
  'data-luma-action': 'checkout';
  'data-luma-event-id': string;
};

export function getLumaCheckoutLinkProps(
  eventId: string = LUMA_EVENT_ID,
  href: string = LUMA_EVENT_PAGE_URL,
): LumaCheckoutLinkProps {
  return {
    href,
    className: 'luma-checkout--button',
    'data-luma-action': 'checkout',
    'data-luma-event-id': eventId,
  };
}

export function loadLumaCheckoutScript() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('luma-checkout')) return;

  const script = document.createElement('script');
  script.id = 'luma-checkout';
  script.src = LUMA_CHECKOUT_SCRIPT_URL;
  script.async = true;
  document.body.appendChild(script);
}

declare global {
  interface Window {
    WITOpenLumaOverlay?: (url?: string) => void;
  }
}

export function openLumaRegister(url: string = LUMA_EVENT_PAGE_URL) {
  if (typeof window !== 'undefined' && window.WITOpenLumaOverlay) {
    window.WITOpenLumaOverlay(url);
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}
