import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Messages from '.';

describe('Messages', () => {
  it('Renders the Messages Component if there are messages', () => {
    const {container} = render(<Messages messages={['test']} />);

    const rootComponent = container.querySelector('.messages');
    expect(rootComponent).toBeTruthy();
  });

  it('Renders nothing if no messages exist', () => {
    const {container} = render(<Messages messages={[]} />);

    const rootComponent = container.querySelector('.messages');
    expect(rootComponent).toBeNull();
  });

  it('Renders all the messages in the Message Component', () => {
    const {container} = render(
      <Messages messages={['message 1', 'message 2']} />
    );

    const rootComponent = container.querySelector('.messages');
    const messages = container.querySelectorAll('.messages__message');
    expect(rootComponent).toBeTruthy();
    expect(messages.length).toEqual(2);
    expect(messages[0].innerHTML).toEqual('message 1');
    expect(messages[1].innerHTML).toEqual('message 2');
  });
});
