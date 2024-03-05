'use client';

import { useContext, useEffect } from 'react';
import { AccessContext } from '@/components/providers/AccessContextProvider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import TextInputField from '@/components/shared/TextInputField';
import { registerOrganization } from '@/app/dashboard/register-organization/actions';
import { registerParliamentSchema } from '@/lib/schemas/registerParliamentSchema';
import { useForm } from 'react-hook-form';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
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
      emailDomain: '@parlimensatu.com',
    },
  });

  const router = useRouter();
  const { userData } = useContext(AccessContext);
  useEffect(() => {
    if (userData?.organization_id) {
      router.push('/dashboard');
    }
  }, [userData, router]);

  const {
    state: registerParliamentState,
    triggerQuery: triggerRegisterOrganization,
  } = useQueryHandler({
    query: registerOrganization,
    queryOnMount: false,
  });
  const onSubmit = async (data: vInput<typeof registerParliamentSchema>) => {
    const response = await triggerRegisterOrganization(
      data.name,
      data.emailDomain
    );
    if (!response.ok) {
      registerOrganizationForm.setError('name', {
        message: response.data.message,
      });
      return;
    }
  };
  return (
    <Form {...registerOrganizationForm}>
      <form
        className='mt-4'
        onSubmit={registerOrganizationForm.handleSubmit(onSubmit)}
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
          disabled={
            registerParliamentState === 'pending' ||
            registerParliamentState === 'resolved' ||
            userData?.organization_id === undefined
          }
        >
          {registerParliamentState === 'pending' ? (
            <>
              <Loader2 className='animate-spin' size={16} />
              <span className='ml-2'>Registering...</span>
            </>
          ) : (
            'Register parliament'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterParliamentForm;
