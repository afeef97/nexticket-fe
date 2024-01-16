import { handleResponseCookies } from '@/app/(auth)/actions';

const fetchNexticket = async (
  url: string,
  {
    useToken = true,
    method = 'GET',
    body,
    options = {},
  }: {
    useToken?: boolean;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
    options?: RequestInit;
  }
) => {
  if (useToken) {
    const { cookies } = require('next/headers');
    const cookieStore = cookies();

    if (cookieStore.has('access_token_expires')) {
      const accessExpires = cookieStore.get('access_token_expires')?.value;
      if (new Date(Date.now()).valueOf() > new Date(accessExpires).valueOf()) {
        throw {
          message: 'Your access token has expired, please login again',
          statusCode: 401,
        };
      }
    }

    if (cookieStore.has('access_token')) {
      const token = cookieStore.get('access_token')?.value;
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(method, url, method === 'GET' ? '' : body, options);
  }
  const response = await fetch(`${process.env.NEXTICKET_API}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options,
  });

  const setCookie = response.headers.getSetCookie();
  if (setCookie) {
    handleResponseCookies(setCookie);
  }

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }
  return data;
};

export default fetchNexticket;
