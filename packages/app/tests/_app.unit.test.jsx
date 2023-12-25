import React from 'react';
import {expect, describe, it} from 'vitest';
import {render} from '@testing-library/react';
import App from '../pages/_app';
import Page from '../pages/index';

describe('Index Page', () => {
  it('renders correctly', () => {
    const {asFragment} = render(<App Component={Page} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
