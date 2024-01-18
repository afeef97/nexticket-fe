import { render, screen } from '@testing-library/react';
import { ILink } from './Navigation';
import NavigationPanel from './NavigationPanel';
import { getUserAccount as getUserAccountMock } from '../actions';
import { useState as useStateMock } from 'react';

jest.mock('../actions', () => ({
  getUserAccount: jest.fn(),
}));
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

  it('renders navigation links with correct href', () => {
    const [showPanel] = useStateMock(true);
    const links: ILink[] = [
      {
        label: 'Test link 1',
        href: '/dashboard',
      },
      {
        label: 'Test link 2',
        href: '/test',
      },
    ];
    render(<NavigationPanel showPanel={showPanel} links={links} />);

    const navigationLinks = screen.getAllByRole('link');

    expect(navigationLinks[0]).toHaveAttribute('href', '/dashboard');
    expect(navigationLinks[1]).toHaveAttribute('href', '/test');
  });

  it('does not render navigation links when links prop is not provided', () => {
    const [showPanel] = useStateMock(true);
    render(<NavigationPanel showPanel={showPanel} links={[]} />);

    const navigationLinks = screen.queryAllByRole('link');

    expect(navigationLinks).toHaveLength(0);
  });

  it('should disable links when user has no organization', () => {
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
    (getUserAccountMock as jest.Mock).mockReturnValue({
      data: {
        data: {
          organization_id: null,
        },
      },
    });
    render(<NavigationPanel showPanel={showPanel} links={links} />);

    const navigationLinks = screen.getAllByRole('link');

    expect(navigationLinks[0]).toHaveClass(
      'tw-text-gray-500 tw-pointer-events-none'
    );
    expect(navigationLinks[1]).toHaveClass(
      'tw-text-gray-500 tw-pointer-events-none'
    );
  });
});
