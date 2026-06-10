import * as esbuild from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const shared = {
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  loader: { '.tsx': 'tsx' },
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  alias: {
    '@': rootDir,
  },
};

await esbuild.build({
  ...shared,
  entryPoints: ['components/ui/heading-scramble-mount.tsx'],
  outfile: 'assets/text-scramble.bundle.js',
  globalName: 'WITHeadingScrambleBundle',
});

await esbuild.build({
  ...shared,
  entryPoints: ['components/ui/hero-with-logos-mount.tsx'],
  outfile: 'assets/hero-with-logos.bundle.js',
  globalName: 'WITHeroBundle',
});

await esbuild.build({
  ...shared,
  entryPoints: ['components/ui/leadership-circle-scroll-mount.tsx'],
  outfile: 'assets/leadership-circle-scroll.bundle.js',
  globalName: 'WITLeadershipScrollBundle',
});

await esbuild.build({
  ...shared,
  entryPoints: ['components/ui/gradient-bars-footer-mount.tsx'],
  outfile: 'assets/gradient-bars-footer.bundle.js',
  globalName: 'WITGradientBarsFooterBundle',
});

await esbuild.build({
  ...shared,
  entryPoints: ['components/ui/luma-register-mount.tsx'],
  outfile: 'assets/luma-register.bundle.js',
  globalName: 'WITLumaRegisterBundle',
});

await esbuild.build({
  ...shared,
  entryPoints: ['components/ui/mini-navbar-mount.tsx'],
  outfile: 'assets/mini-navbar.bundle.js',
  globalName: 'WITMiniNavbarBundle',
});

await esbuild.build({
  ...shared,
  entryPoints: ['components/ui/not-found-page-mount.tsx'],
  outfile: 'assets/not-found-page.bundle.js',
  globalName: 'WITNotFoundPageBundle',
});

console.log('Built assets/text-scramble.bundle.js');
console.log('Built assets/hero-with-logos.bundle.js');
console.log('Built assets/leadership-circle-scroll.bundle.js');
console.log('Built assets/gradient-bars-footer.bundle.js');
console.log('Built assets/luma-register.bundle.js');
console.log('Built assets/mini-navbar.bundle.js');
console.log('Built assets/not-found-page.bundle.js');
