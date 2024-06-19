'use server';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const loginUser = async (
  previousState: any,
  formData: FormData
): Promise<FetchReturn<EmptyResponse>> => {
  return await fetchNexticket('/auth/login', {
    useToken: false,
    method: 'POST',
    body: { email: formData.get('email'), password: formData.get('password') },
    options: {
      cache: 'no-store',
    },
  });
};
