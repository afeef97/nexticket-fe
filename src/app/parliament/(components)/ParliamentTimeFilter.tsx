'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { queriesBuilder } from '@/lib/utils';

const ParliamentTimeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isUpdatingSearchParams, startUpdatingSearchParams] = useTransition();
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    startUpdatingSearchParams(() => {
      router.replace(
        `/parliament/dashboard${queriesBuilder({
          period_end: e.target.value || '',
        })}`
      );
    });
  };

  return (
    <div className='flex items-center gap-2'>
      {isUpdatingSearchParams && <Loader2Icon className='animate-spin' />}
      <select
        onChange={onChange}
        className='border text-body1 border-linePrimary w-[240px] h-[48px] px-2 py-0.5 rounded focus:outline-none focus:border-secondary'
        value={searchParams.get('period_end') || ''}
      >
        <option value=''>All time</option>
        <option value={'today'}>Today</option>
        <option value={'past_week'}>Past week</option>
        <option value={'past_month'}>Past month</option>
      </select>
    </div>
  );
};

export default ParliamentTimeFilter;
