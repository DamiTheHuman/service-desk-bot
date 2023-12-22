import {describe, expect, it, vi, afterEach} from 'vitest';
import {render} from '@testing-library/react';
import RootLayout from './layout';

describe('Layout', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('Renders the Layout page', () => {
    const {container} = render(<RootLayout children={''} />);
    const body = container.querySelector('body');
    expect(body).toBeDefined();
  });
});
