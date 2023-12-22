import React from 'react';

export interface IMessagesProps {
  messages: string[];
}

const Messages: React.FC<IMessagesProps> = ({messages}) => {
  if (!messages || messages.length == 0) {
    return null;
  }

  return messages.map((message, key) => {
    return (
      <div className="messages" key={key}>
        <p className="messages__message">{message}</p>
      </div>
    );
  });
};

export default Messages;
