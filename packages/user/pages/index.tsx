import {FormEvent, useState} from 'react';
import {
  IMessageDataProps,
  MessageType,
  IMessageData,
} from '../components/MessageData';
import MessageBox from '../components/MessageBox';
import {deliverMessageToBot} from './__utils/deliverMessageToBot';

export default function Page() {
  //TODO: Explore a better way of handling this type
  const [messages, setMessages] = useState<
    Omit<IMessageDataProps, 'onClick'>[]
  >([]);
  const [message, setMessage] = useState<string>('');

  const sendMessage = async (message: string) => {
    setMessages(prevState => [
      ...prevState,
      {
        data: {messages: [message]},
        timestamp: new Date(),
        type: MessageType.User,
      },
    ]);

    setMessage('');

    const data: IMessageData[] | undefined = await deliverMessageToBot(message);
    if (!data || data.length == 0) {
      return;
    }

    setMessages(prevState => [
      ...prevState,
      ...data.map(messageData => {
        return {
          data: messageData as IMessageData,
          timestamp: new Date(),
          type: MessageType.Bot,
        };
      }),
    ]);
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(message.trim());
  }

  return (
    <div className="index container p-4">
      <div className="d-flex justify-content-between flex-column">
        <h2>
          Service Desk Bot <span className="h4 text-black-50">v.1.0.0</span>
        </h2>
        <MessageBox messageData={messages} onClick={sendMessage} />
        <div className="mt-auto fixed-bottom container pb-4">
          <form role="deliver-message" onSubmit={onSubmit}>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-person-circle"></i>
              </span>
              <input
                type="text"
                name="message"
                id="message-prompt"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="message-prompt form-control form-control-lg"
                placeholder="Message Service Desk Bot..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
