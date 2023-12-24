import {DynamoDB} from 'aws-sdk';
// @ts-expect-error: Unreachable code error
import * as uuid from 'uuid';

export interface ISlot {
  value: {
    interpretedValue: string;
  };
}

export interface IAWSLexIntentEvent {
  sessionState: {
    intent: {
      slots: Record<string, ISlot>;
    };
    sessionAttributes: {
      Name: string;
    };
  };
}

export const handler = async (event: IAWSLexIntentEvent) => {
  try {
    const dynamoDB = new DynamoDB();
    if (!process.env.DYNAMODB_TABLE_NAME) {
      throw new Error('Please set the DYNAMODB_TABLE_NAME');
    }

    const slots = event.sessionState.intent.slots;
    const username = event.sessionState.sessionAttributes.Name;
    const systemAffected = slots.SystemType.value.interpretedValue;
    const incidentLevel = slots.LevelType.value.interpretedValue;
    const detail = slots.DetailType.value.interpretedValue;

    const newItem = {
      ticketId: uuid.v4(),
      username,
      systemAffected,
      incidentLevel,
      detail,
    };

    const params: DynamoDB.PutItemInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: DynamoDB.Converter.marshall(newItem),
    };

    await dynamoDB.putItem(params).promise();

    return {
      sessionState: {
        dialogAction: {
          type: 'Close',
        },
        intent: {
          name: 'RaiseAnIncidentIntent',
          state: 'Fulfilled',
        },
      },
    };
  } catch (error) {
    console.error('Error adding item to DynamoDB:', error);

    return {
      sessionState: {
        dialogAction: {
          type: 'Close',
        },
        intent: {
          name: 'RaiseAnIncidentIntent',
          state: 'Failed',
        },
      },
    };
  }
};
