import {describe, it, expect, vi} from 'vitest';
import {getTickets} from './getTickets';

const {MockDynamoDB, MockScan} = vi.hoisted(() => {
  vi.stubEnv('TICKETS_TABLE', 'test table');
  vi.stubEnv('AWS_REGION', 'test');
  vi.stubEnv('AWS_PROFILE', 'default');
  const MockScan = vi
    .fn()
    .mockReturnValue({promise: vi.fn().mockResolvedValue(['successful'])});

  return {
    MockDynamoDB: {
      scan: MockScan,
    },
    MockScan,
  };
});

vi.mock('../../../utils/aws/dynamoDB', () => {
  return {
    dynamoDB: MockDynamoDB,
  };
});

describe('Gets all the tickets', () => {
  it('Calls tickets with the required attributes', async () => {
    await getTickets();

    expect(MockScan).toBeCalledWith({
      Select: 'ALL_ATTRIBUTES',
      TableName: 'test table',
    });
  });
});
