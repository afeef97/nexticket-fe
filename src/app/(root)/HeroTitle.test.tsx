import { render, screen } from '@testing-library/react';
import HeroTitle from './HeroTitle';

describe('HeroTitle', () => {
  it('renders title and subtitle', () => {
    render(<HeroTitle title='title' subtitle='subtitle' />);

    const title = screen.getByText('title');
    const subtitle = screen.getByText('subtitle');

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });
});
