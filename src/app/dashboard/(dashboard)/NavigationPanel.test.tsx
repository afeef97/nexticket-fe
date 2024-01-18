import { render, screen } from '@testing-library/react';
import { ILink } from './Navigation';
import NavigationPanel from './NavigationPanel';
import { useState as useStateMock } from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
(useStateMock as jest.Mock).mockImplementation((init) => [init, jest.fn()]);

describe('NavigationPanel component', () => {
  it('renders', () => {
    const [showPanel] = useStateMock(true);
    render(<NavigationPanel showPanel={showPanel} links={[]} />);

    const navigationPanel = screen.getByTestId('navigation-panel');

    expect(navigationPanel).toBeInTheDocument();
  });
});

describe('NavigationPanel navigation links', () => {
  it('renders navigation links when links prop is provided', () => {
    const [showPanel] = useStateMock(true);
    const links: ILink[] = [
      {
        label: 'Test link 1',
        href: '/dashboard',
      },
      {
        label: 'Test link 2',
        href: '/dashboard',
      },
    ];
    render(<NavigationPanel showPanel={showPanel} links={links} />);

    const navigationLinks = screen.getAllByRole('link');

    expect(navigationLinks).toHaveLength(2);
  });

  it('does not render navigation links when links prop is not provided', () => {
    const [showPanel] = useStateMock(true);
    render(<NavigationPanel showPanel={showPanel} links={[]} />);

    const navigationLinks = screen.queryAllByRole('link');

    expect(navigationLinks).toHaveLength(0);
  });
});
