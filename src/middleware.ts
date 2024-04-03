import { type NextRequest } from 'next/server';
import refreshIfExpires from './lib/middlewares/refreshIfExpires';
import refreshIfNoToken from './lib/middlewares/refreshIfNoToken';

export async function middleware(request: NextRequest) {
  const hasAccessToken = request.cookies.has('access_token');
  const hasRefeshToken = request.cookies.has('refresh_token');
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/parliament');

  if (!hasAccessToken && isProtectedRoute) {
    return await refreshIfNoToken(request);
  }

  if (hasAccessToken && hasRefeshToken && isProtectedRoute) {
    return refreshIfExpires(request);
  }
}
