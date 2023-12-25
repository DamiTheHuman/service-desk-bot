import {vi, expect, describe, it, Mocked, afterEach} from 'vitest';
import submit from '../../pages/api/submit';
import {NextApiRequest, NextApiResponse} from 'next';

const {promiseMock, getLexRuntimeMock, statusMock, setHeaderMock} = vi.hoisted(
  () => {
    vi.stubEnv('AWS_REGION', 'production');
    vi.stubEnv('BOT_ID', '1');
    vi.stubEnv('BOT_ALIAS_ID', '2');
    vi.stubEnv('BOT_LOCALE_ID', 'test');

    const promiseMock = vi
      .fn()
      .mockReturnValue({message: 'hello', sessionState: {}});
    const getLexRuntimeMock = {
      recognizeText: vi.fn().mockReturnValue({
        promise: promiseMock,
      }),
    };
    const statusMock = vi.fn().mockReturnValue({json: vi.fn()});
    const setHeaderMock = vi.fn();

    return {
      promiseMock,
      getLexRuntimeMock,
      statusMock,
      setHeaderMock,
    };
  }
);

const reqMock: Mocked<NextApiRequest> = {
  body: {message: 'Hello'},
  cookies: {sessionId: 'test'},
} as unknown as Mocked<NextApiRequest>;

const resMock: Mocked<NextApiResponse> = {
  status: statusMock,
  setHeader: setHeaderMock,
} as unknown as Mocked<NextApiResponse>;

vi.mock('../../utils/aws/lexRuntime', () => {
  return {
    getLexRuntime: getLexRuntimeMock,
  };
});

vi.mock('../../utils/helpers/generateSession', () => {
  return {
    generateSession: vi.fn(),
  };
});

describe('api/submit', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns a 200 response if successful', async () => {
    await submit(reqMock, resMock);
    expect(statusMock).toBeCalledWith(200);
  });

  it('returns a 200 response if successful if the session id is unavailable', async () => {
    const reqMock: Mocked<NextApiRequest> = {
      body: {message: 'Hello'},
      cookies: {},
    } as unknown as Mocked<NextApiRequest>;

    await submit(reqMock, resMock);
    expect(statusMock).toBeCalledWith(200);
  });

  it('returns a 500 response if an error occurs', async () => {
    promiseMock.mockRejectedValueOnce(() => 'Async Error');

    await submit(reqMock, resMock);
    expect(statusMock).toBeCalledWith(500);
  });
});
