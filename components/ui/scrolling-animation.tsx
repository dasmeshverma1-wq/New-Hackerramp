'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
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

function getReleaseRatio() {
  if (typeof window === 'undefined') return 0.55;
  return window.innerWidth < 640 ? 0.45 : 0.55;
}

type Only100SeatsIntroProps = {
  stickyProgress: number;
  hundredEmojiSrc: string;
  seatImageSrc: string;
  introOnlyEnd: number;
  introHundredEnd: number;
  introSeatsEnd: number;
};

function introItemMotion(stickyProgress: number, start: number, end: number) {
  const t = smoothstep(start, end, stickyProgress);
  return {
    opacity: t,
    scale: 0.86 + easeOutBack(t) * 0.14,
    y: (1 - t) * 14,
  };
}

type IntroTileProps = {
  label: string;
  motion: ReturnType<typeof introItemMotion>;
  cardClassName: string;
  className?: string;
  children: ReactNode;
};

function IntroTile({ label, motion, cardClassName, className = '', children }: IntroTileProps) {
  return (
    <div
      className={`flex flex-col items-start ${className}`}
      style={{
        opacity: motion.opacity,
        transform: `translateY(${motion.y}px) scale(${motion.scale})`,
      }}
    >
      <span className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/30 sm:mb-3 sm:text-[11px]">
        {label}
      </span>
      <div
        className={`flex w-full items-center justify-center rounded-2xl bg-[#0c0a14]/90 shadow-[0_20px_56px_rgba(0,0,0,0.55)] backdrop-blur-md sm:rounded-[1.75rem] ${cardClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

function Only100SeatsIntro({
  stickyProgress,
  hundredEmojiSrc,
  seatImageSrc,
  introOnlyEnd,
  introHundredEnd,
  introSeatsEnd,
}: Only100SeatsIntroProps) {
  const only = introItemMotion(stickyProgress, 0, introOnlyEnd);
  const hundred = introItemMotion(stickyProgress, introOnlyEnd, introHundredEnd);
  const seats = introItemMotion(stickyProgress, introHundredEnd, introSeatsEnd);

  const cardTop =
    'h-[4.75rem] sm:h-[13.5rem] sm:w-[13.5rem]';
  const cardSeats =
    'h-[5.5rem] sm:h-[13.5rem] sm:w-[13.5rem]';

  return (
    <div
      className="mx-auto flex w-[min(92vw,20rem)] flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-end sm:justify-center sm:gap-8"
      aria-label="Invite only, one hundred seats"
    >
      <div className="grid w-full grid-cols-[1.4fr_1fr] gap-3 sm:contents">
        <IntroTile label="Only" motion={only} cardClassName={cardTop}>
          <span className="font-[Parafina_Trial,Inter_Tight,sans-serif] text-[1.75rem] font-bold uppercase leading-none tracking-[-0.04em] text-white sm:text-[3.7rem]">
            ONLY
          </span>
        </IntroTile>

        <IntroTile label="100" motion={hundred} cardClassName={cardTop}>
          <img
            src={hundredEmojiSrc}
            alt="100"
            className="h-12 w-12 object-contain sm:h-[6.5rem] sm:w-[6.5rem]"
            loading="eager"
          />
        </IntroTile>
      </div>

      <IntroTile
        label="Seats"
        motion={seats}
        className="w-full sm:w-auto"
        cardClassName={`${cardSeats} w-full sm:w-[13.5rem]`}
      >
        <img
          src={seatImageSrc}
          alt="Seat"
          className="h-14 w-14 object-contain sm:h-[7rem] sm:w-[7rem]"
          loading="eager"
        />
      </IntroTile>
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
      <h2 className="text-center font-[Parafina_Trial,Inter_Tight,sans-serif] text-[1.35rem] font-medium leading-[1.12] tracking-[-0.03em] text-white sm:text-[1.65rem] md:text-[1.85rem]">
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
        <p className="mt-3 text-center font-[Parafina_Trial,Inter_Tight,sans-serif] text-[0.95rem] font-normal leading-snug tracking-[-0.01em] text-white/55 sm:mt-4 sm:text-base">
          {tagline}
        </p>
      ) : null}
    </div>
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
  const ringHandoff = smoothstep(timeline.logoFadeStart, timeline.logoFadeEnd, stickyProgress);

  const stickyEase = easeInOutCubic(circleProgress);
  const releaseEase = easeOutCubic(releaseProgress);
  const portraitRingTopPct = (1 - stickyEase) * 50;

  const extraRingPop = smoothstep(EXTRA_RING_REVEAL_START, EXTRA_RING_REVEAL_END, stickyEase);

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
    showScrollHint &&
    sectionPinned &&
    stickyProgress < timeline.logoFadeStart &&
    logoOpacity > 0.72;

  const speakerSizeClassName =
    'w-[30%] min-w-[84px] max-w-[132px] lg:min-w-[112px] lg:max-w-[172px] lg:w-[35%] xl:max-w-[192px] xl:w-[36%]';
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
      <div className="sticky top-0 z-[2] flex h-[100svh] min-h-[480px] items-center justify-center overflow-visible px-2 py-8 sm:overflow-hidden sm:px-0">
        <p className="pointer-events-none absolute left-1/2 top-5 z-30 -translate-x-1/2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 sm:top-8 sm:text-[10px] sm:tracking-[0.2em]">
          {eyebrow}
        </p>

        <div className="section-ui-shell flex w-full flex-col items-center justify-center">
          <div className="flex w-full max-w-[min(112vw,28rem)] flex-col items-center justify-center sm:max-w-[min(100%,78svh)]">
          <div className="relative mx-auto aspect-square w-full overflow-visible sm:overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center"
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
          >
            {introType === 'only-100-seats' ? (
              <Only100SeatsIntro
                stickyProgress={stickyProgress}
                hundredEmojiSrc={hundredEmojiSrc}
                seatImageSrc={seatImageSrc}
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
            <p
              className={`lc-scroll-hint mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-opacity duration-500 sm:mt-6 sm:text-[11px] ${
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
              className="relative flex h-[83%] w-[83%] items-center justify-center rounded-full border-2"
              style={{ borderColor: `rgba(123,92,255,${innerRingOpacity * 0.35})` }}
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

              <div className="pointer-events-none absolute -inset-[2px] z-10">
                <RingPortraits
                  profiles={profiles}
                  ringTopPct={portraitRingTopPct}
                  opacity={portraitOpacity}
                  scale={portraitScale * portraitOpacity}
                  blurPx={portraitBlurPx}
                  sizeClassName={speakerSizeClassName}
                />
              </div>

              <CenterCopy
                title={title}
                titleAccent={titleAccent}
                tagline={tagline}
                opacity={centerCopyOpacity}
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden w-[min(92%,22rem)] -translate-x-1/2 -translate-y-1/2 px-3 md:block"
              />
            </div>
          </div>
          </div>

          <CenterCopy
            title={title}
            titleAccent={titleAccent}
            tagline={tagline}
            opacity={centerCopyOpacity}
            className="pointer-events-none z-20 mt-6 w-full max-w-md px-4 text-center md:hidden"
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
