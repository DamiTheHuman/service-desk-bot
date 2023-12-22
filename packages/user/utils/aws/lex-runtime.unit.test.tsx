import {describe, it, vi} from 'vitest';
import {getLexRuntime} from './lex-runtime';

vi.hoisted(() => {
  vi.stubEnv('AWS_REGION', 'test');
  vi.stubEnv('AWS_PROFILE', 'default');
});

describe('Get LexRuntime', () => {
  it('Does not throw an error when env variables are set', () => {
    getLexRuntime;
  });
});
