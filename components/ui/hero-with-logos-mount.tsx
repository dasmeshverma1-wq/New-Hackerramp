import { createRoot } from 'react-dom/client';
import { HeroWithLogos } from './herowith-logos';
import { LUMA_EVENT_ID, LUMA_EVENT_PAGE_URL } from './open-luma-register';

export function mountHeroWithLogos() {
  const rootEl = document.getElementById('wit-hero-root');
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
    <HeroWithLogos
      applyHref={applyHref}
      lumaEventId={lumaEventId}
      badge="Myntra presents · Invite-only · July 17"
      subtitle="An exclusive, invite-only forum for women in tech. Apply today to connect with executive leaders and keynote speakers."
    />,
  );
}
