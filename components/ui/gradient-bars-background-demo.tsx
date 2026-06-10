/**
 * Demo for Next.js / shadcn apps. Requires lucide-react:
 *   npm install lucide-react
 */
import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { GradientBarsBackground } from '@/components/ui/gradient-bars-background';

export default function GradientBarsBackgroundDemo() {
  const [numBars, setNumBars] = useState(9);
  const [gradientColor, setGradientColor] = useState('#7b5cff');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : 'rgb(123, 92, 255)';
  };

  return (
    <GradientBarsBackground
      numBars={numBars % 2 === 0 ? numBars + 1 : numBars}
      gradientFrom={hexToRgb(gradientColor)}
      gradientTo="transparent"
      animationDuration={2.8}
      backgroundColor="#06050c"
      className="min-h-screen"
    >
      <button
        type="button"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="fixed right-4 top-4 z-50 rounded-lg border border-white/20 bg-black/85 p-3 shadow-2xl backdrop-blur-md"
        aria-label={isPanelOpen ? 'Close controls' : 'Open controls'}
      >
        {isPanelOpen ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <Settings className="h-5 w-5 text-white" />
        )}
      </button>

      {isPanelOpen ? (
        <div className="fixed right-4 top-16 z-40 w-[260px] rounded-xl border border-white/20 bg-black/85 p-4 shadow-2xl backdrop-blur-md">
          <h3 className="mb-4 text-base font-bold text-white">Customize</h3>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/90">
            Bars: {numBars}
          </label>
          <input
            type="range"
            min={3}
            max={20}
            value={numBars}
            onChange={(e) => setNumBars(Number(e.target.value))}
            className="mb-4 w-full"
          />
          <input
            type="color"
            value={gradientColor}
            onChange={(e) => setGradientColor(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-md border border-white/30"
          />
        </div>
      ) : null}

      <div className="py-24 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl">
          Gradient Bars
        </h1>
        <p className="text-lg font-medium text-white/50 md:text-xl">
          WIT dark purple footer background
        </p>
      </div>
    </GradientBarsBackground>
  );
}
