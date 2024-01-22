import { useCallback, useContext, useEffect, useState } from 'react';
import { AccessContext } from '@/components/shared/AccessExpired';
import { FetchReturn } from '../customFetch';
import { IQueryState } from '../types';

const useQueryHandler = ({
  query,
  queryOnMount = true,
}: {
  //eslint-disable-next-line
  query: (...args: any[]) => Promise<FetchReturn>;
  queryOnMount?: boolean;
}) => {
  const accessCtx = useContext(AccessContext);
  const [state, setState] = useState<IQueryState>('idle');
  const [data, setData] = useState<FetchReturn>({} as FetchReturn);

  const triggerQuery = useCallback(
    async (...args: any[]) => {
      setState('pending');
      const response = await query(...args);
      if (!response.ok && response.data.statusCode === 401) {
        accessCtx.setOpenAccessExpired(true);
      } else if (!response.ok) {
        setState('error');
      } else {
        setState('resolved');
      }
      setData(response);
      return response;
    },
    [query, accessCtx]
  );

  useEffect(() => {
    if (!queryOnMount) return;
    triggerQuery();
  }, [triggerQuery, queryOnMount]);

  return { data, state, triggerQuery };
};

export default useQueryHandler;
