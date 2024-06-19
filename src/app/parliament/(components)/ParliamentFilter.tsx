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
            page: pathname === '/parliament/dashboard' ? 0 : 1,
          },
          searchParams
        )}`
      );
    });
  };

  return (
    <div className='flex items-center gap-2'>
      <div className='border relative border-border w-[240px] h-[48px] px-2 rounded flex justify-between items-center bg-white'>
        <select
          onChange={onChange}
          className='w-full h-full focus:outline-none py-0.5 bg-white'
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
        {isUpdatingSearchParams && (
          <Loader2Icon className='animate-spin absolute flex-grow right-6' />
        )}
      </div>
    </div>
  );
};

export default ParliamentFilter;
