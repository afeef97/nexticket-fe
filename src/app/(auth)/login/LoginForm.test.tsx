import { render, screen } from '@testing-library/react';
import { AppRouterContextProviderMock } from '@/components/test/RouterContextProviderMock';
import LoginForm from './LoginForm';
import { getToken } from '../actions';

jest.mock('../actions', () => ({
  getToken: jest.fn(),
}));
(getToken as jest.Mock).mockResolvedValue({
  ok: false,
  data: {},
});

describe('LoginForm', () => {
  it('should render with correct fields', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginForm />
      </AppRouterContextProviderMock>
    );

    const emailInput = screen.getByPlaceholderText(/^Enter your email$/);
    const passwordInput = screen.getByPlaceholderText(/^Enter your password$/);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render with correct labels', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginForm />
      </AppRouterContextProviderMock>
    );

    const emailLabel = screen.getByText(/^Email$/);
    const passwordLabel = screen.getByText(/^Password$/);

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  it('should render with login button', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginForm />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent(/^Login$/);
  });
});
