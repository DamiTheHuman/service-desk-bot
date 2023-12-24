import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Star from '.';

describe('Star', () => {
  it('Renders a maximum of 5 stars', () => {
    const {container} = render(<Star rating={6} />);

    const stars = container.querySelectorAll('.star');
    expect(stars.length).toEqual(5);
  });

  it('Renders 2 stars as it is within range', () => {
    const {container} = render(<Star rating={2} />);

    const stars = container.querySelectorAll('.star');
    expect(stars.length).toEqual(2);
  });

  it('Renders at least one star', () => {
    const {container} = render(<Star rating={-5} />);

    const stars = container.querySelectorAll('.star');
    expect(stars.length).toEqual(1);
  });
});
