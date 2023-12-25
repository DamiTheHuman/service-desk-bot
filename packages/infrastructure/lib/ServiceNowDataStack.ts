import {CfnOutput, Stack} from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import {Construct} from 'constructs';
import {IEnvironment} from '../config/environment';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';

export class ServiceNowDataStack extends Stack {
  constructor(scope: Construct, id: string, props: IEnvironment) {
    super(scope, id, props);

    const ticketsTable = new dynamodb.Table(this, `${props.stage}-TicketsTable`, {
      partitionKey: {
        name: 'ticketId',
        type: dynamodb.AttributeType.STRING,
      },
    });

    const submitTicket = new NodejsFunction(this, `${props.stage}-SubmitTicket`, {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: `${__dirname}/../src/submitTicket.ts`,
      environment: {
        DYNAMODB_TABLE_NAME: ticketsTable.tableName,
      },
    });

    ticketsTable.grantReadWriteData(submitTicket);
    
    new CfnOutput(this, 'TicketsTableName', {value: ticketsTable.tableName});
  }
}
