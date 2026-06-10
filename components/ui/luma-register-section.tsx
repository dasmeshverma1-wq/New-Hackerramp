'use client';

import { useEffect } from 'react';
import { GradientBarsBackground } from './gradient-bars-background';
import { revealProps } from './reveal-props';
import ShinyButton from './shiny-button';

const WIT_PURPLE = {
  bg: '#06050c',
  bar: 'rgb(123, 92, 255)',
};

export type LumaRegisterSectionProps = {
  applyHref?: string;
  lumaEventId?: string;
  eyebrow?: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  acceptanceNote?: string;
  applyLabel?: string;
};

export function LumaRegisterSection({
  applyHref = '#',
  lumaEventId = '',
  eyebrow = 'Women in Tech · The Leadership Circle',
  titleLead = 'Join ',
  titleAccent = 'Women in Tech',
  description =
    'An invite-only forum for women breaking barriers in technology. Limited to 100 seats at Myntra Campus — July 17, 2026.',
  acceptanceNote =
    'If your application is accepted, you\'ll join an intimate evening on campus — with time to meet the speakers and leadership circle featured above.',
  applyLabel = 'Apply for Women in Tech',
}: LumaRegisterSectionProps) {
  useEffect(() => {
    const initCheckout = () => {
      if (window.luma?.initCheckout) {
        window.luma.initCheckout();
      }
    };

    if (window.luma?.initCheckout) {
      initCheckout();
      return;
    }

    const script = document.getElementById('luma-checkout');
    if (script) {
      script.addEventListener('load', initCheckout);
      return () => script.removeEventListener('load', initCheckout);
    }
  }, []);

  return (
    <GradientBarsBackground
      id="luma-register"
      numBars={9}
      gradientFrom={WIT_PURPLE.bar}
      gradientTo="transparent"
      animationDuration={3.4}
      backgroundColor={WIT_PURPLE.bg}
      contentAlign="center"
      className="min-h-0 py-12 md:min-h-[100svh] md:py-0"
      overlayClassName="from-[#06050c]/40 via-[#06050c]/50 to-transparent"
      contentClassName="flex min-h-0 items-center justify-center px-5 py-10 sm:px-8 md:min-h-[100svh] md:py-20"
    >
      <div id="luma-tab" className="w-full max-w-3xl text-center">
        <p
          {...revealProps(0, 'mb-3.5 font-mono text-[length:var(--wit-eyebrow,12px)] font-bold uppercase tracking-[0.16em] text-white/50')}
        >
          {eyebrow}
        </p>
        <h2
          {...revealProps(
            80,
            'luma-tab__title text-pretty text-center font-[Parafina_Trial,Inter_Tight,sans-serif] text-[length:var(--wit-title,2.5rem)] font-medium leading-[0.96] tracking-[-0.04em] text-white sm:text-[length:var(--wit-title-hero,3rem)] md:text-[clamp(3rem,8vw,5.5rem)] md:tracking-[-0.035em]',
          )}
        >
          {titleLead}
          <span className="bg-gradient-to-r from-[#FF1FC0] via-[#AE33FF] to-[#00E5FF] bg-clip-text text-transparent">
            {titleAccent}
          </span>
        </h2>
        <p
          {...revealProps(
            160,
            'mx-auto mb-4 mt-5 max-w-2xl text-pretty text-center text-[length:var(--wit-body,1.125rem)] font-normal leading-relaxed text-white/62',
          )}
        >
          {description}
        </p>
        {acceptanceNote ? (
          <p
            {...revealProps(
              220,
              'mx-auto mb-7 max-w-xl text-pretty text-center text-[length:var(--wit-body-sm,1rem)] font-medium leading-relaxed text-white/72',
            )}
          >
            {acceptanceNote}
          </p>
        ) : (
          <div className="mb-7" aria-hidden="true" />
        )}
        <div {...revealProps(280, 'mx-auto flex w-full max-w-[392px] justify-center')}>
          <ShinyButton
            id="luma-tab-btn"
            href={applyHref}
            target="_blank"
            rel="noopener noreferrer"
            data-luma-action="checkout"
            {...(lumaEventId ? { 'data-luma-event-id': lumaEventId } : {})}
            className="luma-checkout--button h-14 w-full rounded-xl text-[length:var(--wit-body-sm,1rem)]"
          >
            {applyLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </ShinyButton>
        </div>
        <p
          {...revealProps(
            360,
            'mx-auto mt-5 max-w-md text-[length:var(--wit-caption,0.875rem)] leading-relaxed text-white/45',
          )}
        >
          By registering, you consent to Myntra storing and using your application data for event
          coordination for up to <strong className="text-white/55">6 months</strong>.
        </p>
      </div>
    </GradientBarsBackground>
  );
}

declare global {
  interface Window {
    luma?: { initCheckout: () => void };
  }
}

export default LumaRegisterSection;
