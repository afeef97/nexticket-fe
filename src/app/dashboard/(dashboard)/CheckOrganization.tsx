'use client';

import { useEffect, useState } from 'react';
import { FetchReturn } from '@/lib/customFetch';
import { Loader2 } from 'lucide-react';
import { getUserAccount } from '../actions';
import { useRouter } from 'next/navigation';

const CheckOrganization = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [fetchUserDataState, setFetchUserDataState] = useState<string>('idle');
  const [userData, setUserData] = useState<FetchReturn>();
  const getUserAccountOnMount = async () => {
    setFetchUserDataState('pending');
    const response = await getUserAccount();
    setUserData(response);
  };
  useEffect(() => {
    getUserAccountOnMount();
  }, []);

  useEffect(() => {
    if (!userData || !userData.ok) return;
    if (!userData.data.data.organization_id) {
      setFetchUserDataState('resolved');
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

export default CheckOrganization;
