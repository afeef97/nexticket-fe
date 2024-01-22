import { render, screen } from '@testing-library/react';
import { AppRouterContextProviderMock } from '@/components/test/RouterContextProviderMock';
import { FetchReturn } from '@/lib/customFetch';
import RegisterOrganizationForm from './RegisterOrganizationForm';

describe('RegisterOrganizationForm component', () => {
  const userAccountData = {
    data: {
      data: {
        organization_id: 'test',
      },
    },
  };

  it('should render with correct fields', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <RegisterOrganizationForm
          userAccountData={userAccountData as FetchReturn}
        />
      </AppRouterContextProviderMock>
    );

    const organizationNameInput = screen.getByPlaceholderText(
      'Enter your organization name'
    );
    const emailDomainInput = screen.getByPlaceholderText(
      'Select an email domain for your organization'
    );

    expect(organizationNameInput).toBeInTheDocument();
    expect(emailDomainInput).toBeInTheDocument();
  });

  it('should render with correct labels', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <RegisterOrganizationForm
          userAccountData={userAccountData as FetchReturn}
        />
      </AppRouterContextProviderMock>
    );

    const organizationNameLabel = screen.getByText('Organization name');
    const emailDomainLabel = screen.getByText('Email domain');

    expect(organizationNameLabel).toBeInTheDocument();
    expect(emailDomainLabel).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <RegisterOrganizationForm
          userAccountData={userAccountData as FetchReturn}
        />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
