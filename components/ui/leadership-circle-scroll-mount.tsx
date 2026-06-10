import { createRoot } from 'react-dom/client';
import { LeadershipCircleScroll } from './scrolling-animation';

export function mountLeadershipCircleScroll() {
  const rootEl = document.getElementById('leadership-circle-scroll-root');
  if (!rootEl) return;

  createRoot(rootEl).render(
    <LeadershipCircleScroll
      eyebrow="About"
      title="The Leadership"
      titleAccent="Circle"
      tagline="Invite-only · 100 seats · Accepted guests meet this circle"
      brandLogoSrc="https://avatars.githubusercontent.com/u/3213662?s=280&v=4"
      brandLogoAlt="Myntra"
    />,
  );
}
