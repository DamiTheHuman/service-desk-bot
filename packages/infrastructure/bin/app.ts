import * as cdk from 'aws-cdk-lib';
import {ServiceNowDataStack} from '../lib/ServiceNowDataStack';
import {ServiceNowAppStack} from '../lib/ServiceNowAppStack';
import * as configs from '../config';

const app = new cdk.App();

const context = app.node.tryGetContext('context');
let config = configs.dev;
switch (context) {
  case 'prod':
    config = configs.prod;
    break;
  default:
    config = configs.dev;
}
new ServiceNowDataStack(app, `${config.stage}-ServiceNowDataStack`, config);
new ServiceNowAppStack(app, `${config.stage}-ServiceNowBotAppStack`, config);
