import { render, screen } from '@testing-library/react';
import AccessContextProvider from '@/components/shared/AccessContextProvider';
import { AppRouterContextProviderMock } from '@/components/test/RouterContextProviderMock';
import RegisterOrganizationForm from './RegisterOrganizationForm';

describe('RegisterOrganizationForm component', () => {
  const userAccountResponse = {
    ok: true,
    data: {
      data: {
        organization_id: null,
      },
    },
  };

  it('should render with correct fields', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AccessContextProvider userAccountRes={userAccountResponse}>
          <RegisterOrganizationForm />
        </AccessContextProvider>
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
        <AccessContextProvider userAccountRes={userAccountResponse}>
          <RegisterOrganizationForm />
        </AccessContextProvider>
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
        <AccessContextProvider userAccountRes={userAccountResponse}>
          <RegisterOrganizationForm />
        </AccessContextProvider>
      </AppRouterContextProviderMock>
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
