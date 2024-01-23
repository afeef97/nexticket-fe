import { type ClassValue, clsx } from 'clsx';
import { FetchReturn } from './customFetch';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tokenHandler(options: RequestInit): FetchReturn | undefined {
  const { cookies } = require('next/headers');
  const cookieStore = cookies();

  const accessExpires: string = cookieStore.get('access_token_expires')?.value;
  if (
    accessExpires &&
    new Date(Date.now()).valueOf() > new Date(accessExpires).valueOf()
  ) {
    return {
      ok: false,
      data: {
        message: 'Your access token has expired, please refresh your token',
        statusCode: 401,
      },
    };
  }

  const token = cookieStore.get('access_token')?.value;
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
}
