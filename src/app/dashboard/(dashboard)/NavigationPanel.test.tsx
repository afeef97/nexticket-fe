import { render, screen } from '@testing-library/react';
import AccessContextProvider from '@/components/shared/AccessContextProvider';
import { AppRouterContextProviderMock } from '@/components/test/RouterContextProviderMock';
import { ILink } from './Navigation';
import NavigationPanel from './NavigationPanel';
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
  const userAccountResponse = {
    ok: true,
    data: {
      data: {
        organization: {
          id: 1,
          name: 'Test Organization',
        },
      },
    },
  };

  it('renders', () => {
    const [showPanel] = useStateMock(false);
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AccessContextProvider userAccountRes={userAccountResponse}>
          <NavigationPanel showPanel={showPanel} links={[]} />
        </AccessContextProvider>
      </AppRouterContextProviderMock>
    );

    const navigationPanel = screen.getByTestId('navigation-panel');

    expect(navigationPanel).toBeInTheDocument();
  });
});

describe('NavigationPanel navigation links', () => {
  const userAccountResponse = {
    ok: true,
    data: {
      data: {
        organization: {
          id: 1,
          name: 'Test Organization',
        },
      },
    },
  };

  it('renders navigation links when links prop is provided', () => {
    const [showPanel] = useStateMock(true);
    const push = jest.fn();
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
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AccessContextProvider userAccountRes={userAccountResponse}>
          <NavigationPanel showPanel={showPanel} links={links} />
        </AccessContextProvider>
      </AppRouterContextProviderMock>
    );

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
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AccessContextProvider userAccountRes={userAccountResponse}>
          <NavigationPanel showPanel={showPanel} links={links} />
        </AccessContextProvider>
      </AppRouterContextProviderMock>
    );

    const navigationLinks = screen.getAllByRole('link');

    expect(navigationLinks[0]).toHaveAttribute('href', '/dashboard');
    expect(navigationLinks[1]).toHaveAttribute('href', '/test');
  });

  it('does not render navigation links when links prop is not provided', () => {
    const [showPanel] = useStateMock(true);
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AccessContextProvider userAccountRes={userAccountResponse}>
          <NavigationPanel showPanel={showPanel} links={[]} />
        </AccessContextProvider>
      </AppRouterContextProviderMock>
    );

    const navigationLinks = screen.queryAllByRole('link');

    expect(navigationLinks).toHaveLength(0);
  });

  it('should disable links when user has no organization', () => {
    const [showPanel] = useStateMock(true);
    const userAccountResponse = {
      ok: true,
      data: {
        data: {
          organization: {
            id: null,
          },
        },
      },
    };

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
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AccessContextProvider userAccountRes={userAccountResponse}>
          <NavigationPanel showPanel={showPanel} links={links} />
        </AccessContextProvider>
      </AppRouterContextProviderMock>
    );

    const navigationLinks = screen.getAllByRole('link');

    expect(navigationLinks[0]).toHaveClass(
      'tw-text-gray-500 tw-pointer-events-none'
    );
    expect(navigationLinks[1]).toHaveClass(
      'tw-text-gray-500 tw-pointer-events-none'
    );
  });
});
