'use client';

import { useState } from 'react';
import ShinyButton from './shiny-button';
import { TextScramble } from './text-scramble';

export type HeroWithLogosProps = {
  badge?: string;
  titleLead?: string;
  titleAccent?: string;
  subtitle?: string;
  applyHref?: string;
  applyLabel?: string;
};

export function HeroWithLogos({
  badge = 'Myntra presents · Invite-only · July 17',
  titleLead = 'Women in ',
  titleAccent = 'Tech',
  subtitle = 'The Leadership Circle — a curated, invite-only forum for women breaking barriers in technology.',
  applyHref = '#',
  applyLabel = 'Apply',
}: HeroWithLogosProps) {
  const [accentTrigger, setAccentTrigger] = useState(false);

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[linear-gradient(to_bottom,#06050c_0%,#12082a_38%,#4A2FD4_72%,#7B5CFF_88%)] md:min-h-[calc(100vh-64px)]">
      <div className="absolute left-1/2 top-[calc(100%-90px)] h-[500px] w-[700px] -translate-x-1/2 rounded-[100%] border border-[#7B5CFF]/40 bg-black bg-[radial-gradient(closest-side,#000_82%,#9560EB)] md:top-[calc(100%-150px)] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-full" />

      <div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b border-white/10">
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="col-span-1 flex h-full items-center justify-center border-x border-white/10" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>

      <figure className="pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full bg-[#AE33FF]/30 blur-[200px]" />
      <figure className="pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden aspect-square w-[32vw] rounded-full bg-[#FF1FC0]/10 opacity-60 blur-[100px] md:block" />
      <figure className="pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden aspect-square w-[30vw] rounded-full bg-[#00E5FF]/10 opacity-50 blur-[100px] md:block" />

      <div className="relative z-10 flex min-h-[100dvh] flex-1 flex-col divide-y divide-white/10 md:min-h-[calc(100vh-64px)]">
        <div className="flex min-h-0 flex-none items-end justify-center px-4 pb-1 pt-3 md:min-h-[12vh] md:flex-1 md:px-10 md:pb-0 md:pt-0">
          <div className="flex items-center gap-2 border border-b-0 border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-sm md:px-4 md:py-2">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/50 md:text-[10px] md:tracking-[0.16em] lg:text-xs">
              {badge}
            </p>
          </div>
        </div>

        <div className="flex flex-none flex-col items-center justify-center px-4 py-3 md:flex-[1.6] md:px-10 md:py-10">
          <div className="flex w-full max-w-[80vw] flex-col items-center gap-3 md:max-w-3xl md:gap-5">
            <h1 className="text-pretty text-center font-[Parafina_Trial,Inter_Tight,sans-serif] text-[2.35rem] font-medium leading-[0.96] tracking-[-0.04em] text-white sm:text-5xl md:max-w-screen-lg md:text-7xl lg:text-[clamp(62px,9vw,96px)] lg:tracking-[-0.035em]">
              <TextScramble
                as="span"
                duration={0.52}
                speed={0.07}
                triggerOnView
                viewportThreshold={0.4}
                onScrambleComplete={() => setAccentTrigger(true)}
              >
                {titleLead}
              </TextScramble>
              <TextScramble
                as="span"
                className="bg-gradient-to-r from-[#FF1FC0] via-[#AE33FF] to-[#00E5FF] bg-clip-text text-transparent"
                duration={0.52}
                speed={0.07}
                trigger={accentTrigger}
              >
                {titleAccent}
              </TextScramble>
            </h1>
            <h2 className="max-w-2xl text-pretty text-center text-xs leading-relaxed text-white/60 md:text-lg">
              {subtitle}
            </h2>
          </div>
        </div>

        <div className="flex min-h-0 flex-none items-start justify-center px-4 pb-[11.5rem] pt-1 md:min-h-[12vh] md:flex-1 md:px-10 md:pb-14 md:pt-0">
          <div className="w-full max-w-[392px]">
            <ShinyButton
              id="hero-register-btn"
              href={applyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-full rounded-xl text-sm md:h-14 md:text-base"
            >
              {applyLabel}
            </ShinyButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroWithLogos;
