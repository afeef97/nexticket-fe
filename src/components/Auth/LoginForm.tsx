'use client';

import { email, minLength, object, string, Input as vInput } from 'valibot';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { useForm } from 'react-hook-form';
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

  return (
    <Form {...loginForm}>
      <form>
        <TextInputField control={loginForm.control} label='Email' name='email'>
          <Input placeholder='Enter your email' />
        </TextInputField>
        <TextInputField
          control={loginForm.control}
          label='Password'
          name='password'
        >
          <Input placeholder='Enter your password' />
        </TextInputField>

        <Button>Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
