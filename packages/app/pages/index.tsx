import {FormEvent, useState} from 'react';
import {
  IMessageDataProps,
  MessageType,
  IMessageData,
} from '../components/MessageData';
import MessageBox from '../components/MessageBox';
import {postMessage} from '../utils/helpers/postMessage';

export default function Page() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  //TODO: Explore a better way of handling this type
  const [messages, setMessages] = useState<
    Omit<IMessageDataProps, 'onClick'>[]
  >([
    {
      data: {
        messages: ['Say Something to get started!'],
        options: [
          {key: 'Hi', value: 'Hi'},
          {key: 'Hello', value: 'Hello'},
        ],
      },
      timestamp: new Date(),
      type: MessageType.Bot,
    },
  ]);

  const sendMessage = async (message: string) => {
    setMessages(prevState => [
      ...prevState,
      {
        data: {messages: [message]},
        timestamp: new Date(),
        type: MessageType.User,
      },
      {
        data: {messages: ['']},
        timestamp: new Date(),
        type: MessageType.Bot,
        loading: true,
      },
    ]);
    
    setLoading(true)
    setMessage('');
    const data: IMessageData[] | undefined = await postMessage(message);
    setLoading(false);
    if (!data || data.length == 0) {
      return;
    }

    setMessages(prevState => [
      ...prevState.splice(0, prevState.length - 1),
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
    <div
      id="index"
      className="container flex-column vh-75 
    p-4 pb-4 overflow-auto">
      <div className="d-flex justify-content-between flex-column pb-4">
        <h2>
          Service Desk Bot <span className="h4 text-black-50">v.1.0.0</span>
        </h2>
        <MessageBox messageData={messages} onClick={sendMessage} />
        <div className="mt-auto fixed-bottom container pb-2 bg-white">
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
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
