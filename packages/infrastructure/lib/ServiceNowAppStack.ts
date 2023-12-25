import * as apprunner_alpha from '@aws-cdk/aws-apprunner-alpha';
import * as cdk from 'aws-cdk-lib';
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';
import {Construct} from 'constructs';
import {IEnvironment} from '../config/environment';

export class ServiceNowAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IEnvironment) {
    super(scope, id, props);

    const imageAsset = new ecrAssets.DockerImageAsset(
      this,
      `${props.stage}-FrontendImage`,
      {
        directory: `${__dirname}/../../user`,
      }
    );

    const service = new apprunner_alpha.Service(
      this,
      `${props.stage}-ServiceNowBotApp`,
      {
        source: apprunner_alpha.Source.fromAsset({
          asset: imageAsset,
        }),
        cpu: apprunner_alpha.Cpu.ONE_VCPU,
        memory: apprunner_alpha.Memory.TWO_GB,
      }
    );

    new cdk.CfnOutput(this, 'ServiceUrl', {value: service.serviceUrl});
  }
}
