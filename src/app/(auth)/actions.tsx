'use server';

import fetchNexticket, { FetchReturn } from '@/lib/customFetch';
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
        httpOnly: true,
        sameSite: 'strict',
      });
    });
  }
};

export const getToken = async (): Promise<FetchReturn> => {
  const { cookies } = require('next/headers');
  const cookieStore = cookies();

  const access_token = cookieStore.get('access_token')?.value;
  const refresh_token = cookieStore.get('refresh_token')?.value;

  if (refresh_token) {
    if (access_token) {
      return {
        ok: true,
        data: {
          access_token,
          refresh_token,
        },
      };
    } else {
      return {
        ok: false,
        data: {
          message: 'Token expired, please refresh your token',
          statusCode: 401,
        },
      };
    }
  } else {
    return {
      ok: false,
      data: {
        message: 'Unauthorized, please login again',
        statusCode: 401,
      },
    };
  }
};

export const refreshToken = async (): Promise<FetchReturn> => {
  const { cookies } = require('next/headers');
  const cookieStore = cookies();

  if (!cookieStore.has('refresh_token')) {
    return {
      ok: false,
      data: { message: 'Unauthorized, please login again', statusCode: 401 },
    };
  }

  const response: FetchReturn = await fetchNexticket('/auth/refresh', {
    useToken: false,
    options: {
      headers: {
        Authorization: `Bearer ${cookieStore.get('refresh_token')?.value}`,
      },
    },
  });

  if (response.data.statusCode === 401 || response.data.statusCode === 403) {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    return {
      ok: false,
      data: { message: 'Unauthorized, please login again', statusCode: 401 },
    };
  }
  revalidateTag('user-account');
  return response;
};

export const updateUser = async ({
  email,
  username,
  password,
}: {
  email?: string;
  username?: string;
  password?: string;
}): Promise<FetchReturn> => {
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

export const logoutUser = async (): Promise<FetchReturn> => {
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