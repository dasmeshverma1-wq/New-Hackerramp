'use client';

import React from 'react';
import { cn } from '../../lib/utils';

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
  className = '',
}: GradientBarsProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      <div className="flex h-full items-end">
        {Array.from({ length: numBars }).map((_, index) => {
          const height = calculateHeight(index, numBars);
          const initialScale = height / 100;
          const fromColor = barColors?.[index % barColors.length] ?? gradientFrom;

          return (
            <div
              key={index}
              style={{
                flex: `1 0 calc(100% / ${numBars})`,
                maxWidth: `calc(100% / ${numBars})`,
                height: '100%',
                background: `linear-gradient(to top, ${fromColor}, ${gradientTo})`,
                transform: `scaleY(${initialScale})`,
                transformOrigin: 'bottom',
                boxSizing: 'border-box',
              }}
            />
          );
        })}
      </div>
    </div>
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
  stableOverlay?: boolean;
  enableBarHover?: boolean;
  id?: string;
  children?: React.ReactNode;
};

export function GradientBarsBackground({
  numBars = 9,
  gradientFrom = 'rgb(123, 92, 255)',
  gradientTo = 'transparent',
  barColors,
  backgroundColor = '#06050c',
  className,
  contentClassName,
  contentAlign = 'end',
  overlayClassName,
  stableOverlay = false,
  id,
  children,
}: GradientBarsBackgroundProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative isolate flex w-full flex-col items-center overflow-hidden',
        contentAlign === 'center' ? 'justify-center' : 'justify-end',
        className,
      )}
      style={{ backgroundColor }}
    >
      <GradientBars
        numBars={numBars}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        barColors={barColors}
      />

      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-[1]',
          !stableOverlay &&
            'bg-gradient-to-t from-[#06050c] via-[#06050c]/70 to-transparent',
          overlayClassName,
        )}
        style={
          stableOverlay
            ? {
                background:
                  'linear-gradient(to top, #06050c 0%, #06050c 52%, rgba(6, 5, 12, 0.92) 76%, transparent 100%)',
              }
            : undefined
        }
        aria-hidden="true"
      />

      {children ? (
        <div className={cn('relative z-10 w-full px-0', contentClassName)}>{children}</div>
      ) : null}
    </section>
  );
}

export default GradientBarsBackground;
