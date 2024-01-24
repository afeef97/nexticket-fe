import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { withMarkup } from '@/lib/utils';

describe('Footer component', () => {
  it('should render with title and subtitle', () => {
    render(<Footer />);

    const getByTextWithMarkup = withMarkup(screen.getByText);
    const title = getByTextWithMarkup('nexticket');
    const subtitle = screen.getByText('by INVOKE');

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('should render with support links', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(2);
  });
});
