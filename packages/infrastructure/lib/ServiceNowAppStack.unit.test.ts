import {describe, it, expect} from 'vitest';
import {stages} from '../config';
import * as cdk from 'aws-cdk-lib';
import {ServiceNowAppStack} from '../lib/ServiceNowAppStack';
import {Template} from 'aws-cdk-lib/assertions';

describe('ServiceNowDataStack', () => {
  it('Has the required properties', () => {
    const app = new cdk.App({
      context: {stage: 'test'},
    });

    const config = stages.test;
    const stack = new ServiceNowAppStack(
      app,
      `${config.stage}-ServiceNowDataStack`,
      config
    );

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::AppRunner::Service', 1);
    template.resourceCountIs('AWS::IAM::Role', 2);
    template.resourceCountIs('AWS::IAM::Policy', 1);

    expect(stack).toBeDefined();
  });
});
