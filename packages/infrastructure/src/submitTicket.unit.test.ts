import {describe, it, expect, vi, afterEach} from 'vitest';
import {handler} from './submitTicket';

const {MockDynamoDB} = vi.hoisted(() => {
  vi.stubEnv('DYNAMODB_TABLE_NAME', 'testTable');
  const MockDynamoDB = vi
    .fn()
    .mockReturnValue({putItem: vi.fn().mockReturnValue({promise: vi.fn()})});
  MockDynamoDB['Converter'] = {marshall: vi.fn()};

  return {MockDynamoDB};
});

vi.mock('aws-sdk', () => {
  return {
    DynamoDB: MockDynamoDB,
  };
});

describe('SubmitTicket', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  const intentStub = {
    sessionState: {
      intent: {
        slots: {
          SystemType: {
            value: {
              interpretedValue: 'System 1',
            },
          },
          LevelType: {
            value: {
              interpretedValue: '5',
            },
          },
          DetailType: {
            value: {
              interpretedValue: 'Something went wrong',
            },
          },
        },
      },
      sessionAttributes: {
        Name: 'test',
      },
    },
  };

  it('Returns a Fulfilled intent response', async () => {
    const result = await handler(intentStub);

    expect(result).toStrictEqual({
      sessionState: {
        dialogAction: {
          type: 'Close',
        },
        intent: {
          name: 'RaiseAnIncidentIntent',
          state: 'Fulfilled',
        },
      },
    });
  });

  it('Returns a Failed intent response if an exception occurs', async () => {
    vi.stubEnv('DYNAMODB_TABLE_NAME', '');

    const result = await handler(intentStub);

    expect(result).toStrictEqual({
      sessionState: {
        dialogAction: {
          type: 'Close',
        },
        intent: {
          name: 'RaiseAnIncidentIntent',
          state: 'Failed',
        },
      },
    });
  });
});
