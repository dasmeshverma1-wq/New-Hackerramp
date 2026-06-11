'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

export type ScrollProfile = {
  name: string;
  image: string;
  angleDeg?: number;
};

export type LeadershipCircleScrollProps = {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  tagline?: string;
  introType?: 'brand-logo' | 'only-100-seats';
  brandLogoSrc?: string;
  brandLogoAlt?: string;
  hundredEmojiSrc?: string;
  seatImageSrc?: string;
  profiles?: ScrollProfile[];
  middleRingProfiles?: ScrollProfile[];
  outerRingProfiles?: ScrollProfile[];
};

const SCROLL_HINT_IDLE_MS = 2000;

type ScrollTimeline = {
  introOnlyEnd: number;
  introHundredEnd: number;
  introSeatsEnd: number;
  logoFadeStart: number;
  logoFadeEnd: number;
  circleRevealStart: number;
  speakerExpandEnd: number;
  introFadeScale: number;
  baseMinVh: number;
};

function getScrollTimeline(introType: LeadershipCircleScrollProps['introType']): ScrollTimeline {
  if (introType === 'only-100-seats') {
    return {
      introOnlyEnd: 0.09,
      introHundredEnd: 0.18,
      introSeatsEnd: 0.27,
      logoFadeStart: 0.48,
      logoFadeEnd: 0.62,
      circleRevealStart: 0.56,
      speakerExpandEnd: 0.88,
      introFadeScale: 0.18,
      baseMinVh: 380,
    };
  }

  return {
    introOnlyEnd: 0.035,
    introHundredEnd: 0.07,
    introSeatsEnd: 0.105,
    logoFadeStart: 0.04,
    logoFadeEnd: 0.16,
    circleRevealStart: 0.1,
    speakerExpandEnd: 0.58,
    introFadeScale: 0.72,
    baseMinVh: 180,
  };
}
const EXTRA_RING_REVEAL_START = 0.78;
const EXTRA_RING_REVEAL_END = 0.98;

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

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

const RING_REVEAL_STAGGER = 0.14;

function ringPeak(progress: number, index: number) {
  const start = index * RING_REVEAL_STAGGER;
  const end = start + RING_REVEAL_STAGGER * 0.88;
  const t = smoothstep(start, end, progress);
  const pop = clamp01(easeOutBack(t));
  return {
    opacity: t,
    scale: 0.9 + pop * 0.1,
  };
}

type ScrollHintProps = {
  visible: boolean;
  className?: string;
};

