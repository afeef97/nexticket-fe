import { render, screen } from '@testing-library/react';
import NotifyCreateApikey from './NotifyCreateApikey';
import userEvent from '@testing-library/user-event';

describe('NotifyCreateApikey component', () => {
  it('should render with correct title', () => {
    render(<NotifyCreateApikey />);

    const title = screen.getByText(/^Generate your API key$/);

    expect(title).toBeInTheDocument();
  });

  it('should have a close button', () => {
    render(<NotifyCreateApikey />);

    const button = screen.getByLabelText('Close reminder to create API key');

    expect(button).toBeInTheDocument();
  });

  it('should have a dont show again button', () => {
    render(<NotifyCreateApikey />);

    const button = screen.getByRole('button', {
      name: "I understand, don't show again",
    });

    expect(button).toBeInTheDocument();
  });

  it('should close the notification when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<NotifyCreateApikey />);

    const title = screen.getByText(/^Generate your API key$/);
    const button = screen.getByLabelText('Close reminder to create API key');

    await user.click(button);

    expect(title).not.toBeInTheDocument();
  });

  it('should close the notification when dont show again button is clicked', async () => {
    const user = userEvent.setup();
    render(<NotifyCreateApikey />);

    const title = screen.getByText(/^Generate your API key$/);
    const button = screen.getByRole('button', {
      name: "I understand, don't show again",
    });

    await user.click(button);

    expect(title).not.toBeInTheDocument();
  });
});
