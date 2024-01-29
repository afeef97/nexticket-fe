import { act, render, screen } from '@testing-library/react';
import AccessContextProvider from './AccessContextProvider';
import { AppRouterContextProviderMock } from '../test/RouterContextProviderMock';
import AvatarMenu from './AvatarMenu';
import userEvent from '@testing-library/user-event';

describe('AvatarMenu trigger', () => {
  const push = jest.fn();
  it('should display fallback if avatar is not loaded', async () => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AccessContextProvider
          userAccountRes={{ ok: true, data: { data: { username: 'test' } } }}
        >
          <AvatarMenu />
        </AccessContextProvider>
      </AppRouterContextProviderMock>
    );

    const avatarFallback = screen.getByText('T');

    expect(avatarFallback).toBeInTheDocument();
  });
});

describe('AvatarMenu popover menu', () => {
  const push = jest.fn();
  it('should display the username and email in the menu', async () => {
    const user = userEvent.setup();
    const userDataRes = {
      ok: true,
      data: {
        data: {
          username: 'username',
          email: 'username@email.com',
        },
      },
    };
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AccessContextProvider userAccountRes={userDataRes}>
          <AvatarMenu />
        </AccessContextProvider>
      </AppRouterContextProviderMock>
    );

    await act(async () => {
      await user.click(screen.getByTestId('avatar-menu'));
    });

    const username = screen.getByText(/^username /);
    const email = screen.getByText(/\(username@email.com\)$/);

    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  it('should display the logout button in the menu', async () => {
    const user = userEvent.setup();
    const userDataRes = {
      ok: true,
      data: {
        data: {
          username: 'username',
          email: 'username@email.com',
        },
      },
    };
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AccessContextProvider userAccountRes={userDataRes}>
          <AvatarMenu />
        </AccessContextProvider>
      </AppRouterContextProviderMock>
    );

    await act(async () => {
      await user.click(screen.getByTestId('avatar-menu'));
    });

    const logoutButton = screen.getByRole('button', { name: 'Logout' });

    expect(logoutButton).toBeInTheDocument();
  });
});
