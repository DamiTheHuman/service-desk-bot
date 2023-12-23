import {Stack} from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {Construct} from 'constructs';
import {IEnvironment} from '../config/environment';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';

export class LexStack extends Stack {
  constructor(scope: Construct, id: string, props?: IEnvironment) {
    super(scope, id, props);

    new NodejsFunction(this, 'SubmitTicket', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'src/submitTicket.ts',
    });
  }
}
