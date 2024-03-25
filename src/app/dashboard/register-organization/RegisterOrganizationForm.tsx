'use client';

import { EmptyResponse, FetchReturn, TypedFormData } from '@/lib/types';
import { minLength, object, regex, string, Input as vInput } from 'valibot';
import { useContext, useEffect } from 'react';
import { AccessContext } from '@/components/providers/AccessContextProvider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { registerOrganization } from './actions';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { valibotResolver } from '@hookform/resolvers/valibot';

const registerOrganizationSchema = object({
  name: string([minLength(1, 'Organization name is required')]),
  email_domain: string([
    minLength(1, 'Email domain is required'),
    regex(/^@.*\..*$/, 'Invalid email domain (example: @mail.com)'),
  ]),
});

const RegisterOrganizationForm = () => {
  const registerOrganizationForm = useForm<
    vInput<typeof registerOrganizationSchema>
  >({
    resolver: valibotResolver(registerOrganizationSchema),
    defaultValues: {
      name: '',
      email_domain: '',
    },
  });

  const router = useRouter();
  const { userData } = useContext(AccessContext);
  useEffect(() => {
    if (userData?.organization_id) {
      router.push('/dashboard');
    }
  }, [userData, router]);

  const [registerOrganizationState, registerOrganizationAction] = useFormState(
    registerOrganization,
    {} as FetchReturn<EmptyResponse>
  );
  useEffect(() => {
    if (!registerOrganizationState?.data) return;

    if (!registerOrganizationState.ok) {
      registerOrganizationForm.setError('name', {
        message: registerOrganizationState.data.message,
      });
    }
  }, [registerOrganizationForm, registerOrganizationState]);

  return (
    <Form {...registerOrganizationForm}>
      <form
        action={(data) =>
          registerOrganizationAction(
            data as TypedFormData<{ name: string; email_domain: string }>
          )
        }
        className='mt-4'
      >
        <TextInputField
          control={registerOrganizationForm.control}
          name='name'
          label='Organization name'
        >
          <Input placeholder='Enter your organization name' />
        </TextInputField>

        <TextInputField
          control={registerOrganizationForm.control}
          name='email_domain'
          label='Email domain'
        >
          <Input placeholder='Select an email domain for your organization' />
        </TextInputField>

        <Button
          type='submit'
          className='w-full md:w-auto'
          disabled={registerOrganizationState.ok}
        >
          Register organization
        </Button>
      </form>
    </Form>
  );
};

export default RegisterOrganizationForm;
