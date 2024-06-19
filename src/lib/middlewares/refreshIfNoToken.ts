import { BACKEND_URL, FRONTEND_URL } from '../constants';
import { type NextRequest, NextResponse } from 'next/server';
import { handleSetTokenCookies } from '../utils';

export default async function refreshIfNoToken(
  request: NextRequest,
  isLogin: boolean
) {
  const response = isLogin
    ? NextResponse.redirect(FRONTEND_URL + '/dashboard')
    : NextResponse.next();
  const refreshResponse = await fetch(BACKEND_URL + '/auth/refresh', {
    headers: {
      Authorization: `Bearer ${request.cookies.get('refresh_token')?.value}`,
      'Content-Type': 'application/json',
    },
  });
  if (!refreshResponse.ok) {
    const redirectResponse = NextResponse.redirect(FRONTEND_URL + '/login');
    redirectResponse.cookies.delete('access_token');
    redirectResponse.cookies.delete('refresh_token');
    return redirectResponse;
  }

  const setCookies = refreshResponse.headers.getSetCookie();
  handleSetTokenCookies(response, setCookies);

  return response;
}
