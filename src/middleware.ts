import { type NextRequest, NextResponse } from 'next/server';
import { FRONTEND_URL } from './lib/constants';
import refreshIfExpires from './lib/middlewares/refreshIfExpires';
import refreshIfNoToken from './lib/middlewares/refreshIfNoToken';

export async function middleware(request: NextRequest) {
  const hasAccessToken = request.cookies.has('access_token');
  const hasRefeshToken = request.cookies.has('refresh_token');
  const isLogin = request.nextUrl.pathname.startsWith('/login');
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/parliament');

  if (!hasAccessToken && hasRefeshToken && (isProtectedRoute || isLogin)) {
    return await refreshIfNoToken(request, isLogin);
  }

  if (hasAccessToken && hasRefeshToken && isProtectedRoute) {
    return await refreshIfExpires(request);
  }

  if (hasAccessToken && isLogin) {
    return NextResponse.redirect(FRONTEND_URL + '/dashboard');
  } else if (!hasAccessToken && !hasRefeshToken && isProtectedRoute) {
    return NextResponse.redirect(FRONTEND_URL + '/login');
  }

  return NextResponse.next();
}
