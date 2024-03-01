'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { RegisterFormSchema } from '@/lib/schemas/registerForm';
import TextInputField from '@/components/shared/TextInputField';
import { registerUser } from '@/app/(auth)/register/actions';
import { useForm } from 'react-hook-form';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
import { useRouter } from 'next/navigation';
import { Input as vInput } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

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

  const { state: registerUserState, triggerQuery: triggerRegisterUser } =
    useQueryHandler({
      query: registerUser,
      queryOnMount: false,
    });
  const onSubmit = async (data: vInput<typeof RegisterFormSchema>) => {
    const response = await triggerRegisterUser(
      data.username,
      data.email,
      data.password
    );

    if (!response.ok) {
      (response.data.fields as string[]).map((fields: string) =>
        registerForm.setError(
          fields as keyof vInput<typeof RegisterFormSchema>,
          { message: response.data.message }
        )
      );
      return;
    }

    router.push('/verify' + '?email=' + data.email);
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

        <Button
          disabled={registerUserState === 'pending'}
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
