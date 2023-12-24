import React from 'react';
import {expect, describe, it, vi, beforeEach, afterEach} from 'vitest';
import {render, cleanup} from '@testing-library/react';
import Page, {getServerSideProps} from '.';

const {MockGetTickets: MockGetTickets} = vi.hoisted(() => {
  return {
    MockGetTickets: vi.fn().mockResolvedValue([
      {
        messages: ['Foo'],
      },
    ]),
  };
});

vi.mock('./__utils/getTickets', () => {
  return {
    getTickets: MockGetTickets,
  };
});

describe('Statistics Page', () => {
  let container;

  beforeEach(() => {
    const mockData = [
      {
        incidentLevel: {S: '5'},
        detail: {S: 'site is broken'},
        username: {S: 'dami'},
        systemAffected: {S: 'Site 1'},
        ticketId: {S: '5cd02a47-88d9-44c9-a117-61465d5dee70'},
      },
    ];

    const renderData = render(<Page data={mockData} />);
    container = renderData.container;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Renders Page Data', () => {
    const rootComponent = container.querySelector('#statistics');

    expect(rootComponent).toBeTruthy();
  });

  it('Getting server side props', async () => {
    const data = await getServerSideProps();
    expect(data).toBeDefined();
  });
});
