'use server';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';

export const generateApiKey = (): Promise<FetchReturn<EmptyResponse>> => {
  return fetchNexticket('/organization/generate-key', {
    method: 'PUT',
    options: {
      cache: 'no-store',
    },
  });
};
