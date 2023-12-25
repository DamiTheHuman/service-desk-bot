import * as cdk from 'aws-cdk-lib';
import {ServiceNowDataStack} from '../lib/ServiceNowDataStack';
import {ServiceNowAppStack} from '../lib/ServiceNowAppStack';
import {stages} from '../config';

const app = new cdk.App();

const context = app.node.tryGetContext('context');
let config = stages.dev;
switch (context) {
  case 'prod':
    config = stages.prod;
    break;
  default:
    config = stages.dev;
}
new ServiceNowDataStack(app, `${config.stage}-ServiceNowDataStack`, config);
new ServiceNowAppStack(app, `${config.stage}-ServiceNowBotAppStack`, config);
