'use client';

import { Loader2 } from 'lucide-react';
import { getUserAccount } from '../actions';
import { useEffect } from 'react';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
import { useRouter } from 'next/navigation';

const CheckUser = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data: userData, state: fetchUserDataState } = useQueryHandler({
    query: getUserAccount,
  });

  useEffect(() => {
    if (!userData || !userData.ok) return;
    if (!userData.data.data.organization_id) {
      router.replace('/dashboard/register-organization');
    }
  }, [router, userData]);

  return (
    <div>
      {fetchUserDataState === 'pending' || fetchUserDataState === 'idle' ? (
        <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-[calc(100vh-4rem)]'>
          <Loader2 className='tw-animate-spin' size={32} />
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default CheckUser;
