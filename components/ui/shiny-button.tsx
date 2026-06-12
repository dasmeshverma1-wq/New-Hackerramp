'use client';

/**
 * Shiny gradient button — adapted for WIT dark theme.
 * Supports render as `<button>` or `<a>` when `href` is provided.
 */
import React from 'react';
import { cn } from '../../lib/utils';
import {
  LUMA_EVENT_ID,
  LUMA_EVENT_PAGE_URL,
  getLumaCheckoutLinkProps,
} from './open-luma-register';

export type ShinyButtonProps = {
  href?: string;
  lumaOverlay?: boolean;
  lumaEventId?: string;
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
  lumaOverlay = false,
  lumaEventId = LUMA_EVENT_ID,
  target,
  rel,
  id,
  type = 'button',
  onClick,
  ...props
}: ShinyButtonProps) {
  const classes = cn(shinyStyles, className);

  if (href && lumaOverlay) {
    const checkout = getLumaCheckoutLinkProps(lumaEventId, href || LUMA_EVENT_PAGE_URL);

    return (
      <a
        id={id}
        href={checkout.href}
        className={cn(classes, checkout.className)}
        data-luma-action={checkout['data-luma-action']}
        data-luma-event-id={checkout['data-luma-event-id']}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
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
      onClick={onClick}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export { ShinyButton };
