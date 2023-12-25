import {describe, expect, it, vi} from 'vitest';
import {dynamoDB} from './dynamoDB';

vi.hoisted(() => {
  vi.stubEnv('AWS_REGION', 'test');
  vi.stubEnv('AWS_PROFILE', 'default');
  vi.stubEnv('AWS_ACCESS_KEY_ID', '123');
  vi.stubEnv('AWS_SECRET_ACCESS_KEY', '456');
});

describe('DynamoDB', () => {
  it('Does not throw an error when env variables are set', () => {
    expect(dynamoDB).toBeDefined();
  });
});
