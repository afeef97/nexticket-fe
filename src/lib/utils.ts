import { type ClassValue, clsx } from 'clsx';
import { FetchReturn } from './customFetch';
import { MatcherFunction } from '@testing-library/react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//eslint-disable-next-line
type Query = (f: MatcherFunction) => Partial<HTMLElement>;
export const withMarkup =
  (query: Query) =>
  (text: string): Partial<HTMLElement> =>
    query((content: string, node: Partial<HTMLElement> | null) => {
      if (!node) return false;
      const hasText = (node: Partial<HTMLElement>) => node.textContent === text;
      const childrenDontHaveText = Array.from(
        node.children as HTMLCollection
      ).every((child) => !hasText(child as Partial<HTMLElement>));
      return hasText(node) && childrenDontHaveText;
    });


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
