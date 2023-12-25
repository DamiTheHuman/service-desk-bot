import {render, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import Options from '.';

describe('Options', () => {
  it('Renders the Options Component if there are options', () => {
    const {container} = render(
      <Options options={[{key: 'option', value: 'value'}]} onClick={vi.fn()} />
    );

    const rootComponent = container.querySelector('.options');
    expect(rootComponent).toBeTruthy();
  });

  it('Renders nothing if no options are available', () => {
    const {container} = render(<Options options={[]} onClick={vi.fn()} />);

    const rootComponent = container.querySelector('.options');
    expect(rootComponent).toBeNull();
  });

  it('Renders the Options Component if there are options', () => {
    const MockFunction = vi.fn().mockReturnValue('called');
    const {container} = render(
      <Options
        onClick={MockFunction}
        options={[{key: 'option', value: 'value'}]}
      />
    );

    const rootComponent = container.querySelector('.options');
    const options = container.querySelectorAll('.options__option');
    fireEvent.click(options[0]);

    expect(rootComponent).toBeTruthy();
    expect(options[0].innerHTML).toEqual('option');
    expect(MockFunction).toHaveBeenCalledOnce();
    expect(MockFunction).toHaveBeenCalledWith('value');
  });
});
