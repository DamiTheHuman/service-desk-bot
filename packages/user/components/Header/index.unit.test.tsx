import {render} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import Header from '.';
const {MockUsePathname} = vi.hoisted(() => {
  return {
    MockUsePathname: vi.fn().mockReturnValue('/statistics'),
  };
});

vi.mock('next/navigation', () => {
  return {
    usePathname: MockUsePathname,
  };
});

describe('Header', () => {
  it('Renders a header with just statistics page highlighted', () => {
    const {container} = render(<Header />);

    const activeLinks = container.querySelectorAll('.active');
    const links = container.querySelectorAll('.nav-link');

    expect(activeLinks[0]?.innerHTML).toEqual('Statistics');
    expect(activeLinks.length).toEqual(1);
    expect(links.length).toEqual(2);
  });
});
