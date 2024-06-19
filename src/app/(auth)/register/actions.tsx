'use server';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const registerUser = async (
  previousState: any,
  formData: FormData
): Promise<FetchReturn<EmptyResponse>> => {
  return await fetchNexticket('/auth/register', {
    useToken: false,
    method: 'POST',
    body: {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    },
  });
};
