import { createRoot } from 'react-dom/client';
import { HeroWithLogos } from './herowith-logos';

const LUMA_DEFAULT = 'https://luma.com/9ztehhkj';

export function mountHeroWithLogos() {
  const rootEl = document.getElementById('wit-hero-root');
  if (!rootEl) return;

  const applyHref =
    rootEl.getAttribute('data-apply-url') ||
    rootEl.dataset.applyUrl ||
    LUMA_DEFAULT;

  createRoot(rootEl).render(
    <HeroWithLogos
      applyHref={applyHref}
      badge="Myntra presents · Invite-only · July 17"
      subtitle="The Leadership Circle — an invite-only forum for women in tech. Apply for a seat; if you're accepted, you'll meet the speakers and leaders featured on this page."
    />,
  );
}
