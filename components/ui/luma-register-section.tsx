'use client';

import { useEffect } from 'react';
import { GradientBarsBackground } from './gradient-bars-background';
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
        <p className="mb-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/50 md:text-xs">
          {eyebrow}
        </p>
        <h2 className="luma-tab__title text-pretty text-center font-[Parafina_Trial,Inter_Tight,sans-serif] text-5xl font-medium leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[clamp(3rem,8vw,5.5rem)] lg:tracking-[-0.035em]">
          {titleLead}
          <span className="bg-gradient-to-r from-[#FF1FC0] via-[#AE33FF] to-[#00E5FF] bg-clip-text text-transparent">
            {titleAccent}
          </span>
        </h2>
        <p className="mx-auto mb-7 mt-5 max-w-2xl text-pretty text-center text-sm font-normal leading-relaxed text-white/60 md:text-lg">
          {description}
        </p>
        <div className="mx-auto flex w-full max-w-[392px] justify-center">
          <ShinyButton
            id="luma-tab-btn"
            href={applyHref}
            target="_blank"
            rel="noopener noreferrer"
            data-luma-action="checkout"
            {...(lumaEventId ? { 'data-luma-event-id': lumaEventId } : {})}
            className="luma-checkout--button h-14 w-full rounded-xl text-base"
          >
            {applyLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </ShinyButton>
        </div>
        <p className="mx-auto mt-5 max-w-md text-[11px] leading-relaxed text-white/45">
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
