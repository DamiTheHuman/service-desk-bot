import {dynamoDB} from '../aws/dynamoDB';
import {getEnv} from './getEnv';

export const getTickets = async () => {
  const params = {
    TableName: getEnv('TICKETS_TABLE'),
    Select: 'ALL_ATTRIBUTES',
  };

  return await dynamoDB.scan(params).promise();
};
