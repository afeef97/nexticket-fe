import {
  custom,
  email,
  forward,
  maxLength,
  minLength,
  object,
  optional,
  regex,
  string,
} from 'valibot';

export const RegisterMemberSchema = object(
  {
    email: string([email()]),
    username: string([minLength(3, 'Username must be at least 3 characters')]),
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

export const UpdateEmailSchema = object({
  email: string([email()]),
});

export const UpdateUsernameSchema = object({
  username: string([minLength(3, 'Username must be at least 3 characters')]),
});

export const UpdatePasswordSchema = object(
  {
    password: optional(
      string([
        minLength(8, 'Password must be at least 8 characters'),
        maxLength(30, 'Your password is too long.'),
        regex(/[a-z]/, 'Your password must contain a lowercase letter.'),
        regex(/[A-Z]/, 'Your password must contain an uppercase letter.'),
        regex(/[0-9]/, 'Your password must contain a number.'),
      ]),
      ''
    ),
    confirmPassword: optional(
      string([minLength(1, 'Please confirm your password')])
    ),
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
