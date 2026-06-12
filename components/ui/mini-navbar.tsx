'use client';

import React, { useEffect, useRef, useState } from 'react';
import ShinyButton from './shiny-button';

export type MiniNavLink = {
  label: string;
  href: string;
};

export type MiniNavbarProps = {
  logoSrc?: string;
  logoAlt?: string;
  links?: MiniNavLink[];
  applyHref?: string;
  applyLabel?: string;
  applyId?: string;
};

function AnimatedNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="wit-mini-nav__link">
      <span className="wit-mini-nav__link-stack">
        <span className="wit-mini-nav__link-text wit-mini-nav__link-text--muted">{children}</span>
        <span className="wit-mini-nav__link-text">{children}</span>
      </span>
    </a>
  );
}

export function MiniNavbar({
  logoSrc = 'images/Frame 632872.svg',
  logoAlt = 'mynnovAIte',
  links = [
    { label: 'About', href: '#about' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'Register', href: '#luma-register' },
  ],
  applyHref = '#',
  applyLabel = 'Register to Apply',
  applyId = 'nav-register-btn',
}: MiniNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('wit-mini-nav--pill');
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);

    if (isOpen) {
      setHeaderShapeClass('wit-mini-nav--open');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('wit-mini-nav--pill');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  return (
    <header className={`wit-mini-nav ${headerShapeClass}`}>
      <div className="wit-mini-nav__row">
        <a href="#" className="wit-mini-nav__brand" aria-label="Women in Tech home">
          <img src={logoSrc} alt={logoAlt} className="wit-mini-nav__logo" />
        </a>

        <nav className="wit-mini-nav__desktop-nav" aria-label="Primary">
          {links.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="wit-mini-nav__desktop-actions">
          <ShinyButton
            id={applyId}
            href={applyHref}
            lumaOverlay
            className="wit-mini-nav__apply h-9 rounded-xl px-4 text-xs sm:text-sm"
          >
            {applyLabel}
          </ShinyButton>
        </div>

        <button
          type="button"
          className="wit-mini-nav__menu-btn"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div className={`wit-mini-nav__mobile ${isOpen ? 'wit-mini-nav__mobile--open' : ''}`}>
        <nav className="wit-mini-nav__mobile-nav">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="wit-mini-nav__mobile-link" onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="wit-mini-nav__mobile-actions">
          <ShinyButton
            href={applyHref}
            lumaOverlay
            className="wit-mini-nav__apply wit-mini-nav__apply--block h-11 w-full rounded-xl text-sm"
            onClick={() => setIsOpen(false)}
          >
            {applyLabel}
          </ShinyButton>
        </div>
      </div>
    </header>
  );
}

export default MiniNavbar;
