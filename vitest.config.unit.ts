import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: loadEnv('test', process.cwd(), ''),
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.ts'],
    coverage: {
      reporter: ['text'],
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/**/*.d.ts', 'src/**/*.js'],
    },
  },
});
