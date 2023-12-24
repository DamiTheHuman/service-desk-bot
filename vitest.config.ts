import {configDefaults, defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: [...configDefaults.include],
    coverage: {
      provider: 'v8',
      exclude: [
        ...(configDefaults.coverage.exclude ?? ''),
        'packages/infrastructure/bin/app.ts',
        'packages/infrastructure/cdk.out/',
      ],
    },
    environment: 'jsdom',
    pool: 'forks', // Needed for bundling NodeJSFunction during tests
  },
});
