import React from 'react';
import MessageData, {IMessageDataProps} from '../MessageData';

export interface IMessageBoxProps {
  messageData: Omit<IMessageDataProps, 'onClick'>[];
  onClick: (message: string) => void;
}

const MessageBox: React.FC<IMessageBoxProps> = ({messageData, onClick}) => {
  if (messageData.length == 0) {
    return null;
  }

  return (
    <div className="message-box">
      {messageData.map(({data, timestamp, type}, key) => {
        return (
          <MessageData
            key={key}
            data={data}
            timestamp={timestamp}
            type={type}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
};

export default MessageBox;
