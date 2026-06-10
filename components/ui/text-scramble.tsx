'use client';

import React, { type JSX, useEffect, useRef, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  triggerOnView?: boolean;
  viewDelay?: number;
  viewportThreshold?: number;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function TextScramble({
  children,
  duration = 0.65,
  speed = 0.06,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  triggerOnView = false,
  viewDelay = 0,
  viewportThreshold = 0.5,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );
  const ref = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState(children);
  const [inView, setInView] = useState(false);
  const frameRef = useRef<number>();
  const text = children;

  useEffect(() => {
    if (!triggerOnView || !ref.current) return;

    let delayTimer: number | undefined;
    const node = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || entry.intersectionRatio < viewportThreshold) {
          return;
        }
        observer.disconnect();
        delayTimer = window.setTimeout(() => setInView(true), viewDelay);
      },
      {
        threshold: [0, viewportThreshold, 1],
        rootMargin: '0px 0px -12% 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (delayTimer !== undefined) window.clearTimeout(delayTimer);
    };
  }, [triggerOnView, viewDelay, viewportThreshold]);

  const shouldAnimate = triggerOnView ? inView && trigger : trigger;

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayText(children);
      return;
    }

    let startTime: number | null = null;
    let lastTick = 0;
    const tickMs = speed * 1000;
    const totalMs = duration * 1000;

    const animate = (now: number) => {
      if (startTime === null) startTime = now;

      const elapsed = now - startTime;
      const linearProgress = Math.min(elapsed / totalMs, 1);
      const progress = easeInOutCubic(linearProgress);

      if (now - lastTick >= tickMs || linearProgress >= 1) {
        lastTick = now;
        let scrambled = '';

        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            scrambled += ' ';
            continue;
          }

          const revealThreshold = (i + 0.5) / text.length;
          if (progress >= revealThreshold) {
            scrambled += text[i];
          } else {
            scrambled +=
              characterSet[Math.floor(Math.random() * characterSet.length)];
          }
        }

        setDisplayText(scrambled);
      }

      if (linearProgress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        onScrambleComplete?.();
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [
    shouldAnimate,
    text,
    duration,
    speed,
    characterSet,
    onScrambleComplete,
    children,
  ]);

  return (
    <MotionComponent ref={ref} className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}
