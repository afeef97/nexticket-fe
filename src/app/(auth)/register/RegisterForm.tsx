'use client';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import { UseFormReturn, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { RegisterFormSchema } from '@/lib/schemas/registerForm';
import TextInputField from '@/components/shared/TextInputField';
import { registerUser } from '@/app/(auth)/register/actions';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Input as vInput } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

const RegisterForm = () => {
  const registerForm: UseFormReturn<vInput<typeof RegisterFormSchema>> =
    useForm<vInput<typeof RegisterFormSchema>>({
      resolver: valibotResolver(RegisterFormSchema),
      mode: 'onChange',
      defaultValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    });
  const router = useRouter();

  const [registerFormState, registerFormAction] = useFormState(
    registerUser,
    {} as FetchReturn<EmptyResponse>
  );
  useEffect(() => {
    if (!registerFormState.data) return;

    if (!registerFormState.ok) {
      registerForm.clearErrors();
      (registerFormState.data.fields as string[]).forEach((field) =>
        registerForm.setError(
          field as keyof vInput<typeof RegisterFormSchema>,
          { message: registerFormState.data.message }
        )
      );
      return;
    }

    router.push('/verify' + '?email=' + registerForm.getValues('email'));
  }, [registerForm, registerFormState, router]);

  return (
    <Form {...registerForm}>
      <form action={registerFormAction}>
        <TextInputField
          control={registerForm.control}
          label='Username'
          name='username'
        >
          <Input placeholder='Enter your username' />
        </TextInputField>
        <TextInputField
          control={registerForm.control}
          label='Email'
          name='email'
        >
          <Input
            placeholder='Enter your email'
            autoComplete='email'
          />
        </TextInputField>
        <TextInputField
          control={registerForm.control}
          label='Password'
          name='password'
        >
          <Input
            type='password'
            placeholder='Enter your password'
            autoComplete='password'
          />
        </TextInputField>
        <TextInputField
          control={registerForm.control}
          label='Confirm password'
          name='confirmPassword'
        >
          <Input
            type='password'
            placeholder='Enter your password again'
          />
        </TextInputField>

        <Button
          disabled={!registerForm.formState.isValid || registerFormState.ok}
          type='submit'
          className='w-full mb-2'
        >
          Register
        </Button>

        <p className='text-center'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-link hover:text-link/90 transition-colors'
          >
            Log in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterForm;
