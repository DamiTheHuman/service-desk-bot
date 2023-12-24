import {dynamoDB} from '../../../utils/aws/dynamoDB';
import {getEnv} from '../../../utils/helpers/getEnv';

export const getTickets = async () => {
  const params = {
    TableName: getEnv('TICKETS_TABLE'),
    Select: 'ALL_ATTRIBUTES',
  };

  return await dynamoDB.scan(params).promise();
};
