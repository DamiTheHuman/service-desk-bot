import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Ticket from '.';

describe('Ticket', () => {
  it('Renders the Ticket Component with the appropriate data', () => {
    const {container} = render(
      <Ticket
        id={0}
        username={'testUser'}
        incidentLevel={'2'}
        systemAffected={'Site 1'}
        detail={'It is all broken'}
      />
    );

    const rootComponent = container.querySelector('.ticket');
    expect(screen.getByText('testUser')).toBeDefined();
    expect(screen.getByText('Site 1')).toBeDefined();
    expect(screen.getAllByRole('img').length).toEqual(2);
    expect(screen.getByText('It is all broken')).toBeDefined();

    expect(rootComponent).toBeTruthy();
  });
});
