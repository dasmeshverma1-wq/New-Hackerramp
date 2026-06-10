import { createRoot, Root } from 'react-dom/client';
import { TextScramble } from './text-scramble';

const roots = new Map<Element, Root>();

function mountHeading(el: HTMLElement) {
  const text = el.getAttribute('data-text-scramble');
  if (!text) return;

  const duration = Number(el.getAttribute('data-scramble-duration') ?? '0.52');
  const speed = Number(el.getAttribute('data-scramble-speed') ?? '0.07');
  const delay = Number(el.getAttribute('data-scramble-delay') ?? '0');
  const as = el.getAttribute('data-scramble-as') ?? 'span';
  const className = el.getAttribute('data-scramble-class') ?? '';

  const root = createRoot(el);
  roots.set(el, root);

  root.render(
    <TextScramble
      as={as}
      className={className}
      duration={duration}
      speed={speed}
      triggerOnView
      viewDelay={delay}
      viewportThreshold={0.45}
    >
      {text}
    </TextScramble>
  );
}

export function mountHeadingScrambles() {
  document.querySelectorAll<HTMLElement>('[data-text-scramble]').forEach(mountHeading);
}
