'use client';

import { minLength, object, regex, string, Input as vInput } from 'valibot';
import { useContext, useEffect } from 'react';
import { AccessContext } from '@/components/providers/AccessContextProvider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import TextInputField from '@/components/shared/TextInputField';
import { registerOrganization } from './actions';
import { useForm } from 'react-hook-form';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
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
    if (userData.ok && userData.data.data.organization_id) {
      router.push('/dashboard');
    }
  }, [userData, router]);

  const {
    state: registerOrganizationState,
    triggerQuery: triggerRegisterOrganization,
  } = useQueryHandler({
    query: registerOrganization,
    queryOnMount: false,
  });
  const onSubmit = async (data: vInput<typeof registerOrganizationSchema>) => {
    const response = await triggerRegisterOrganization(
      data.name,
      data.email_domain
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
        className='tw-mt-4'
        onSubmit={registerOrganizationForm.handleSubmit(onSubmit)}
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
          className='tw-w-full md:tw-w-auto'
          disabled={
            registerOrganizationState === 'pending' ||
            registerOrganizationState === 'resolved'
          }
        >
          {registerOrganizationState === 'pending' ? (
            <>
              <Loader2 className='tw-animate-spin' size={16} />
              <span className='tw-ml-2'>Registering...</span>
            </>
          ) : (
            'Register organization'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterOrganizationForm;
