const nexticketFetch = async (
  url: string,
  {
    useToken = true,
    method = 'GET',
    body = {},
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
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }
  return data;
};

export default nexticketFetch;
