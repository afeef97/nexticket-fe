'use client';

import { useEffect, useState, useTransition } from 'react';
import AccessExpired from '@/components/providers/AccessExpiredProvider';
import { Button } from '@/components/ui/button';
import { FetchReturn } from '@/lib/customFetch';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LoginFormSchema } from '@/lib/schemas/loginForm';
import TextInputField from '@/components/shared/TextInputField';
import { getToken } from '@/app/(auth)/actions';
import { loginUser } from '@/app/(auth)/login/actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input as vInput } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

const LoginForm = () => {
  const loginForm = useForm<vInput<typeof LoginFormSchema>>({
    resolver: valibotResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const [isPendingLogin, startTransitionLogin] = useTransition();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const getTokenOnLoad = async (): Promise<void> => {
    const token: FetchReturn = await getToken();
    if (token.ok) {
      router.push('/dashboard');
    } else if (/.*expired.*/.test(token.data.message)) {
      setIsTokenExpired(true);
    }
  };
  useEffect(() => {
    getTokenOnLoad();
  });

  const onSubmit = (data: vInput<typeof LoginFormSchema>) => {
    startTransitionLogin(async () => {
      const response = await loginUser(data.email, data.password);

      if (!response.ok) {
        response.data.fields.map((field: 'email' | 'password') =>
          loginForm.setError(field, { message: response.data.message })
        );
        return;
      }

      setTimeout(() => router.push('/dashboard'), 2000);
    });
  };

  return (
    <AccessExpired open={isTokenExpired}>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)}>
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
            <Input type='password' placeholder='Enter your password' />
          </TextInputField>

          <Button
            type='submit'
            disabled={isPendingLogin}
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