function ScrollHint({ visible, className = '' }: ScrollHintProps) {
  return (
    <p
      className={`lc-scroll-hint font-mono text-[length:var(--wit-caption,0.875rem)] font-bold uppercase tracking-[0.2em] text-white/70 transition-opacity duration-500 ${className} ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!visible}
    >
      Scroll more
    </p>
  );
}

function getReleaseRatio() {
  if (typeof window === 'undefined') return 0.55;
  return window.innerWidth < 640 ? 0.45 : 0.55;
}

type Only100SeatsIntroProps = {
  stickyProgress: number;
  introOnlyEnd: number;
  introHundredEnd: number;
  introSeatsEnd: number;
};

function introItemMotion(stickyProgress: number, start: number, end: number) {
  const t = smoothstep(start, end, stickyProgress);
  return {
    opacity: t,
    scale: 0.92 + easeOutCubic(t) * 0.08,
    y: (1 - t) * 18,
  };
}

function Only100SeatsIntro({
  stickyProgress,
  introOnlyEnd,
  introHundredEnd,
  introSeatsEnd,
}: Only100SeatsIntroProps) {
  const words = [
    { key: 'only', text: 'ONLY', start: 0, end: introOnlyEnd },
    { key: '100', text: '100', start: introOnlyEnd, end: introHundredEnd },
    { key: 'seats', text: 'SEATS', start: introHundredEnd, end: introSeatsEnd },
  ] as const;

  const wordClassName =
    'font-[Parafina_Trial,Inter_Tight,sans-serif] text-[length:var(--wit-title-hero,clamp(3.25rem,14vw,5.25rem))] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white';

  return (
    <div
      className="mx-auto flex max-w-full flex-col items-center gap-0.5 sm:flex-row sm:items-baseline sm:justify-center sm:gap-3 md:gap-4"
      aria-label="Only one hundred seats"
    >
      {words.map(({ key, text, start, end }) => {
        const motion = introItemMotion(stickyProgress, start, end);
        return (
          <span
            key={key}
            className={wordClassName}
            style={{
              opacity: motion.opacity,
              transform: `translateY(${motion.y}px) scale(${motion.scale})`,
              willChange: 'opacity, transform',
            }}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
}

type CenterCopyProps = {
  title: string;
  titleAccent?: string;
  tagline?: string;
  opacity: number;
  className?: string;
};

function CenterCopy({ title, titleAccent, tagline, opacity, className = '' }: CenterCopyProps) {
  return (
    <div className={className} style={{ opacity }}>
      <h2 className="lc-section-title text-center font-[Parafina_Trial,Inter_Tight,sans-serif] text-[length:var(--lc-title,var(--wit-title,2.5rem))] font-medium leading-[1.08] tracking-[-0.03em] text-white">
        {titleAccent ? (
          <>
            {title}{' '}
            <span className="bg-gradient-to-r from-[#FF1FC0] via-[#AE33FF] to-[#00E5FF] bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </>
        ) : (
          title
        )}
      </h2>
      {tagline ? (
        <p className="lc-section-body mt-3 text-center font-[Parafina_Trial,Inter_Tight,sans-serif] text-[length:var(--lc-body,var(--wit-body,1.125rem))] font-normal leading-snug tracking-[-0.01em] text-white/55 sm:mt-3">
          {tagline}
        </p>
      ) : null}
    </div>
  );
}

function GradientRingStroke({
  opacity,
  className = 'absolute inset-0 h-full w-full',
}: {
  opacity: number;
  className?: string;
}) {
  const gradientId = useId().replace(/:/g, '');
  const ringOpacity = opacity * 0.42;

  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={`rgba(255,31,192,${ringOpacity})`} />
          <stop offset="50%" stopColor={`rgba(174,51,255,${ringOpacity})`} />
          <stop offset="100%" stopColor={`rgba(0,229,255,${ringOpacity})`} />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="49.5"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.45"
      />
    </svg>
  );
}

type RingPortraitsProps = {
  profiles: ScrollProfile[];
  ringTopPct: number;
  opacity: number;
  scale: number;
  blurPx: number;
  sizeClassName: string;
  stagger?: number;
  popProgress?: number;
};

type MiniRingOrbitProps = {
  profiles: ScrollProfile[];
  popProgress: number;
  scale: number;
  sizeClassName: string;
  orbitClassName: string;
  counterClassName: string;
  blurPx?: number;
  stagger?: number;
};

function RingPortraits({
  profiles,
  ringTopPct,
  opacity,
  scale,
  blurPx,
  sizeClassName,
  stagger = 0,
  popProgress = 1,
}: RingPortraitsProps) {
  return (
    <>
      {profiles.map((profile, index) => {
        const angleDeg =
          profile.angleDeg ?? (index / profiles.length) * 360 - 90;
        const itemT = clamp01((popProgress - index * stagger) / (1 - stagger * profiles.length * 0.5));
        const itemPop = easeOutBack(itemT);
        const itemOpacity = opacity * smoothstep(0, 0.35, itemT);

        return (
          <div
            key={profile.name + index}
            className="absolute inset-0"
            style={{ transform: `rotate(${angleDeg}deg)` }}
          >
            <div
              className={`absolute left-1/2 aspect-square overflow-hidden rounded-full shadow-[0_10px_32px_rgba(0,0,0,0.35)] ${sizeClassName}`}
              style={{
                top: `${ringTopPct}%`,
                opacity: itemOpacity,
                transform: `translate(-50%, -50%) rotate(${-angleDeg}deg) scale(${scale * itemPop})`,
                willChange: 'transform, opacity, top',
              }}
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                style={{
                  filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
                  transform: 'scale(1.08)',
                  willChange: blurPx > 0 ? 'filter' : undefined,
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

function MiniRingOrbit({
  profiles,
  popProgress,
  scale,
  sizeClassName,
  orbitClassName,
  counterClassName,
  blurPx = 6,
  stagger = 0.04,
}: MiniRingOrbitProps) {
  return (
    <div className={`absolute inset-0 ${orbitClassName}`}>
      {profiles.map((profile, index) => {
        const angleDeg =
          profile.angleDeg ?? (index / profiles.length) * 360 - 90;
        const itemT = clamp01(
          (popProgress - index * stagger) / (1 - stagger * profiles.length * 0.45),
        );
        const itemPop = easeOutBack(itemT);
        const itemOpacity = smoothstep(0, 0.4, itemT);

        return (
          <div
            key={profile.name + index}
            className="absolute inset-0"
            style={{ transform: `rotate(${angleDeg}deg)` }}
          >
            <div
              className="absolute left-1/2 top-0"
              style={{
                opacity: itemOpacity,
                transform: `translate(-50%, -50%) scale(${scale * itemPop})`,
              }}
            >
              <div
                className={counterClassName}
                style={{ '--portrait-tilt': `${-angleDeg}deg` } as CSSProperties}
              >
                <div
                  className={`aspect-square overflow-hidden rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.32)] ${sizeClassName}`}
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                    style={{
                      filter: `blur(${blurPx}px)`,
                      transform: 'scale(1.08)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function LeadershipCircleScroll({
  eyebrow = 'About',
  title = 'The Leadership',
  titleAccent = 'Circle',
  tagline = 'Invite-only · 100 seats · Myntra Campus',
  introType = 'brand-logo',
  brandLogoSrc = 'https://avatars.githubusercontent.com/u/3213662?s=280&v=4',
  brandLogoAlt = 'Myntra',
  hundredEmojiSrc = 'assets/only-100-seats/100-emoji.png',
  seatImageSrc = 'assets/only-100-seats/seat.png',
  profiles = defaultProfiles,
  middleRingProfiles = [],
  outerRingProfiles = [],
}: LeadershipCircleScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [stickyProgress, setStickyProgress] = useState(0);
  const [releaseProgress, setReleaseProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [sectionPinned, setSectionPinned] = useState(false);

  const hasMiddleRing = middleRingProfiles.length > 0;
  const hasOuterRing = outerRingProfiles.length > 0;
  const timeline = getScrollTimeline(introType);

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
      const scrollTimeline = getScrollTimeline(introType);
      section.style.minHeight = `${scrollTimeline.baseMinVh + releaseRatio * 100}vh`;
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
  }, [introType]);

  const logoFadeT = smoothstep(timeline.logoFadeStart, timeline.logoFadeEnd, stickyProgress);
  const logoOpacity = 1 - logoFadeT;
  const logoScale = 1 + logoFadeT * timeline.introFadeScale;
  const circleProgress = clamp01(
    (stickyProgress - timeline.circleRevealStart) /
      (timeline.speakerExpandEnd - timeline.circleRevealStart),
  );
  const stickyEase = easeInOutCubic(circleProgress);
  const releaseEase = easeOutCubic(releaseProgress);
  const portraitRingTopPct = (1 - stickyEase) * 50;

  const extraRingPop = smoothstep(EXTRA_RING_REVEAL_START, EXTRA_RING_REVEAL_END, stickyEase);

  const outerRingPeak = ringPeak(circleProgress, 0);
  const innerRingPeak = ringPeak(circleProgress, 1);
  const gradientRingPeak = ringPeak(circleProgress, 2);
  const coreRingPeak = ringPeak(circleProgress, 3);

  const centerCopyOpacity = smoothstep(0.28, 0.52, circleProgress);
  const portraitScale = 1 - releaseEase * 0.06;
  const portraitOpacity = smoothstep(0.02, 0.14, circleProgress);
  const portraitUnblur = smoothstep(0.28, 0.92, circleProgress);
  const portraitBlurPx = (1 - portraitUnblur) * 20;

  const scrollIdleReady = showScrollHint && sectionPinned && releaseProgress < 0.22;
  const introScrollHintVisible =
    scrollIdleReady && stickyProgress < timeline.logoFadeEnd && logoOpacity > 0.12;
  const postIntroScrollHintVisible =
    scrollIdleReady &&
    stickyProgress >= timeline.introSeatsEnd &&
    stickyProgress < timeline.speakerExpandEnd - 0.04 &&
    !introScrollHintVisible &&
    logoOpacity <= 0.12;

  const speakerSizeClassName =
    'w-[38%] min-w-[108px] max-w-[168px] sm:w-[28%] sm:min-w-[84px] sm:max-w-[132px] lg:min-w-[100px] lg:max-w-[156px] lg:w-[32%] xl:max-w-[168px] xl:w-[33%]';
  const extraRingSizeClassName = 'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10';

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
        @keyframes lc-orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes lc-orbit-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes lc-mini-stay-upright-cw {
          from { transform: rotate(var(--portrait-tilt, 0deg)) rotate(0deg); }
          to { transform: rotate(var(--portrait-tilt, 0deg)) rotate(-360deg); }
        }
        @keyframes lc-mini-stay-upright-ccw {
          from { transform: rotate(var(--portrait-tilt, 0deg)) rotate(0deg); }
          to { transform: rotate(var(--portrait-tilt, 0deg)) rotate(360deg); }
        }
        .lc-mini-orbit-middle {
          animation: lc-orbit-cw 52s linear infinite;
        }
        .lc-mini-orbit-outer {
          animation: lc-orbit-ccw 68s linear infinite;
        }
        .lc-mini-stay-upright-cw {
          animation: lc-mini-stay-upright-cw 52s linear infinite;
        }
        .lc-mini-stay-upright-ccw {
          animation: lc-mini-stay-upright-ccw 68s linear infinite;
        }
      `}</style>
      <div className="sticky top-0 z-[2] flex h-[100svh] min-h-[480px] items-center justify-center overflow-visible px-0 py-6 sm:px-0 sm:py-8">
        <p className="lc-eyebrow pointer-events-none absolute left-1/2 top-5 z-30 -translate-x-1/2 font-mono text-[length:var(--wit-eyebrow,12px)] font-bold uppercase tracking-[0.2em] text-white/35 sm:top-8">
          {eyebrow}
        </p>

        <div className="section-ui-shell relative flex w-full flex-col items-center justify-center max-sm:min-h-[calc(100svh-4.5rem)] max-sm:px-0">
          <div
            className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center sm:hidden"
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
          >
            {introType === 'only-100-seats' ? (
              <Only100SeatsIntro
                stickyProgress={stickyProgress}
                introOnlyEnd={timeline.introOnlyEnd}
                introHundredEnd={timeline.introHundredEnd}
                introSeatsEnd={timeline.introSeatsEnd}
              />
            ) : (
              <img
                src={brandLogoSrc}
                alt={brandLogoAlt}
                className="h-[9rem] w-[9rem] object-contain opacity-95"
                loading="eager"
              />
            )}
            <ScrollHint visible={introScrollHintVisible} className="mt-6" />
          </div>

          <div className="relative mx-auto flex w-full max-w-full flex-col items-center justify-center max-sm:min-h-[calc(100svh-4.5rem)] max-sm:gap-4 sm:max-w-[min(100%,78svh)]">
          <div className="relative mx-auto aspect-square shrink-0 overflow-visible p-0 max-sm:size-[min(100vw,56svh)] sm:w-full sm:p-[clamp(0.35rem,2.5vw,1.75rem)]">
          <div
            className="pointer-events-none absolute inset-0 z-30 hidden flex-col items-center justify-center px-3 sm:flex"
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
          >
            {introType === 'only-100-seats' ? (
              <Only100SeatsIntro
                stickyProgress={stickyProgress}
                introOnlyEnd={timeline.introOnlyEnd}
                introHundredEnd={timeline.introHundredEnd}
                introSeatsEnd={timeline.introSeatsEnd}
              />
            ) : (
              <img
                src={brandLogoSrc}
                alt={brandLogoAlt}
                className="h-[4.5rem] w-[4.5rem] object-contain opacity-95 sm:h-24 sm:w-24 md:h-28 md:w-28"
                loading="eager"
              />
            )}
            <ScrollHint visible={introScrollHintVisible} className="mt-5 sm:mt-6" />
          </div>

          <ScrollHint
            visible={postIntroScrollHintVisible}
            className="pointer-events-none absolute bottom-2 left-1/2 z-40 -translate-x-1/2 sm:bottom-4"
          />

          <div
            className="absolute inset-0 flex items-center justify-center rounded-full border-2 transition-[border-color,transform] duration-300"
            style={{
              borderColor: `rgba(255,255,255,${outerRingPeak.opacity * 0.12})`,
              transform: `scale(${outerRingPeak.scale})`,
            }}
          >
            {hasOuterRing ? (
              <div className="pointer-events-none absolute -inset-[2px] z-[6]">
                <MiniRingOrbit
                  profiles={outerRingProfiles}
                  popProgress={extraRingPop}
                  scale={1 - releaseEase * 0.04}
                  sizeClassName={extraRingSizeClassName}
                  orbitClassName="lc-mini-orbit-outer"
                  counterClassName="lc-mini-stay-upright-ccw"
                  blurPx={6}
                  stagger={0.035}
                />
              </div>
            ) : null}

            <div
              className="relative flex h-[83%] w-[83%] items-center justify-center rounded-full border-2 transition-[border-color,transform] duration-300"
              style={{
                borderColor: `rgba(123,92,255,${innerRingPeak.opacity * 0.35})`,
                transform: `scale(${innerRingPeak.scale})`,
              }}
            >
              {hasMiddleRing ? (
                <div className="pointer-events-none absolute -inset-[2px] z-[6]">
                  <MiniRingOrbit
                    profiles={middleRingProfiles}
                    popProgress={extraRingPop}
                    scale={1 - releaseEase * 0.04}
                    sizeClassName={extraRingSizeClassName}
                    orbitClassName="lc-mini-orbit-middle"
                    counterClassName="lc-mini-stay-upright-cw"
                    blurPx={6}
                    stagger={0.04}
                  />
                </div>
              ) : null}

              <div
                className="relative flex h-[80%] w-[80%] items-center justify-center transition-transform duration-300"
                style={{ transform: `scale(${coreRingPeak.scale})` }}
              >
                <GradientRingStroke opacity={gradientRingPeak.opacity} />

                <CenterCopy
                  title={title}
                  titleAccent={titleAccent}
                  tagline={tagline}
                  opacity={centerCopyOpacity}
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden w-[min(86%,19.5rem)] -translate-x-1/2 -translate-y-[calc(50%-0.625rem)] px-3 md:block"
                />

                <div className="pointer-events-none absolute -inset-[2px] z-10 overflow-visible">
                  <RingPortraits
                    profiles={profiles}
                    ringTopPct={portraitRingTopPct}
                    opacity={portraitOpacity}
                    scale={portraitScale * portraitOpacity}
                    blurPx={portraitBlurPx}
                    sizeClassName={speakerSizeClassName}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>

          <CenterCopy
            title={title}
            titleAccent={titleAccent}
            tagline={tagline}
            opacity={centerCopyOpacity}
            className={`pointer-events-none z-20 w-full max-w-2xl px-4 text-center md:hidden ${
              centerCopyOpacity > 0.04
                ? 'relative mt-1 shrink-0 sm:mt-6'
                : 'absolute h-0 w-0 overflow-hidden opacity-0'
            }`}
          />
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
