import {Stack, CfnOutput} from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import {Construct} from 'constructs';
import {IEnvironment} from '../config/environment';

export class LexStack extends Stack {
  constructor(scope: Construct, id: string, props?: IEnvironment) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'LexUserPool', {
      userPoolName: 'LexUserPoolName',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
    });

    new cognito.CfnIdentityPool(this, 'LexIdentityPool', {
      allowUnauthenticatedIdentities: true,
    });

    new CfnOutput(this, 'UserPoolId', {value: userPool.userPoolId});
  }
}
