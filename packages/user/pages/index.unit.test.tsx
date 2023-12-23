import React from 'react';
import {expect, describe, it, vi, beforeEach, afterEach} from 'vitest';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from '@testing-library/react';
import Page from '.';

const {MockDeliverMessageToBot} = vi.hoisted(() => {
  return {
    MockDeliverMessageToBot: vi.fn().mockResolvedValue([
      {
        messages: ['Foo'],
      },
    ]),
  };
});

vi.mock('./__utils/deliverMessageToBot', () => {
  return {
    deliverMessageToBot: MockDeliverMessageToBot,
  };
});

describe('Index Page', () => {
  let container;

  beforeEach(() => {
    const renderData = render(<Page />);
    container = renderData.container;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Keeps track of user input when they type', () => {
    const rootComponent = container.querySelector('.index');
    const inputElement = screen.getByPlaceholderText(
      'Message Service Desk Bot...'
    );
    fireEvent.change(inputElement, {
      target: {value: 'Test Input'},
    });

    expect(rootComponent).toBeTruthy();
    expect(inputElement.getAttribute('value')).toEqual('Test Input');
  });

  it('It does not submit and reset the input field if the user inputs empty spaces', () => {
    const inputElement = screen.getByPlaceholderText(
      'Message Service Desk Bot...'
    );
    fireEvent.change(inputElement, {
      target: {value: '   '},
    });

    expect(inputElement.getAttribute('value')).toEqual('   ');
  });

  it('It does not render the Foo response from aws lex on the page', async () => {
    MockDeliverMessageToBot.mockImplementationOnce(() => {
      return;
    });
    const inputElement = screen.getByPlaceholderText(
      'Message Service Desk Bot...'
    );

    fireEvent.change(inputElement, {
      target: {value: 'Test Input 1'},
    });

    const formElement = screen.getByRole('deliver-message');
    fireEvent.submit(formElement);
    expect(inputElement.getAttribute('value')).toEqual('');

    await waitFor(() => {
      const botMessage = screen.queryByText('Foo');
      expect(botMessage).toBeNull();
    });
  });

  it('It renders the Foo response from aws lex on the page', async () => {
    const inputElement = screen.getByPlaceholderText(
      'Message Service Desk Bot...'
    );

    fireEvent.change(inputElement, {
      target: {value: 'Test Input 1'},
    });

    const formElement = screen.getByRole('deliver-message');
    fireEvent.submit(formElement);
    expect(inputElement.getAttribute('value')).toEqual('');

    await waitFor(() => {
      const botMessage = screen.queryByText('Foo');
      expect(botMessage).toBeDefined();
    });
  });
});
