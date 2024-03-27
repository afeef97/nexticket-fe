'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';
import { queriesBuilder } from '@/lib/utils';
import useDebounce from '@/lib/hooks/useDebounce';

const ParliamentSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { debouncedValue: search, setValue: setSearch } = useDebounce<string>(
    1500,
    ''
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value;
    setSearch(words);
  };

  useEffect(() => {
    router.replace(`${pathname}${queriesBuilder({ search }, searchParams)}`);
  }, [pathname, router, search, searchParams]);

  return (
    <div className='flex items-center bg-white rounded border border-linePrimary px-3 py-2'>
      <BsSearch className='text-gray-400' />
      <input
        type='text'
        placeholder='Search ID or title'
        className='ml-2 px-2 py-0.5 text-body1 text-textPrimary rounded border-none outline-none shadow-none active:border-none'
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default ParliamentSearch;
