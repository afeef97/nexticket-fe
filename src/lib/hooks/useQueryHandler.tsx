import { FetchReturn, QueryState } from '../types';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [state, setState] = useState<QueryState>('idle');
  const [data, setData] = useState<FetchReturn<T>>({} as FetchReturn<T>);
  const mounted = useRef(false);

  const triggerQuery = useCallback(
    async (...args: any[]) => {
      setState('pending');
      const response = await query(...args);
      if (!response.ok) {
        setState('error');
      } else {
        setState('resolved');
      }
      setData(response);
      return response;
    },
    [query]
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
