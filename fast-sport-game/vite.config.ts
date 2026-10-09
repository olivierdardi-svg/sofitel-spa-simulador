import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// base './' keeps every asset path relative, so the build can be hosted
// at a domain root, in a sub-folder, or behind an iframe without changes.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { target: 'es2020', assetsInlineLimit: 0 },
  test: { environment: 'node' },
});
