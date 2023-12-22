import {get} from './request';
import {describe, test, expect, vi, afterEach} from 'vitest';

const {MockAxios} = vi.hoisted(() => {
  return {
    MockAxios: {
      get: vi.fn().mockReturnValue('hello'),
    },
  };
});

vi.mock('axios', async () => {
  return {
    default: MockAxios,
  };
});

describe('request', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('When a get request is made with no errors', async () => {
    const response = await get('localhost');

    expect(MockAxios.get).toBeCalledWith('localhost');
    expect(MockAxios.get).toHaveBeenCalledOnce();
    expect(response).toEqual('hello');
  });

  test('When a get request is made and a generic error occurs', () => {
    MockAxios.get.mockRejectedValueOnce(new Error('Something went wrong'));

    expect(async () => await get('localhost')).rejects.toThrowError(
      'Something went wrong'
    );
  });

  test('When a get request is made and an error occurs', () => {
    MockAxios.get.mockRejectedValueOnce('generic error');

    expect(async () => await get('localhost')).rejects.toThrow('generic error');
  });
});
