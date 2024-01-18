import { render, screen } from '@testing-library/react';
import { AppRouterContextProviderMock } from '@/components/test/RouterContextProviderMock';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  it('should render with correct fields', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <RegisterForm />
      </AppRouterContextProviderMock>
    );

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Enter your password again'
    );

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it('should render with correct labels', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <RegisterForm />
      </AppRouterContextProviderMock>
    );

    const usernameLabel = screen.getByText('Username');
    const emailLabel = screen.getByText('Email');
    const passwordLabel = screen.getByText('Password');
    const confirmPasswordLabel = screen.getByText('Confirm password');

    expect(usernameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <RegisterForm />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
