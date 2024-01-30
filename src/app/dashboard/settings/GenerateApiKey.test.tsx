import { render, screen } from '@testing-library/react';
import GenerateApikey from './GenerateApikey';

describe('GenerateApiKey component', () => {
  it('should render', () => {
    render(<GenerateApikey />);

    const apiKeySection = screen.getByTestId('generate-api-key-section');

    expect(apiKeySection).toBeInTheDocument();
  });

  it('should render with correct title', () => {
    render(<GenerateApikey />);

    const title = screen.getByText(/^Generate API key$/);

    expect(title).toBeInTheDocument();
  });

  it('should have a generate key button', () => {
    render(<GenerateApikey />);

    const button = screen.getByRole('button', {
      name: 'Generate key',
    });

    expect(button).toBeInTheDocument();
  });
});
