'use client';

import React, { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { queriesBuilder } from '@/lib/utils';

const ParliamentFilter = ({
  options,
  paramKey,
}: {
  options: {
    label: string;
    value: string;
  }[];
  paramKey: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isUpdatingSearchParams, startUpdatingSearchParams] = useTransition();
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    startUpdatingSearchParams(() => {
      router.replace(
        `${pathname}${queriesBuilder(
          {
            [paramKey]: e.target.value || '',
          },
          searchParams
        )}`
      );
    });
  };

  return (
    <div className='flex items-center gap-2'>
      {isUpdatingSearchParams && <Loader2Icon className='animate-spin' />}
      <select
        onChange={onChange}
        className='border text-body1 border-linePrimary w-[240px] h-[48px] px-2 py-0.5 rounded focus:outline-none focus:border-secondary'
        value={searchParams.get(paramKey) || ''}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ParliamentFilter;
