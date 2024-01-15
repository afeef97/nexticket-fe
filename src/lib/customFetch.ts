const handleResponseCookies = (setCookie: string[]) => {
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

const fetchNexticket = async (
  url: string,
  {
    useToken = true,
    method = 'GET',
    body,
    options = {},
  }: {
    useToken?: boolean;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
    options?: RequestInit;
  }
) => {
  if (useToken) {
    const { cookies } = require('next/headers');
    const cookieStore = cookies();

    if (cookieStore.has('token')) {
      const token = cookieStore.get('token');
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
  }

  const response = await fetch(`${process.env.NEXTICKET_API}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options,
  });

  const setCookie = response.headers.getSetCookie();
  if (setCookie) {
    handleResponseCookies(setCookie);
  }

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }
  return data;
};

export default fetchNexticket;
