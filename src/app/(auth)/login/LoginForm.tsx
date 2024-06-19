'use client';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LoginFormSchema } from '@/lib/schemas/loginForm';
import TextInputField from '@/components/shared/TextInputField';
import { loginUser } from '@/app/(auth)/login/actions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Input as vInput } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

const LoginForm = () => {
  const loginForm = useForm<vInput<typeof LoginFormSchema>>({
    resolver: valibotResolver(LoginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const [loginFormState, loginFormAction] = useFormState(
    loginUser,
    {} as FetchReturn<EmptyResponse>
  );
  useEffect(() => {
    if (!loginFormState.data) return;

    if (!loginFormState.ok) {
      loginForm.clearErrors();
      if (!loginFormState.data?.fields) {
        loginForm.setError('email', { message: loginFormState.data.message });
        loginForm.setError('password', {
          message: loginFormState.data.message,
        });
        return;
      }
      (loginFormState.data.fields as string[]).forEach((field) =>
        loginForm.setError(field as keyof vInput<typeof LoginFormSchema>, {
          message: loginFormState.data.message,
        })
      );
      return;
    }

    router.push('/dashboard');
  }, [loginForm, loginFormState, router]);

  return (
    <Form {...loginForm}>
      <form action={loginFormAction}>
        <TextInputField
          control={loginForm.control}
          label='Email'
          name='email'
        >
          <Input placeholder='Enter your email' />
        </TextInputField>
        <TextInputField
          control={loginForm.control}
          label='Password'
          name='password'
        >
          <Input
            type='password'
            placeholder='Enter your password'
          />
        </TextInputField>

        <Button
          type='submit'
          disabled={!loginForm.formState.isValid || loginFormState.ok}
          className='w-full mb-2'
        >
          Login
        </Button>

        <p className='text-center'>
          Don&apos;t have an account?{' '}
          <Link
            href='/register'
            className='text-link hover:text-link/90 transition-colors'
          >
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
