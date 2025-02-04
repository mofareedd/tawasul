import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  noExternal: ['@tawasul'], // Bundle any package starting with `@tawasul` and their dependencies
  external: ['ws'], // 👈 Exclude `ws` so it's not bundled
  splitting: false,
  sourcemap: true,
  outDir: 'dist',
  bundle: true,
  format: ['esm'],
  platform: 'node',
  // minify: true,
  clean: true,
  onSuccess: 'cp ./package.json dist/',
});
