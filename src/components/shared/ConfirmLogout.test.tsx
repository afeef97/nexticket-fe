import { render, screen } from '@testing-library/react';
import { AppRouterContextProviderMock } from '../test/RouterContextProviderMock';
import ConfirmLogout from './ConfirmLogout';

describe('ConfirmLogout component', () => {
  const push = jest.fn();
  it('should render when open is true', () => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <ConfirmLogout open={true} setOpen={() => {}} />
      </AppRouterContextProviderMock>
    );

    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <ConfirmLogout open={false} setOpen={() => {}} />
      </AppRouterContextProviderMock>
    );

    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
  });
});

describe('ConfirmLogout action buttons', () => {
  const push = jest.fn();
  it('should have a logout button and cancel button', async () => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <ConfirmLogout open={true} setOpen={() => {}} />
      </AppRouterContextProviderMock>
    );

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(logoutButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});
