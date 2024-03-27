'use client';

import { EmptyResponse, FetchReturn, TypedFormData } from '@/lib/types';
import { useContext, useEffect } from 'react';
import { AccessContext } from '@/components/providers/AccessContextProvider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { registerOrganization } from '@/app/dashboard/register-organization/actions';
import { registerParliamentSchema } from '@/lib/schemas/registerParliamentSchema';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Input as vInput } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

const RegisterParliamentForm = () => {
  const registerOrganizationForm = useForm<
    vInput<typeof registerParliamentSchema>
  >({
    resolver: valibotResolver(registerParliamentSchema),
    defaultValues: {
      name: '',
      email_domain: '@parlimensatu.com',
    },
  });

  const router = useRouter();
  const { userData } = useContext(AccessContext);
  useEffect(() => {
    if (userData?.organization_id) {
      router.push('/dashboard');
    }
  }, [userData, router]);

  const [registerParliamentState, registerParliamentAction] = useFormState(
    registerOrganization,
    {} as FetchReturn<EmptyResponse>
  );
  useEffect(() => {
    if (!registerParliamentState.data) return;

    if (!registerParliamentState.ok) {
      registerOrganizationForm.clearErrors();
      registerOrganizationForm.setError('name', {
        message: registerParliamentState.data.message,
      });
      return;
    }

    router.push('/dashboard');
  }, [registerOrganizationForm, registerParliamentState, router]);

  return (
    <Form {...registerOrganizationForm}>
      <form
        action={(data) =>
          registerParliamentAction(
            data as TypedFormData<vInput<typeof registerParliamentSchema>>
          )
        }
        className='mt-4'
      >
        <TextInputField
          control={registerOrganizationForm.control}
          name='name'
          label='Parliament name'
        >
          <Input placeholder='Enter your parliament name' />
        </TextInputField>

        <Button
          type='submit'
          className='w-full md:w-auto'
          disabled={userData?.organization_id === undefined}
        >
          Register Parliament
        </Button>
      </form>
    </Form>
  );
};

export default RegisterParliamentForm;
