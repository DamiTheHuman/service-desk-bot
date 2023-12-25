import {describe, expect, it} from 'vitest';
import nextConfig from './next.config';

describe('Next Config', () => {
  it('nextConfig is defined', () => {
    expect(nextConfig).toBeDefined();
  });
});
