import {describe, it, vi, expect} from 'vitest';
import MessageBox from '.';
import {render} from '@testing-library/react';
import {IMessageDataProps, MessageType} from '../MessageData';

describe('Message Box', () => {
  const messageStub: IMessageDataProps[] = [
    {
      data: {
        messages: ['hello'],
      },
      timestamp: new Date(),
      type: MessageType.User,
      onClick: vi.fn(),
    },
  ];

  it('it renders nothing if no message data', () => {
    const {container} = render(
      <MessageBox messageData={[]} onClick={vi.fn()} />
    );

    const rootComponent = container.querySelector('.message-box');
    expect(rootComponent).toBeNull();
  });

  it('it renders the Message box if there is message data', () => {
    const {container} = render(
      <MessageBox messageData={messageStub} onClick={vi.fn()} />
    );

    const rootComponent = container.querySelector('.message-box');
    expect(rootComponent).toBeTruthy();
  });

  it('it renders the Message box with a message data', () => {
    const {container} = render(
      <MessageBox messageData={messageStub} onClick={vi.fn()} />
    );

    const messageData = container.querySelector('.message-data');
    expect(messageData).toBeTruthy();
  });
});
