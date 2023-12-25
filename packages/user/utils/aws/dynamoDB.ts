import AWS from 'aws-sdk';
import {getEnv} from '../helpers/getEnv';

const credentials = new AWS.Credentials({
  accessKeyId: getEnv('AWS_ACCESS_KEY_ID'),
  secretAccessKey: getEnv('AWS_SECRET_ACCESS_KEY')
})

AWS.config.credentials = credentials;
AWS.config.region = getEnv('AWS_REGION');

export const dynamoDB = new AWS.DynamoDB();
