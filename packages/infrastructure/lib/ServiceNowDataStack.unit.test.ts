import {describe, it, expect} from 'vitest';
import {stages} from '../config';
import * as cdk from 'aws-cdk-lib';
import {ServiceNowDataStack} from '../lib/ServiceNowDataStack';
import {Template} from 'aws-cdk-lib/assertions';

describe('ServiceNowDataStack', () => {
  it('Has the required properties', () => {
    const app = new cdk.App({
      context: {stage: 'test'},
    });

    const config = stages.test;
    const stack = new ServiceNowDataStack(
      app,
      `${config.stage}-ServiceNowDataStack`,
      config
    );

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 1);
    template.resourceCountIs('AWS::DynamoDB::Table', 1);

    expect(stack).toBeDefined();
  });
});
