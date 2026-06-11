'use client';

/**
 * Shiny gradient button — adapted for WIT dark theme.
 * Supports render as `<button>` or `<a>` when `href` is provided.
 */
import React from 'react';
import { cn } from '../../lib/utils';

export type ShinyButtonProps = {
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const shinyStyles = cn(
  'shiny-button inline-flex items-center justify-center gap-2 rounded-xl border-none px-6 py-2',
  'font-extrabold text-white no-underline',
  'transition-[background-position,transform,box-shadow] duration-700 ease-out',
  'hover:-translate-y-0.5',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AE33FF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06050c]',
);

export default function ShinyButton({
  className,
  children = 'Register to Apply',
  href,
  target,
  rel,
  id,
  type = 'button',
  ...props
}: ShinyButtonProps) {
  const classes = cn(shinyStyles, className);

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export { ShinyButton };
