const observed = new WeakSet<Element>();

export function initViewportReveals(root: ParentNode = document): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('wit-reveal--visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
  );

  const observeEl = (el: Element) => {
    if (!el.classList.contains('wit-reveal') || el.classList.contains('wit-reveal--visible')) {
      return;
    }
    if (observed.has(el)) return;
    observed.add(el);
    observer.observe(el);
  };

  const scan = (node: ParentNode) => {
    if (node instanceof Element && node.classList.contains('wit-reveal')) {
      observeEl(node);
    }
    node.querySelectorAll?.('.wit-reveal:not(.wit-reveal--visible)').forEach(observeEl);
  };

  scan(root);

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) scan(node);
      });
    });
  });

  const observeRoot = root === document ? document.body : root;
  mutationObserver.observe(observeRoot, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
  };
}
