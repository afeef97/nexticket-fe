import { FetchReturn, QueryState } from '../types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AccessExpired } from '@/components/providers/AccessExpiredProvider';

const useQueryHandler = <T extends unknown>({
  query,
  queryOnMount = true,
  deps = [],
}: {
  //eslint-disable-next-line
  query: (...args: any[]) => Promise<FetchReturn<T>>;
  queryOnMount?: boolean;
  deps?: any[];
}) => {
  const accessExpiredCtx = useContext(AccessExpired);
  const [state, setState] = useState<QueryState>('idle');
  const [data, setData] = useState<FetchReturn<T>>({} as FetchReturn<T>);
  const mounted = useRef(false);

  const triggerQuery = useCallback(
    async (...args: any[]) => {
      setState('pending');
      const response = await query(...args);
      if (!response.ok && response.data.statusCode === 401) {
        accessExpiredCtx.setOpenAccessExpired(true);
      } else if (!response.ok) {
        setState('error');
      } else {
        setState('resolved');
      }
      setData(response);
      return response;
    },
    [query, accessExpiredCtx]
  );

  useEffect(() => {
    if (!queryOnMount) return;

    if (!mounted.current) {
      mounted.current = true;
      triggerQuery();
    }
  }, [triggerQuery, queryOnMount]);

  useEffect(() => {
    if (deps.length === 0 || !mounted.current) return;
    triggerQuery();

    //eslint-disable-next-line
  }, [...deps]);

  return { data, state, triggerQuery };
};

export default useQueryHandler;
