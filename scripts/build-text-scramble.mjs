import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['components/ui/heading-scramble-mount.tsx'],
  outfile: 'assets/text-scramble.bundle.js',
  bundle: true,
  format: 'iife',
  globalName: 'WITHeadingScrambleBundle',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  loader: { '.tsx': 'tsx' },
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

console.log('Built assets/text-scramble.bundle.js');
