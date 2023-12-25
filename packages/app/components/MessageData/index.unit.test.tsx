import {render} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import MessageData, {MessageType, IMessageData} from '.';

describe('MessageData', () => {
  const messageStub: IMessageData = {messages: []};

  it('Renders the Message Data', () => {
    const {container} = render(
      <MessageData
        timestamp={new Date()}
        type={MessageType.User}
        onClick={vi.fn()}
        data={messageStub}
      />
    );

    const rootComponent = container.querySelector('.message-data');
    expect(rootComponent).toBeTruthy();
  });

  it('Renders appropriate data if the message is from a user', () => {
    const {container} = render(
      <MessageData
        timestamp={new Date()}
        type={MessageType.User}
        onClick={vi.fn()}
        data={messageStub}
      />
    );

    const icon = container.querySelector('.bi-person');
    const author = container.querySelector('.message-data__author-role');

    expect(icon).toBeTruthy();
    expect(author?.innerHTML).toEqual('You');
  });

  it('Renders appropriate data if the message is from a bot', () => {
    const {container} = render(
      <MessageData
        timestamp={new Date()}
        type={MessageType.Bot}
        onClick={vi.fn()}
        data={messageStub}
      />
    );

    const icon = container.querySelector('.bi-robot');
    const author = container.querySelector('.message-data__author-role');

    expect(icon).toBeTruthy();
    expect(author?.innerHTML).toEqual('Service Desk Bot');
  });
});
