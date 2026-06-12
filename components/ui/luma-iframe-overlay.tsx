'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  LUMA_EVENT_PAGE_URL,
  LUMA_IFRAME_EMBED_URL,
  toLumaIframeEmbedUrl,
} from './open-luma-register';

type OverlayState = {
  open: boolean;
  embedUrl: string;
};

type LumaIframeOverlayProps = {
  defaultPageUrl?: string;
};

export function LumaIframeOverlay({
  defaultPageUrl = LUMA_EVENT_PAGE_URL,
}: LumaIframeOverlayProps) {
  const [state, setState] = useState<OverlayState>({
    open: false,
    embedUrl: LUMA_IFRAME_EMBED_URL,
  });
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const open = useCallback(
    (pageUrl?: string) => {
      setState({
        open: true,
        embedUrl: toLumaIframeEmbedUrl(pageUrl || defaultPageUrl),
      });
    },
    [defaultPageUrl],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    window.WITOpenLumaOverlay = open;
    return () => {
      delete window.WITOpenLumaOverlay;
    };
  }, [open]);

  useEffect(() => {
    if (!state.open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [close, state.open]);

  if (!mounted || !state.open) return null;

  return createPortal(
    <div
      className="luma-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Register on Luma"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#06050c]/82 backdrop-blur-sm"
        aria-label="Close registration"
        onClick={close}
      />

      <div className="luma-overlay__panel relative z-10 flex h-[min(92dvh,860px)] w-full max-w-[min(100%,560px)] flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0f0e1c] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
            Register on Luma
          </p>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <iframe
          src={state.embedUrl}
          title="Luma event registration"
          className="h-full w-full flex-1 border-0 bg-white"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="fullscreen; payment"
          tabIndex={0}
        />
      </div>
    </div>,
    document.body,
  );
}

export default LumaIframeOverlay;
