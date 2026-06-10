'use client';

import { useState } from 'react';
import { revealProps } from './reveal-props';
import ShinyButton from './shiny-button';
import { TextScramble } from './text-scramble';

export type HeroWithLogosProps = {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  subtitle?: string;
  applyHref?: string;
  applyLabel?: string;
};

function HeroTitleHeadline({
  line1,
  line2,
  line3,
  className,
}: {
  line1: string;
  line2: string;
  line3: string;
  className?: string;
}) {
  const [midTrigger, setMidTrigger] = useState(false);
  const [accentTrigger, setAccentTrigger] = useState(false);

  return (
    <h1 className={className}>
      <span className="block">
        <TextScramble
          as="span"
          duration={0.52}
          speed={0.07}
          triggerOnView
          viewportThreshold={0.4}
          onScrambleComplete={() => setMidTrigger(true)}
        >
          {line1}
        </TextScramble>
      </span>
      <span className="block">
        <TextScramble
          as="span"
          duration={0.52}
          speed={0.07}
          trigger={midTrigger}
          onScrambleComplete={() => setAccentTrigger(true)}
        >
          {`${line2} `}
        </TextScramble>
        <TextScramble
          as="span"
          className="bg-gradient-to-r from-[#FF1FC0] via-[#AE33FF] to-[#00E5FF] bg-clip-text text-transparent"
          duration={0.52}
          speed={0.07}
          trigger={accentTrigger}
        >
          {line3}
        </TextScramble>
      </span>
    </h1>
  );
}

export function HeroWithLogos({
  badge = 'Myntra presents · Invite-only · July 17',
  titleLine1 = 'Women',
  titleLine2 = 'in',
  titleLine3 = 'Tech',
  subtitle = 'The Leadership Circle — a curated, invite-only forum for women breaking barriers in technology.',
  applyHref = '#',
  applyLabel = 'Apply',
}: HeroWithLogosProps) {

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

      {/* Mobile — single centered stack above details card */}
      <div className="wit-hero-mobile relative z-10 flex min-h-[100dvh] flex-col items-center justify-center gap-5 px-5 pb-[10.5rem] pt-8 md:hidden">
        <div
          {...revealProps(0, 'flex items-center gap-2 border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-sm')}
        >
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/50">
            {badge}
          </p>
        </div>

        <div
          {...revealProps(
            100,
            'flex w-full max-w-[88vw] flex-col items-center gap-3 text-center',
          )}
        >
          <HeroTitleHeadline
            line1={titleLine1}
            line2={titleLine2}
            line3={titleLine3}
            className="text-pretty font-[Parafina_Trial,Inter_Tight,sans-serif] text-[3rem] font-medium leading-[0.92] tracking-[-0.04em] text-white"
          />
          <h2 className="max-w-sm text-pretty text-xs leading-relaxed text-white/60">{subtitle}</h2>
        </div>

        <div {...revealProps(220, 'w-full max-w-[320px]')}>
          <ShinyButton
            id="hero-register-btn"
            href={applyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-full rounded-xl text-sm"
          >
            {applyLabel}
          </ShinyButton>
        </div>
      </div>

      {/* Desktop — three-band layout (unchanged) */}
      <div className="relative z-10 hidden min-h-[calc(100vh-64px)] flex-1 flex-col divide-y divide-white/10 md:flex">
        <div className="flex min-h-[12vh] flex-1 items-end justify-center px-10">
          <div
            {...revealProps(
              0,
              'flex items-center gap-2 border border-b-0 border-white/10 bg-black/20 px-4 py-2 backdrop-blur-sm',
            )}
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/50 lg:text-xs">
              {badge}
            </p>
          </div>
        </div>

        <div className="flex flex-[1.6] flex-col items-center justify-center px-10 py-10">
          <div
            {...revealProps(100, 'flex w-full max-w-3xl flex-col items-center gap-5')}
          >
            <HeroTitleHeadline
              line1={titleLine1}
              line2={titleLine2}
              line3={titleLine3}
              className="text-pretty text-center font-[Parafina_Trial,Inter_Tight,sans-serif] text-8xl font-medium leading-[0.92] tracking-[-0.04em] text-white md:max-w-screen-lg lg:text-[clamp(76px,11vw,116px)] lg:tracking-[-0.035em]"
            />
            <h2 className="max-w-2xl text-pretty text-center text-lg leading-relaxed text-white/60">
              {subtitle}
            </h2>
          </div>
        </div>

        <div className="flex min-h-[12vh] flex-1 items-start justify-center px-10 pb-14">
          <div {...revealProps(220, 'w-full max-w-[392px]')}>
            <ShinyButton
              id="hero-register-btn-desktop"
              href={applyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 w-full rounded-xl text-base"
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
