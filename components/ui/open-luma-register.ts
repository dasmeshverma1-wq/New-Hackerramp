export const LUMA_EVENT_PAGE_URL = 'https://luma.com/9ztehhkj';
export const LUMA_EVENT_ID = 'evt-b2lMCTHMM9aJqbI';
export const LUMA_IFRAME_EMBED_URL = `https://luma.com/embed/event/${LUMA_EVENT_ID}/simple`;

/** @deprecated use LUMA_EVENT_PAGE_URL */
export const LUMA_REGISTER_DEFAULT_URL = LUMA_EVENT_PAGE_URL;

export function toLumaIframeEmbedUrl(url: string = LUMA_EVENT_PAGE_URL) {
  if (url.includes('/embed/event/')) return url;

  const evtMatch = url.match(/evt-[A-Za-z0-9]+/);
  if (evtMatch) {
    return `https://luma.com/embed/event/${evtMatch[0]}/simple`;
  }

  const slugMatch = url.match(/luma\.com\/([^/?#]+)/i);
  if (slugMatch && slugMatch[1] !== 'embed') {
    return `https://luma.com/embed/event/${slugMatch[1]}/simple`;
  }

  return LUMA_IFRAME_EMBED_URL;
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
