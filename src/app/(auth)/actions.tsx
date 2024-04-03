'use server';

import { EmptyResponse, FetchReturn } from '@/lib/types';
import fetchNexticket from '@/lib/customFetch';
import { revalidateTag } from 'next/cache';

export const handleResponseCookies = (setCookie: string[]): void => {
  if (setCookie.length > 0) {
    const { cookies } = require('next/headers');
    const cookieStore = cookies();

    setCookie.forEach((cookie: string) => {
      const cookieValue = cookie.split(';');

      const [tokenLabel, token] = cookieValue[0].split('=');
      const [, path] = cookieValue[1].split('=');
      const [, expires] = cookieValue[2].split('=');

      cookieStore.set(tokenLabel, token, {
        path,
        expires: new Date(expires),
        httpOnly: true,
        sameSite: 'strict',
      });

      cookieStore.set(`${tokenLabel}_expires`, expires, {
        path,
        expires: new Date(expires),
        sameSite: 'strict',
      });
    });
  }
};

export const updateUser = async ({
  email,
  username,
  password,
}: {
  email?: string;
  username?: string;
  password?: string;
}): Promise<FetchReturn<EmptyResponse>> => {
  const response = await fetchNexticket('/auth/update', {
    method: 'PUT',
    body: {
      email,
      username,
      password,
    },
    options: { cache: 'no-store' },
  });

  if (response.ok) {
    revalidateTag('user-account');
  }
  return response;
};

export const logoutUser = async (): Promise<FetchReturn<EmptyResponse>> => {
  const { cookies } = require('next/headers');
  const cookieStore = cookies();

  const response = await fetchNexticket('/auth/logout', {
    options: { cache: 'no-store' },
  });
  revalidateTag('user-account');

  if (!response.ok) {
    return response;
  }

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  return response;
};