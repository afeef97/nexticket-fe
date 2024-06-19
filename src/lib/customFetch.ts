import { FetchReturn } from './types';
import { handleResponseCookies } from '@/app/(auth)/actions';
import { queriesBuilder } from './utils';

const fetchNexticket = async (
  url: string,
  {
    useToken = true,
    method = 'GET',
    body,
    queries = {},
    options = {},
  }: {
    useToken?: boolean;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
    queries?: Record<string | number, string | number>;
    options?: RequestInit;
  }
): Promise<FetchReturn<any>> => {
  const headers: Headers = options.headers
    ? new Headers(options.headers)
    : new Headers();

  headers.set('Content-Type', 'application/json');
  if (useToken) {
    const { cookies } = require('next/headers');
    const cookiesStore = cookies();
    headers.set(
      'Authorization',
      `Bearer ${cookiesStore.get('access_token')?.value}`
    );
  }

  const queryString = queriesBuilder(queries);
  const response = await fetch(
    `${process.env.NEXTICKET_API}${url}${queryString}`,
    {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }
  );

  const setCookies = response.headers.getSetCookie();
  if (setCookies) {
    handleResponseCookies(setCookies);
  }

  const data = await response.json();

  return response.ok ? { ok: true, data } : { ok: false, data };
};

export default fetchNexticket;
