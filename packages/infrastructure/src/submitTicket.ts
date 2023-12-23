export interface ISlot {
  value: {
    interpretedValue: string;
  };
}

export interface IntentEvent {
  sessionState: {
    intent: {
      slots: Record<string, ISlot>;
    };
    sessionAttributes: {
      Name: string;
    };
  };
}

export const handler = async (event: IntentEvent) => {
  const slots = event.sessionState.intent.slots;
  const username = event.sessionState.sessionAttributes.Name;
  const systemAffected = slots.SystemType.value.interpretedValue;
  const incidentLevel = slots.LevelType.value.interpretedValue;
  const detail = slots.DetailType.value.interpretedValue;

  console.log(username, systemAffected, incidentLevel, detail);
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
};
