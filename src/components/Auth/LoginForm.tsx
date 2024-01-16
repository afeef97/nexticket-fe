'use client';

import { email, minLength, object, string, Input as vInput } from 'valibot';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { loginUser } from '@/app/(auth)/login/actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
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
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <TextInputField control={loginForm.control} label='Email' name='email'>
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
  );
};

export default LoginForm;
