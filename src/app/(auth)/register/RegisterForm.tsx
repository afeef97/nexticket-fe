'use client';

import {
  custom,
  email,
  forward,
  maxLength,
  minLength,
  object,
  regex,
  string,
  Input as vInput,
} from 'valibot';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { registerUser } from '@/app/(auth)/register/actions';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { valibotResolver } from '@hookform/resolvers/valibot';

export const RegisterFormSchema = object(
  {
    username: string([minLength(3, 'Username must be at least 3 characters')]),
    email: string([email()]),
    password: string([
      minLength(8, 'Password must be at least 8 characters'),
      maxLength(30, 'Your password is too long.'),
      regex(/[a-z]/, 'Your password must contain a lowercase letter.'),
      regex(/[A-Z]/, 'Your password must contain an uppercase letter.'),
      regex(/[0-9]/, 'Your password must contain a number.'),
    ]),
    confirmPassword: string([minLength(1, 'Please confirm your password')]),
  },
  [
    forward(
      custom(
        (input) => input.password === input.confirmPassword,
        'The passwords do not match'
      ),
      ['confirmPassword']
    ),
  ]
);

const RegisterForm = () => {
  const registerForm = useForm<vInput<typeof RegisterFormSchema>>({
    resolver: valibotResolver(RegisterFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();
  const [isPendingRegister, startTransitionRegister] = useTransition();

  const onSubmit = async (data: vInput<typeof RegisterFormSchema>) => {
    startTransitionRegister(async () => {
      const response = await registerUser(
        data.username,
        data.email,
        data.password
      );

      if (!response.ok) {
        response.data.fields.map((fields: 'username' | 'email' | 'password') =>
          registerForm.setError(fields, { message: response.data.message })
        );
        return;
      }

      router.push('/verify' + '?email=' + data.email);
    });
  };

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onSubmit)}>
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
          <Input placeholder='Enter your email' autoComplete='email' />
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
          <Input type='password' placeholder='Enter your password again' />
        </TextInputField>

        <Button disabled={isPendingRegister} type='submit'>
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
