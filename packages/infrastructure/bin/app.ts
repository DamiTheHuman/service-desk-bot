import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {LexStack} from '../lib/lex-stack';
import * as config from '../config';

const app = new cdk.App();

new LexStack(app, 'LexStack-dev', config.dev);
