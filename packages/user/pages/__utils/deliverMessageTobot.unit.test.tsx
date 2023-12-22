import {describe, it, expect, vi} from 'vitest';
import {deliverMessageToBot} from './deliverMessageToBot';

const {MockAxiosPost} = vi.hoisted(() => {
  const xmlStub = '<root><messages>Hello</messages></root>';

  return {
    MockAxiosPost: vi.fn().mockResolvedValue({
      data: {
        messages: [{content: xmlStub}],
      },
    }),
  };
});

vi.mock('axios', () => {
  return {
    default: {
      post: MockAxiosPost,
    },
  };
});

describe('DeliverMessageToBot', () => {
  it('Returns nothing if no message is passed', async () => {
    const result = await deliverMessageToBot('');
    expect(result).toBeUndefined();
  });

  it('Returns data if the request is successful', async () => {
    const result = await deliverMessageToBot('hello');
    expect(result).toStrictEqual({messages: ['Hello']});
  });

  it('Returns data with options in the appropriate format ', async () => {
    const xmlStub =
      '<root><messages>Hello</messages><options><key>Foo</key><value>Bar</value></options></root>';

    MockAxiosPost.mockResolvedValueOnce({
      data: {
        messages: [{content: xmlStub}],
      },
    });

    const result = await deliverMessageToBot('hello');
    expect(result).toStrictEqual({
      messages: ['Hello'],
      options: [
        {
          key: 'Foo',
          value: 'Bar',
        },
      ],
    });
  });
});
