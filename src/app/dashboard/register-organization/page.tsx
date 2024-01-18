'use client';

import { minLength, object, string, Input as vInput } from 'valibot';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

const registerOrganizationSchema = object({
  name: string([minLength(1, 'Organization name is required')]),
});

const RegisterOrganization = () => {
  const registerOrganizationForm = useForm<
    vInput<typeof registerOrganizationSchema>
  >({
    resolver: valibotResolver(registerOrganizationSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <div className='tw-max-w-lg'>
      <h4>Register Organization</h4>
      <p>
        Seems like you don&apos;t belong to any organization currently. Start by
        registering on behalf of your organization or contact your admin to send
        you an invitation.
      </p>
      <Form {...registerOrganizationForm}>
        <form
          className='tw-mt-4'
          onSubmit={registerOrganizationForm.handleSubmit(console.log)}
        >
          <TextInputField
            control={registerOrganizationForm.control}
            name='name'
            label='Organization name'
          >
            <Input />
          </TextInputField>

          <Button className='tw-w-full md:tw-w-auto'>
            Register organization
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterOrganization;
