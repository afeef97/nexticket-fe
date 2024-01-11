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
import { Button } from '../ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '../shared/TextInputField';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

export const RegisterFormSchema = object(
  {
    email: string([email()]),
    password: string([
      minLength(8, 'Password must be at least 8 characters'),
      maxLength(30, 'Your password is too long.'),
      regex(/[a-z]/, 'Your password must contain a lowercase letter.'),
      regex(/[A-Z]/, 'Your password must contain an uppercase letter.'),
      regex(/[0-9]/, 'Your password must contain a number.'),
    ]),
    confirmPassword: string([minLength(1, 'Enter your password again')]),
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
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit((data) => console.log(data))}>
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

        <Button type='submit'>Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
