import {describe, expect, it, vi} from 'vitest';
import {dynamoDB} from './dynamoDB';

vi.hoisted(() => {
  vi.stubEnv('AWS_REGION', 'test');
  vi.stubEnv('AWS_PROFILE', 'default');
});

describe('DynamoDB', () => {
  it('Does not throw an error when env variables are set', () => {
    expect(dynamoDB).toBeDefined();
  });
});
