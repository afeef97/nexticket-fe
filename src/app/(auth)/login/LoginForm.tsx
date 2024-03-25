'use client';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import AccessExpired from '@/components/providers/AccessExpiredProvider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LoginFormSchema } from '@/lib/schemas/loginForm';
import TextInputField from '@/components/shared/TextInputField';
import { TokenCookie } from '@/app/(auth)/actions';
import { loginUser } from '@/app/(auth)/login/actions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Input as vInput } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

const LoginForm = ({
  tokenCookies,
}: {
  tokenCookies: FetchReturn<TokenCookie>;
}) => {
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
    if (tokenCookies.ok) router.push('/dashboard');

    if (!loginFormState.data) return;

    if (!loginFormState.ok) {
      loginForm.clearErrors();
      (loginFormState.data.fields as string[]).forEach((field) =>
        loginForm.setError(field as keyof vInput<typeof LoginFormSchema>, {
          message: loginFormState.data.message,
        })
      );
      return;
    }

    router.push('/dashboard');
  }, [loginForm, loginFormState, router, tokenCookies]);

  return (
    <AccessExpired
      open={!tokenCookies.ok && /.*expired.*/.test(tokenCookies.data.message)}
    >
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
    </AccessExpired>
  );
};

export default LoginForm;
