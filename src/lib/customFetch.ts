import { IAccessContext } from '@/components/shared/AccessExpired';
import { handleResponseCookies } from '@/app/(auth)/actions';
import { tokenHandler } from './utils';

export interface FetchReturn {
  ok: boolean;
  data: any;
}

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
  },
  context?: IAccessContext
): Promise<FetchReturn> => {
  if (useToken) {
    const tokenState: FetchReturn | undefined = tokenHandler(context, options);

    if (tokenState && !tokenState.ok) {
      return tokenState;
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(method, url, method === 'GET' ? '' : body, options);
  }
  const response = await fetch(`${process.env.NEXTICKET_API}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(body),
    ...options,
  });

  const setCookie = response.headers.getSetCookie();
  if (setCookie) {
    handleResponseCookies(setCookie);
  }

  const data = await response.json();

  return response.ok ? { ok: true, data } : { ok: false, data };
};

export default fetchNexticket;
