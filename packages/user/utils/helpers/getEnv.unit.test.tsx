import {describe, it, vi, expect} from 'vitest';
import {getEnv} from './getEnv';

vi.hoisted(() => {
  vi.stubEnv('TEST', 'test');
});

describe('GetEnv', () => {
  it('Does not throw an error when env variables exists', () => {
    const result = getEnv('TEST');
    expect(result).toEqual('test');
  });

  it('Throws an en error when an env variable does not exist', () => {
    expect(() => {
      getEnv('FOO');
    }).toThrowError('Could not get FOO');
  });
});
