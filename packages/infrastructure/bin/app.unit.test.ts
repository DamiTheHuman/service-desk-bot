import {describe, it, expect} from 'vitest';
import * as config from '../config';
import * as cdk from 'aws-cdk-lib';
import {LexStack} from '../lib/lex-stack';
import {Template} from 'aws-cdk-lib/assertions';

describe('App', () => {
  it('creates the stack', () => {
    const app = new cdk.App({
      context: {stage: 'test'},
    });

    const stack = new LexStack(app, 'LexStack-dev', config.dev);

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 1);
    template.resourceCountIs('AWS::DynamoDB::Table', 1);
    expect(stack).toBeDefined();
  });
});
