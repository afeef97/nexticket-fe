'use client';

import { email, minLength, object, string, Input as vInput } from 'valibot';
import { useEffect, useState, useTransition } from 'react';
import AccessExpired from '../shared/AccessExpired';
import { Button } from '@/components/ui/button';
import { FetchReturn } from '@/lib/customFetch';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { getToken } from '@/app/(auth)/actions';
import { loginUser } from '@/app/(auth)/login/actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { valibotResolver } from '@hookform/resolvers/valibot';

const loginFormSchema = object({
  email: string([email()]),
  password: string([minLength(8, 'Password must be at least 8 characters')]),
});

const LoginForm = () => {
  const loginForm = useForm<vInput<typeof loginFormSchema>>({
    resolver: valibotResolver(loginFormSchema),
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
    console.log(token);
    if (token.ok) {
      router.push('/dashboard');
    } else if (/.*expired.*/.test(token.data.message)) {
      setIsTokenExpired(true);
    }
  };
  useEffect(() => {
    getTokenOnLoad();
  });

  const onSubmit = (data: vInput<typeof loginFormSchema>) => {
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

          <Button type='submit' disabled={isPendingLogin}>
            Login
          </Button>
        </form>
      </Form>
    </AccessExpired>
  );
};

export default LoginForm;
