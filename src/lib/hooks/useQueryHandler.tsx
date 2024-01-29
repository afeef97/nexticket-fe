import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AccessExpired } from '@/components/shared/AccessExpired';
import { FetchReturn } from '../customFetch';
import { QueryState } from '../types';

const useQueryHandler = ({
  query,
  queryOnMount = true,
}: {
  //eslint-disable-next-line
  query: (...args: any[]) => Promise<FetchReturn>;
  queryOnMount?: boolean;
}) => {
  const accessExpiredCtx = useContext(AccessExpired);
  const [state, setState] = useState<QueryState>('idle');
  const [data, setData] = useState<FetchReturn>({} as FetchReturn);
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

  return { data, state, triggerQuery };
};

export default useQueryHandler;
