import { createRoot } from 'react-dom/client';
import { GradientBarsBackground } from './gradient-bars-background';
import { revealProps } from './reveal-props';

const WIT_PURPLE = {
  bg: '#06050c',
  bar: 'rgb(123, 92, 255)',
  barAlt: 'rgb(174, 51, 255)',
};

export function GradientBarsFooter() {
  return (
    <GradientBarsBackground
      numBars={9}
      gradientFrom={WIT_PURPLE.bar}
      gradientTo="transparent"
      animationDuration={3.4}
      backgroundColor={WIT_PURPLE.bg}
      className="pt-2"
      contentClassName="site-footer-inner"
      stableOverlay
      enableBarHover={false}
    >
      <footer className="site-footer">
        <div className="container">
          <div {...revealProps(0, 'footer-top')}>
            <div className="footer-brand-row">
              <img src="images/Frame 632872.svg" alt="mynnovAIte" />
              <div className="footer-brand-text">
                Women in Tech · The Leadership Circle
                <br />
                Myntra Campus · July 17, 2026
              </div>
            </div>
          </div>
          <div {...revealProps(100, 'footer-links')}>
            <a href="#about">About</a>
            <a href="#speakers">Speakers</a>
            <a href="#agenda">Agenda</a>
            <a href="#luma-register">Register</a>
            <a href="v2.html">Tech Week 2026</a>
            <a href="#" aria-label="Privacy policy placeholder">
              Privacy Policy
            </a>
            <a href="mailto:wit@myntra.com" aria-label="Contact the organising team">
              Contact
            </a>
          </div>
          <div
            {...revealProps(180, 'footer-bottom')}
            style={{ marginTop: 20, ...revealProps(180).style }}
          >
            <p className="footer-copy">
              © 2026 Myntra · Women in Tech · The Leadership Circle
            </p>
            <div className="footer-placeholders">
              <span>Corporate branding</span>
              <span>Partner logos</span>
              <span>Legal</span>
            </div>
          </div>
        </div>
      </footer>
    </GradientBarsBackground>
  );
}

export function mountGradientBarsFooter() {
  const rootEl = document.getElementById('gradient-bars-footer-root');
  if (!rootEl) return;

  createRoot(rootEl).render(<GradientBarsFooter />);
}
