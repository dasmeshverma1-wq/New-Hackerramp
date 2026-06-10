'use client';

import { useEffect, useRef, useState } from 'react';

export type ScrollProfile = {
  name: string;
  image: string;
};

export type LeadershipCircleScrollProps = {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  tagline?: string;
  brandLogoSrc?: string;
  brandLogoAlt?: string;
  profiles?: ScrollProfile[];
};

const LOGO_FADE_START = 0.04;
const LOGO_FADE_END = 0.16;
const CIRCLE_REVEAL_START = 0.05;
const SCROLL_HINT_IDLE_MS = 2000;

const LEADER_PLACEHOLDER_IMAGE = 'images/speakers/announced-soon-1.jpeg';

const defaultProfiles: ScrollProfile[] = Array.from({ length: 6 }, (_, index) => ({
  name: `Leader ${index + 1}`,
  image: LEADER_PLACEHOLDER_IMAGE,
}));

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function getMaxRadius() {
  if (typeof window === 'undefined') return 200;
  if (window.innerWidth < 640) return 130;
  if (window.innerWidth < 1024) return 200;
  if (window.innerWidth < 1280) return 300;
  return 318;
}

function getReleaseRatio() {
  if (typeof window === 'undefined') return 0.55;
  return window.innerWidth < 640 ? 0.45 : 0.55;
}

