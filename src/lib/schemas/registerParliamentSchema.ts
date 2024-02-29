import { minLength, object, string } from 'valibot';

export const registerParliamentSchema = object({
  name: string([minLength(1, 'Parliament name is required')]),
  emailDomain: string([minLength(1, 'Email domain is required')]),
});
