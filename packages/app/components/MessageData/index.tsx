import React from 'react';
import Options, {IOption} from '../Options';
import Messages from '../Messages';

export enum MessageType {
  User,
  Bot,
}

export interface IMessageData {
  messages: string[];
  options?: Array<IOption>;
}

export interface IMessageDataProps {
  data: IMessageData;
  timestamp: Date;
  type: MessageType;
  loading?: boolean;
  onClick: (message: string) => void;
}

const MessageData: React.FC<IMessageDataProps> = ({
  data,
  type,
  loading,
  onClick,
}) => {
  const icon: string = type == MessageType.User ? 'bi-person' : 'bi-robot';
  const authorRole: string =
    type == MessageType.User ? 'You' : 'Service Desk Bot';

  return (
    <div className="message-data d-flex flex-row">
      <div className="p-2">
        <i className={`bi ${icon} fs-4`}></i>
      </div>
      <div className="p-2">
        <div className="container-fluid">
          <div className="row row-cols-1">
            <div className="col fw-bold message-data__author-role">
              {authorRole}
            </div>
            {loading ? (
              <div className="col message-data__message">
                <div className="row">
                  <div className="col-1">
                    <div
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                    />
                  </div>
                  <div className="col-1">
                    <div
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                    />
                  </div>
                  <div className="col-1">
                    <div
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="col message-data__message">
                <Messages messages={data.messages} />
                <Options onClick={onClick} options={data.options} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageData;
