import { render, screen } from '@testing-library/react';
import VerifyForm from './VerifyForm';

describe('VerifyForm', () => {
  it('should render with correct fields', () => {
    render(<VerifyForm />);

    const tokenInput = screen.getByPlaceholderText('Please enter your token');

    expect(tokenInput).toBeInTheDocument();
  });

  it('should render with correct labels', () => {
    render(<VerifyForm />);

    const tokenLabel = screen.getByText('Token');

    expect(tokenLabel).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    render(<VerifyForm />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
