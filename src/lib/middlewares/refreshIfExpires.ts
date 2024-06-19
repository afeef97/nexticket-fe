import { BACKEND_URL, FRONTEND_URL } from '../constants';
import { type NextRequest, NextResponse } from 'next/server';
import { handleSetTokenCookies } from '../utils';

export default async function refreshIfExpires(request: NextRequest) {
  const response = NextResponse.next();

  const accessTokenExpires = request.cookies.get('access_token_expires');

  if (accessTokenExpires) {
    if (new Date(Date.now()) > new Date(accessTokenExpires?.value)) {
      const refreshResponse = await fetch(BACKEND_URL + '/auth/refresh', {
        headers: {
          Authorization: `Bearer ${
            request.cookies.get('refresh_token')?.value
          }`,
          'Content-Type': 'application/json',
        },
      });
      if (!refreshResponse.ok) {
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return NextResponse.redirect(FRONTEND_URL + '/login');
      }

      const setCookies = refreshResponse.headers.getSetCookie();
      handleSetTokenCookies(response, setCookies);

      return response;
    }
  }

  return response;
}
