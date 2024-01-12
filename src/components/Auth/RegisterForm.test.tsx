import { render, screen } from '@testing-library/react';
import RegisterForm from '@/components/Auth/RegisterForm';

describe('RegisterForm', () => {
  it('should render with correct fields', () => {
    render(<RegisterForm />);

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Enter your password again'
    );

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it('should render with correct labels', () => {
    render(<RegisterForm />);

    const emailLabel = screen.getByText('Email');
    const passwordLabel = screen.getByText('Password');
    const confirmPasswordLabel = screen.getByText('Confirm password');

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    render(<RegisterForm />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
