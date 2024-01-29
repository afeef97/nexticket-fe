import { render, screen } from '@testing-library/react';
import { AppRouterContextProviderMock } from '@/components/test/RouterContextProviderMock';
import MobileHeader from './MobileHeader';
import { useState as useStateMock } from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
(useStateMock as jest.Mock).mockImplementation((init) => [init, jest.fn()]);

describe('MobileHeader component', () => {
  const [showPanel, setShowPanel] = useStateMock(false);
  const push = jest.fn();
  it('should render', () => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <MobileHeader showPanel={showPanel} setShowPanel={setShowPanel} />
      </AppRouterContextProviderMock>
    );

    const header = screen.getByTestId('mobile-header');

    expect(header).toBeInTheDocument();
  });
});

describe('MobileHeader show panel button', () => {
  const [showPanel, setShowPanel] = useStateMock(false);
  const push = jest.fn();
  it('should render', async () => {
    const user = userEvent.setup();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <MobileHeader showPanel={showPanel} setShowPanel={setShowPanel} />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(setShowPanel).toHaveBeenCalledWith(true);
  });
});
