import AWS from 'aws-sdk';
import {getEnv} from '../helpers/getEnv';

const credentials = new AWS.SharedIniFileCredentials({
  profile: getEnv('AWS_PROFILE'),
});

AWS.config.credentials = credentials;
AWS.config.region = getEnv('AWS_REGION');

export const dynamoDB = new AWS.DynamoDB();
