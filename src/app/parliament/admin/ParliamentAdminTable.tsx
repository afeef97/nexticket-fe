'use client';

import {
  AccessContext,
  IAccessContext,
} from '@/components/providers/AccessContextProvider';
import {
  FetchReturn,
  GetQuery,
  OrganizationMember,
  PaginatedParliamentMember,
} from '@/lib/types';
import React, { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MemberActionButton from './MemberActionButton';
import ParliamentEmptyState from '../(components)/ParliamentEmptyState';
import ParliamentTableBottom from '../(components)/ParliamentTableBottom';
import ParliamentTicketingPagination from '../(components)/ParliamentTicketingPagination';
import { queriesBuilder } from '@/lib/utils';

const ParliamentAdminTable = ({
  membersData,
}: {
  membersData: FetchReturn<GetQuery<PaginatedParliamentMember>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { userData } = useContext<IAccessContext>(AccessContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerCurrentPage, setRowsPerCurrentPage] = useState(10);

  useEffect(() => {
    if (searchParams.has('page') && searchParams.has('per-page')) {
      setCurrentPage(parseInt(searchParams.get('page') as string));
      setRowsPerCurrentPage(parseInt(searchParams.get('per-page') as string));
    }
  }, [searchParams]);

  useEffect(() => {
    router.replace(
      `${pathname}${queriesBuilder(
        { page: currentPage, 'per-page': rowsPerCurrentPage },
        searchParams
      )}`
    );
  }, [currentPage, pathname, rowsPerCurrentPage, router, searchParams]);

  return (
    <table className='min-w-full '>
      <thead>
        <tr className='bg-secondary/20'>
          <th
            scope='col'
            className='py-3.5 pl-4 pr-3 text-left text-body1  text-textSecondary sm:pl-6 md:pl-3'
          >
            Name
          </th>
          <th
            scope='col'
            className='py-3.5 px-3 text-left text-body1 w-[500px] text-textSecondary'
          >
            Email
          </th>

          <th
            scope='col'
            className='py-3.5 px-3 text-left text-body1  text-textSecondary w-[150px]'
          ></th>
        </tr>
      </thead>
      <tbody className='divide-y divide-lineSecondary'>
        {/* normal state */}
        {membersData.ok &&
          membersData.data.data.data.map(
            (item: OrganizationMember, index: number) => (
              <tr
                key={index}
                className='cursor-pointer'
              >
                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-body1  text-textPrimary sm:pl-6 md:pl-3'>
                  {/* <Link href={`/aid?title=${item.title}&time=${item.time}`} as={`/aid/${item.id}`}> */}
                  {item.username || 'Username not found'}
                  {/* </Link> */}
                </td>
                <td className='whitespace-nowrap py-4 px-3 text-body1  text-textPrimary'>
                  {item.email}
                </td>
                <td className='whitespace-nowrap py-4 px-3 text-body1  text-textPrimary flex justify-end'>
                  <MemberActionButton
                    disabled={userData?.email === item.email}
                    isVerified={Boolean(item.isVerified)}
                  />
                </td>
              </tr>
            )
          )}
        {/* error state */}
        {!membersData.ok ||
          (membersData.ok && membersData?.data.data.data.length === 0 && (
            <tr>
              <td colSpan={3}>
                <ParliamentEmptyState />
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          {/* PAGINATION  */}
          {membersData.ok && membersData?.data.data.data.length !== 0 && (
            <td colSpan={4}>
              <ParliamentTicketingPagination
                count={membersData?.data.data.meta.total}
                lastPage={membersData?.data.data.meta.lastPage}
                pages={currentPage}
                rows={rowsPerCurrentPage}
                setPages={setCurrentPage}
                setRows={setRowsPerCurrentPage}
                from={
                  membersData?.data.data.meta.currentPage * rowsPerCurrentPage -
                  rowsPerCurrentPage +
                  1
                }
                to={
                  membersData?.data.data.meta.currentPage ===
                  membersData?.data.data.meta.lastPage
                    ? membersData?.data.data.meta.total
                    : membersData?.data.data.meta.currentPage *
                      rowsPerCurrentPage
                }
              />
            </td>
          )}
          {(!membersData.ok ||
            (membersData.ok && membersData?.data.data.data.length === 0)) && (
            <td colSpan={4}>
              <ParliamentTableBottom />
            </td>
          )}
        </tr>
      </tfoot>
    </table>
  );
};

export default ParliamentAdminTable;
