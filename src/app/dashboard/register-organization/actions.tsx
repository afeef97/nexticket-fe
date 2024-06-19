'use server';

import { EmptyResponse, FetchReturn, TypedFormData } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';
import { revalidateTag } from 'next/cache';

export const registerOrganization = async (
  previousState: FetchReturn<EmptyResponse>,
  formData: TypedFormData<{ name: string; email_domain: string }>
): Promise<FetchReturn<EmptyResponse>> => {
  const response = await fetchNexticket('/organization', {
    method: 'POST',
    body: {
      name: formData.get('name'),
      email_domain: formData.get('email_domain'),
    },
    options: {
      cache: 'no-store',
    },
  });

  if (response.ok) revalidateTag('user-account');
  return response;
};
