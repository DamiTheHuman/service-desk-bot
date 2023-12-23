import React from 'react';
import {expect, describe, it} from 'vitest';
import {render} from '@testing-library/react';
import App from './_app';
import Page from '.';

describe('Index Page', () => {
  it('renders correctly', () => {
    const {asFragment} = render(<App Component={Page} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
