import type { CSSProperties } from 'react';

export function revealProps(
  delayMs = 0,
  className = '',
): { className: string; style?: CSSProperties } {
  const classes = ['wit-reveal', className].filter(Boolean).join(' ');
  if (delayMs <= 0) return { className: classes };

  return {
    className: classes,
    style: { '--wit-reveal-delay': `${delayMs}ms` } as CSSProperties,
  };
}
