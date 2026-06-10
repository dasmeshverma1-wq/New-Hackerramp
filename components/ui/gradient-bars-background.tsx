'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';

const BAR_HOVER_EASE = 'cubic-bezier(0.42, 0, 0.58, 1)';
const BAR_HOVER_DURATION_MS = 1300;
const BAR_WAVE_STAGGER_MS = 95;

export type GradientBarsProps = {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  barColors?: string[];
  animationDuration?: number;
  className?: string;
};

function calculateHeight(index: number, total: number) {
  const position = index / Math.max(total - 1, 1);
  const maxHeight = 100;
  const minHeight = 30;
  const distanceFromCenter = Math.abs(position - 0.5);
  const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
  return minHeight + (maxHeight - minHeight) * heightPercentage;
}

export function GradientBars({
  numBars = 15,
  gradientFrom = 'rgb(255, 60, 0)',
  gradientTo = 'transparent',
  barColors,
  animationDuration = 2,
  className = '',
  isHovered = false,
}: GradientBarsProps & { isHovered?: boolean }) {
  return (
    <>
      <style>{`
        @keyframes wit-pulse-bar {
          0% { transform: scaleY(calc(var(--initial-scale) * 1.14)); }
          100% { transform: scaleY(calc(var(--initial-scale) * 0.48)); }
        }
      `}</style>

      <div className={cn('absolute inset-0 z-0 overflow-hidden', className)} aria-hidden="true">
        <div
          className="flex h-full"
          style={{
            width: '100%',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {Array.from({ length: numBars }).map((_, index) => {
            const height = calculateHeight(index, numBars);
            const initialScale = height / 100;
            const waveProfile = Math.sin((index / Math.max(numBars - 1, 1)) * Math.PI);
            const hoverScale = isHovered ? 1.32 + waveProfile * 0.52 : 1;
            const fromColor = barColors?.[index % barColors.length] ?? gradientFrom;
            const staggerMs = index * BAR_WAVE_STAGGER_MS;
            const idleWaveDelay = index * 0.16;

            return (
              <div
                key={index}
                style={
                  {
                    flex: `1 0 calc(100% / ${numBars})`,
                    maxWidth: `calc(100% / ${numBars})`,
                    height: '100%',
                    background: `linear-gradient(to top, ${fromColor}, ${gradientTo})`,
                    transform: `scaleY(${initialScale * hoverScale})`,
                    transformOrigin: 'bottom',
                    transition: `transform ${BAR_HOVER_DURATION_MS}ms ${BAR_HOVER_EASE}, filter ${BAR_HOVER_DURATION_MS}ms ${BAR_HOVER_EASE}`,
                    transitionDelay: `${staggerMs}ms`,
                    animation: isHovered
                      ? 'none'
                      : `wit-pulse-bar ${animationDuration}s ease-in-out infinite alternate`,
                    animationDelay: `${idleWaveDelay}s`,
                    filter: isHovered
                      ? `brightness(${1.22 + waveProfile * 0.28}) saturate(${1.12 + waveProfile * 0.2})`
                      : 'brightness(1) saturate(1)',
                    outline: '1px solid rgba(0, 0, 0, 0)',
                    boxSizing: 'border-box',
                    '--initial-scale': initialScale,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export type GradientBarsBackgroundProps = {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  barColors?: string[];
  animationDuration?: number;
  backgroundColor?: string;
  className?: string;
  contentClassName?: string;
  contentAlign?: 'center' | 'end';
  overlayClassName?: string;
  id?: string;
  children?: React.ReactNode;
};

export function GradientBarsBackground({
  numBars = 9,
  gradientFrom = 'rgb(123, 92, 255)',
  gradientTo = 'transparent',
  barColors,
  animationDuration = 2.8,
  backgroundColor = '#06050c',
  className,
  contentClassName,
  contentAlign = 'end',
  overlayClassName,
  id,
  children,
}: GradientBarsBackgroundProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id={id}
      className={cn(
        'relative flex w-full flex-col items-center overflow-hidden',
        contentAlign === 'center' ? 'justify-center' : 'justify-end',
        className,
      )}
      style={{ backgroundColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GradientBars
        numBars={numBars}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        barColors={barColors}
        animationDuration={animationDuration}
        isHovered={isHovered}
      />

      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#06050c] via-[#06050c]/75 to-[#06050c]/20',
          overlayClassName,
        )}
        aria-hidden="true"
      />

      {children ? (
        <div
          className={cn(
            'relative z-10 w-full px-0',
            contentClassName,
          )}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}

export default GradientBarsBackground;
