import { EmptyResponse, FetchReturn } from './types';
import { queriesBuilder, tokenHandler } from './utils';
import { handleResponseCookies } from '@/app/(auth)/actions';

const fetchNexticket = async (
  url: string,
  {
    useToken = true,
    method = 'GET',
    body,
    queries = {},
    options = {},
  }: {
    useToken?: boolean;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
    queries?: Record<string | number, string | number>;
    options?: RequestInit;
  }
): Promise<FetchReturn<any>> => {
  if (useToken) {
    const tokenState: FetchReturn<EmptyResponse> | undefined =
      tokenHandler(options);

    if (tokenState && !tokenState.ok) {
      return tokenState;
    }
  }

  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };
  if (process.env.NODE_ENV === 'development') {
    process.env.DEBUG === 'verbose'
      ? console.trace(
          '\n********************************** START\n',
          new Date(Date.now()).toLocaleTimeString(),
          method,
          url,
          method === 'GET' ? '' : body,
          options
        )
      : process.env.DEBUG === 'log'
      ? console.log(
          '\n********************************** START\n',
          new Date(Date.now()).toLocaleTimeString(),
          method,
          url,
          method === 'GET' ? '' : body
        )
      : null;
  }

  if (Object.keys(queries).length > 0) {
    url = `${url}${queriesBuilder(queries)}`;
  }
  const response = await fetch(`${process.env.NEXTICKET_API}${url}`, {
    method,
    headers: options.headers,
    body: JSON.stringify(body),
    ...options,
  });

  const setCookie = response.headers.getSetCookie();
  if (setCookie) {
    handleResponseCookies(setCookie);
  }

  const data = await response.json();
  if (process.env.NODE_ENV === 'development') {
    console.log(
      new Date(Date.now()).toLocaleTimeString(),
      method,
      url,
      data,
      '\n********************************** END\n'
    );
  }

  return response.ok ? { ok: true, data } : { ok: false, data };
};

export default fetchNexticket;
