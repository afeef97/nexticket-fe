'use server';

export const handleResponseCookies = (setCookie: string[]) => {
  if (setCookie.length > 0) {
    const { cookies } = require('next/headers');
    const cookieStore = cookies();

    setCookie.map((cookie: string) => {
      const cookieValue = cookie.split(';');

      const tokenLabel = cookieValue[0].split('=')[0];
      const token = cookieValue[0].split('=')[1];
      const path = cookieValue[1].split('=')[1];
      const expires = cookieValue[2].split('=')[1];

      cookieStore.set(tokenLabel, token, {
        path,
        expires: new Date(expires),
        httpOnly: true,
        sameSite: 'strict',
      });
    });
  }
};
