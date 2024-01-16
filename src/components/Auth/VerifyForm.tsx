'use client';

import { minLength, object, string, Input as vInput } from 'valibot';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { verifyUser } from '@/app/(auth)/verify/actions';

const VerifyFormSchema = object({
  token: string([minLength(1, 'Token is required')]),
});

const VerifyForm = () => {
  const verifyForm = useForm<vInput<typeof VerifyFormSchema>>({
    resolver: valibotResolver(VerifyFormSchema),
    defaultValues: {
      token: '',
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPendingVerify, startTransitionVerify] = useTransition();

  const onSubmit = async (data: vInput<typeof VerifyFormSchema>) => {
    startTransitionVerify(async () => {
      const email = searchParams.get('email');
      const response = await verifyUser(email, data.token);
      if (!response.ok) {
        verifyForm.setError('token', { message: response.data.message });
        return;
      }

      setTimeout(() => router.push('/dashboard'));
    });
  };

  return (
    <Form {...verifyForm}>
      <form onSubmit={verifyForm.handleSubmit(onSubmit)}>
        <TextInputField control={verifyForm.control} label='Token' name='token'>
          <Input placeholder='Please enter your token' />
        </TextInputField>

        <Button disabled={isPendingVerify} type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default VerifyForm;
