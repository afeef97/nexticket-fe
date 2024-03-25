import { type ClassValue, clsx } from 'clsx';
import { EmptyResponse, FetchReturn } from './types';
import { MatcherFunction } from '@testing-library/react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function subtractMonths(date: Date, months: number): Date {
  return new Date(date.setMonth(date.getMonth() - months));
}

export function subtractWeeks(date: Date, weeks: number): Date {
  return new Date(date.setDate(date.getDate() - weeks * 7));
}

export function queriesBuilder(queries: Record<string, string>) {
  return Object.keys(queries)
    .map((key, index) =>
      index === 0 ? `?${key}=${queries[key]}` : `${key}=${queries[key]}`
    )
    .join('&');
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

export function tokenHandler(
  options: RequestInit
): FetchReturn<EmptyResponse> | undefined {
  try {
    const { cookies } = require('next/headers');
    const cookieStore = cookies();

    const accessExpires: string = cookieStore.get(
      'access_token_expires'
    )?.value;
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
  } catch (error) {
    return {
      ok: false,
      data: {
        message: error as string,
        statusCode: 400,
      },
    };
  }
}
