'use client';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import { minLength, object, string, Input as vInput } from 'valibot';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { verifyUser } from '@/app/(auth)/verify/actions';

const VerifyFormSchema = object({
  token: string([minLength(1, 'Token is required')]),
});

const VerifyForm = () => {
  const verifyForm = useForm<vInput<typeof VerifyFormSchema>>({
    resolver: valibotResolver(VerifyFormSchema),
    mode: 'onChange',
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

  const [verifyFormState, verifyFormAction] = useFormState(
    verifyUser,
    {} as FetchReturn<EmptyResponse>
  );
  useEffect(() => {
    if (!verifyFormState.data) return;

    if (!verifyFormState.ok) {
      verifyForm.clearErrors();
      verifyForm.setError('token', {
        message: verifyFormState.data.message,
      });
      return;
    }

    router.replace('/dashboard');
  }, [verifyForm, verifyFormState, router]);

  return (
    <Form {...verifyForm}>
      <form
        action={(formData) => {
          formData.append('email', searchParams.get('email') as string);
          verifyFormAction(formData);
        }}
      >
        <TextInputField
          control={verifyForm.control}
          label='Token'
          name='token'
        >
          <Input placeholder='Please enter your token' />
        </TextInputField>

        <Button
          disabled={verifyFormState.ok || !verifyForm.formState.isValid}
          type='submit'
          className='w-full'
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default VerifyForm;
