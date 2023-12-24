import {describe, expect, it, vi} from 'vitest';
import {getLexRuntime as lexRuntime} from './lexRuntime';

vi.hoisted(() => {
  vi.stubEnv('AWS_REGION', 'test');
  vi.stubEnv('AWS_PROFILE', 'default');
});

describe('LexRuntime', () => {
  it('Does not throw an error when env variables are set', () => {
    expect(lexRuntime).toBeDefined();
  });
});
