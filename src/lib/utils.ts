import { type ClassValue, clsx } from 'clsx';
import { MatcherFunction } from '@testing-library/react';
import { NextResponse } from 'next/server';
import { ReadonlyURLSearchParams } from 'next/navigation';
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

export function queriesBuilder(
  queries: Record<string | number, string | number>,
  searchParams?: ReadonlyURLSearchParams
): string {
  let queriesRecord: Record<string | number, string | number> = {};
  searchParams?.forEach((value, key) => {
    queriesRecord[key] = value;
  });

  const queryArray = Object.entries({ ...queriesRecord, ...queries });
  const query = queryArray
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return query ? `?${query}` : '';
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

export function handleSetTokenCookies(
  response: NextResponse,
  setCookies: string[]
): void {
  const tokenRegex = /, (?=\w+=)/;
  setCookies[0].split(tokenRegex).forEach((cookie: string) => {
    const cookieValue = cookie.split(';');

    const [tokenLabel, token] = cookieValue[0].split('=');
    const [, path] = cookieValue[1].split('=');
    const [, expires] = cookieValue[2].split('=');

    response.headers.append(
      'Set-Cookie',
      `${tokenLabel}=${token}; Path=${path}; Expires=${expires}; HttpOnly`
    );

    response.headers.append(
      'Set-Cookie',
      `${tokenLabel}_expires=${expires}; Path=${path}; Expires=${expires}; HttpOnly`
    );
  });
}
