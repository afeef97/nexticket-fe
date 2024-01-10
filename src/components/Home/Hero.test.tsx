import { render, screen } from '@testing-library/react';
import { AppRouterContextProviderMock } from '@/components/test/RouterContextProviderMock';
import Hero from './Hero';
import userEvent from '@testing-library/user-event';

describe('Hero section', () => {
  it('should have a button with text "Get started"', () => {
    render(
      <AppRouterContextProviderMock router={{}}>
        <Hero />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Get started');
  });
  it('should have a button to navigate to /register', async () => {
    const user = userEvent.setup();
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <Hero />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(push).toHaveBeenCalled();
  });
});
