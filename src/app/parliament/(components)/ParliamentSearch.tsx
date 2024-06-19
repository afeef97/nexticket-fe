'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';
import { Loader2 } from 'lucide-react';
import { queriesBuilder } from '@/lib/utils';
import useDebounce from '@/lib/hooks/useDebounce';

const ParliamentSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    debouncedValue: search,
    setValue: setSearch,
    isDebouncing: isDebouncingSearch,
  } = useDebounce<string>(1500, '');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value;
    setSearch(words);
  };

  useEffect(() => {
    router.replace(
      `${pathname}${queriesBuilder({ search, page: 1 }, searchParams)}`
    );
  }, [pathname, router, search, searchParams]);

  return (
    <div className='flex items-center justify-between bg-white rounded border border-border px-3 py-2'>
      <div className='flex items-center'>
        <BsSearch className='text-gray-400' />
        <input
          type='text'
          placeholder='Search ID or title'
          className='ml-2 px-2 py-0.5 rounded border-none outline-none shadow-none active:border-none'
          onChange={(e) => handleSearch(e)}
        />
      </div>
      {isDebouncingSearch ? (
        <Loader2 className='animate-spin' />
      ) : (
        <div className='w-6 h-6' />
      )}
    </div>
  );
};

export default ParliamentSearch;
