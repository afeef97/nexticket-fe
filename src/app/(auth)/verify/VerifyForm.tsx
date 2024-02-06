'use client';

import { minLength, object, string, Input as vInput } from 'valibot';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
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

  useEffect(() => {
    if (!searchParams.has('email')) {
      router.push('/');
    }
  }, [searchParams, router]);

  const { state: verifyUserState, triggerQuery: triggerVerifyUser } =
    useQueryHandler({
      query: verifyUser,
      queryOnMount: false,
    });
  const onSubmit = async (data: vInput<typeof VerifyFormSchema>) => {
    const email = searchParams.get('email');
    const response = await triggerVerifyUser(email, data.token);
    if (!response.ok) {
      verifyForm.setError('token', { message: response.data.message });
      return;
    }

    router.push('/dashboard');
  };

  return (
    <Form {...verifyForm}>
      <form onSubmit={verifyForm.handleSubmit(onSubmit)}>
        <TextInputField control={verifyForm.control} label='Token' name='token'>
          <Input placeholder='Please enter your token' />
        </TextInputField>

        <Button
          disabled={
            verifyUserState === 'pending' || verifyUserState === 'resolved'
          }
          type='submit'
          className='tw-w-full'
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default VerifyForm;