export function LeadershipCircleScroll({
  eyebrow = 'About',
  title = 'The Leadership',
  titleAccent = 'Circle',
  tagline = 'Invite-only · 100 seats · Myntra Campus',
  brandLogoSrc = 'https://avatars.githubusercontent.com/u/3213662?s=280&v=4',
  brandLogoAlt = 'Myntra',
  profiles = defaultProfiles,
}: LeadershipCircleScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [stickyProgress, setStickyProgress] = useState(0);
  const [releaseProgress, setReleaseProgress] = useState(0);
  const [maxRadius, setMaxRadius] = useState(200);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [sectionPinned, setSectionPinned] = useState(false);

  useEffect(() => {
    const clearScrollIdleTimer = () => {
      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
        scrollIdleTimerRef.current = null;
      }
    };

    const scheduleScrollHint = () => {
      clearScrollIdleTimer();
      setShowScrollHint(false);
      scrollIdleTimerRef.current = setTimeout(() => {
        setShowScrollHint(true);
      }, SCROLL_HINT_IDLE_MS);
    };

    const syncLayout = () => {
      const section = sectionRef.current;
      if (!section) return;

      const releaseRatio = getReleaseRatio();
      section.style.minHeight = `${180 + releaseRatio * 100}vh`;
      setMaxRadius(getMaxRadius());
    };

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const vh = window.innerHeight;
      const releaseRange = vh * getReleaseRatio();
      const stickyScrollRange = Math.max(section.offsetHeight - vh - releaseRange, 1);
      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(-rect.top, 0);

      const stickyT = Math.min(scrolled / stickyScrollRange, 1);
      const releaseT = Math.min(
        Math.max((scrolled - stickyScrollRange) / releaseRange, 0),
        1,
      );

      setStickyProgress(stickyT);
      setReleaseProgress(releaseT);
      setSectionPinned(rect.top <= 0 && rect.bottom > vh * 0.5);
      scheduleScrollHint();
    };

    const onResize = () => {
      syncLayout();
      onScroll();
    };

    syncLayout();
    onScroll();
    scheduleScrollHint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      clearScrollIdleTimer();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const logoFadeT = smoothstep(LOGO_FADE_START, LOGO_FADE_END, stickyProgress);
  const logoOpacity = 1 - logoFadeT;
  const logoScale = 1 + logoFadeT * 0.72;
  const circleProgress = clamp01(
    (stickyProgress - CIRCLE_REVEAL_START) / (1 - CIRCLE_REVEAL_START),
  );
  const ringHandoff = smoothstep(LOGO_FADE_START, LOGO_FADE_END, stickyProgress);

  const stickyEase = easeInOutCubic(circleProgress);
  const releaseEase = easeOutCubic(releaseProgress);
  const expandRadius =
    maxRadius * (0.68 * stickyEase + 0.38 * releaseEase);

  const outerRingOpacity = Math.max(
    ringHandoff * 0.55,
    smoothstep(0, 0.1, circleProgress),
  );
  const innerRingOpacity = Math.max(
    ringHandoff * 0.65,
    smoothstep(0, 0.08, circleProgress),
  );
  const centerCopyOpacity = smoothstep(0.28, 0.52, circleProgress);
  const portraitScale = 1 - releaseEase * 0.06;
  const portraitOpacity = smoothstep(0.02, 0.14, circleProgress);
  const portraitUnblur = smoothstep(0.28, 0.92, circleProgress);
  const portraitBlurPx = (1 - portraitUnblur) * 20;
  const scrollHintVisible =
    showScrollHint && sectionPinned && stickyProgress < LOGO_FADE_END && logoOpacity > 0.72;

  return (
    <div ref={sectionRef} className="relative bg-transparent">
      <style>{`
        @keyframes lc-scroll-hint-wave {
          0%, 100% { opacity: 0.22; }
          50% { opacity: 0.92; }
        }
        .lc-scroll-hint {
          animation: lc-scroll-hint-wave 2.4s ease-in-out infinite;
        }
      `}</style>
      <div className="sticky top-0 z-[2] flex h-[100svh] min-h-[480px] items-center justify-center overflow-hidden py-6 sm:py-8">
        <p className="pointer-events-none absolute left-1/2 top-5 z-30 -translate-x-1/2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 sm:top-8 sm:text-[10px] sm:tracking-[0.2em]">
          {eyebrow}
        </p>

        <div className="section-ui-shell">
          <div className="relative mx-auto aspect-square w-full max-w-[min(100%,78svh)]">
          <div
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center"
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
          >
            <img
              src={brandLogoSrc}
              alt={brandLogoAlt}
              className="h-[4.5rem] w-[4.5rem] object-contain opacity-95 sm:h-24 sm:w-24 md:h-28 md:w-28"
              loading="eager"
            />
            <p
              className={`lc-scroll-hint mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-opacity duration-500 sm:mt-5 sm:text-[11px] ${
                scrollHintVisible ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={!scrollHintVisible}
            >
              Scroll more
            </p>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center rounded-full border-2"
            style={{ borderColor: `rgba(255,255,255,${outerRingOpacity * 0.12})` }}
          >
            <div
              className="relative flex h-[83%] w-[83%] items-center justify-center rounded-full border-2"
              style={{ borderColor: `rgba(123,92,255,${innerRingOpacity * 0.35})` }}
            >
              <div
                className="relative flex h-[80%] w-[80%] items-center justify-center rounded-full p-[2px]"
                style={{
                  background: `linear-gradient(90deg, rgba(255,31,192,${innerRingOpacity * 0.95}) 0%, rgba(174,51,255,${innerRingOpacity * 0.95}) 50%, rgba(0,229,255,${innerRingOpacity * 0.95}) 100%)`,
                }}
              >
                <div className="relative h-full w-full rounded-full bg-[#06050c]">
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[min(100%,16rem)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(100%,20rem)]"
                    style={{ opacity: centerCopyOpacity }}
                  >
                    <h2 className="text-center font-[Parafina_Trial,Inter_Tight,sans-serif] text-[1.65rem] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-3xl md:text-4xl">
                      {title}{' '}
                      <span className="bg-gradient-to-r from-[#FF1FC0] via-[#AE33FF] to-[#00E5FF] bg-clip-text text-transparent">
                        {titleAccent}
                      </span>
                    </h2>
                    <p className="mt-3 text-center font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 sm:mt-4 sm:text-[11px]">
                      {tagline}
                    </p>
                  </div>

                  {profiles.map((profile, index) => {
                    const angle = (index / profiles.length) * Math.PI * 2 - Math.PI / 2;
                    const x = expandRadius * Math.cos(angle);
                    const y = expandRadius * Math.sin(angle);

                    return (
                      <div
                        key={profile.name + index}
                        className="absolute left-1/2 top-1/2 z-10 aspect-square w-[30%] min-w-[84px] max-w-[132px] overflow-hidden rounded-full shadow-[0_10px_32px_rgba(0,0,0,0.35)] lg:min-w-[112px] lg:max-w-[172px] lg:w-[35%] xl:max-w-[192px] xl:w-[36%]"
                        style={{
                          opacity: portraitOpacity,
                          transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${portraitScale * portraitOpacity})`,
                          willChange: 'transform, opacity',
                        }}
                      >
                        <img
                          src={profile.image}
                          alt={profile.name}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                          style={{
                            filter: `blur(${portraitBlurPx}px)`,
                            transform: 'scale(1.08)',
                            willChange: 'filter',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use LeadershipCircleScroll */
export function HomePage() {
  return <LeadershipCircleScroll />;
}

export default LeadershipCircleScroll;
