import { email, minLength, object, string } from 'valibot';

export const LoginFormSchema = object({
  email: string([email()]),
  password: string([minLength(1, 'Password must not be empty')]),
});
