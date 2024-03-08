'use client';

import { formatDateToString, subtractMonths, subtractWeeks } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';
import ParliamentEmptyState from '../(components)/ParliamentEmptyState';
import ParliamentSkeletonCard from '../(components)/ParliamentSkeletonCard';
import ParliamentTableBottom from '../(components)/ParliamentTableBottom';
import ParliamentTicketingPagination from '../(components)/ParliamentTicketingPagination';
import { ParliamentTickets } from '@/lib/types';
import { getAidTickets } from './actions';
import useQueryHandler from '@/lib/hooks/useQueryHandler';

export default function Aid() {
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerCurrentPage, setRowsPerCurrentPage] = useState(10);

  //to find status in url query
  const searchParams = useSearchParams();
  const statusParams = searchParams.get('status');

  //filter state
  const [filterStatus, setfilterStatus] = useState(
    statusParams ? `&status=${statusParams}` : ''
  );

  const [filterTime, setfilterTime] = useState('');
  const [search, setSearch] = useState('');
  const filter = `${filterStatus}${filterTime}`;

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterTime, search]);

  // Define a state variable to avoid spamming enter key
  const [searchCooldown, setSearchCooldown] = useState(false);

  //search function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value;
    if (words !== '') {
      setSearch(`&search=${words}`);
    } else {
      setSearch('');
    }
  };

  //to avoid spamming enter button when searching
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && search !== '' && !searchCooldown) {
        setSearchCooldown(true);
        e.preventDefault();
        // refetch();
      }
      if (searchCooldown) {
        setTimeout(() => {
          setSearchCooldown(false);
        }, 3000);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [search, searchCooldown]);

  //navigate to id page
  const router = useRouter();
  const handleRowClick = (itemId: string) => {
    router.push(`/parliament/aid/${itemId}`);
  };

  //set time filter
  const getCurrentDate = () => {
    const currentDate = new Date();
    return `&&period_end=${formatDateToString(currentDate)}`;
  };

  const getPastWeekDate = () => {
    const pastWeek = subtractWeeks(new Date(), 1);
    return `&&period_end=${formatDateToString(pastWeek)}`;
  };

  const getPastMonthDate = () => {
    const pastMonth = subtractMonths(new Date(), 1);
    return `&&period_end=${formatDateToString(pastMonth)}`;
  };

  const {
    data: aidTicketData,
    state: getAidTicketsState,
    triggerQuery: triggerGetAidTickets,
  } = useQueryHandler({
    query: () =>
      getAidTickets({
        page: currentPage,
        perPage: rowsPerCurrentPage,
        filter,
        search,
      }),
    deps: [currentPage, rowsPerCurrentPage, filter],
  });
  //set debounce for search filter
  useEffect(() => {
    // Set a new timeout to refetch data after 3 seconds if words are not empty
    const debounceTimeout = setTimeout(() => {
      triggerGetAidTickets();
    }, 2000);

    return () => {
      clearTimeout(debounceTimeout);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <h4>Aid</h4>

      <main className='flex  flex-col items-center justify-between py-16 '>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-4'>
              <select
                value={filterStatus}
                onChange={(e) => setfilterStatus(e.target.value)}
                className='border text-body1 border-linePrimary w-[240px] h-[48px] px-2 py-0.5 rounded focus:outline-none focus:border-linePrimary'
              >
                <option value=''>All status</option>
                <option value='&status=COMPLETED'>Completed</option>
                <option value='&status=PENDING'>Pending</option>
                <option value='&status=REJECTED'>Rejected</option>
              </select>
              <select
                onChange={(e) => setfilterTime(e.target.value)}
                className='border text-body1 border-linePrimary w-[240px] h-[48px] px-2 py-0.5 rounded focus:outline-none focus:border-linePrimary'
              >
                <option value=''>All time</option>
                <option value={getCurrentDate()}>Today</option>
                <option value={getPastWeekDate()}>Past week</option>
                <option value={getPastMonthDate()}>Past month</option>
              </select>
            </div>
            <div className='flex items-center bg-white rounded border border-linePrimary px-3 py-2'>
              <BsSearch className='text-gray-400' />
              <input
                type='text'
                placeholder='Search ID or title'
                className='ml-2 px-2 py-0.5 text-body1 text-textPrimary rounded border-none outline-none shadow-none active:border-none'
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>
          <div className='mt-8 flex flex-col overflow-x-hidden'>
            <div className=' sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <table className='min-w-full '>
                  <thead>
                    <tr className='bg-baseBg'>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-body1  text-textSecondary sm:pl-6 md:pl-3'
                      >
                        ID
                      </th>
                      <th
                        scope='col'
                        className='py-3.5 px-3 text-left text-body1  text-textSecondary'
                      >
                        Requested on
                      </th>
                      <th
                        scope='col'
                        className='py-3.5 px-3 text-left text-body1  text-textSecondary'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='py-3.5 px-3 text-left text-body1  text-textSecondary w-[150px]'
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-lineSecondary'>
                    {/* loading state */}
                    {getAidTicketsState === 'pending' && (
                      <tr>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-body1 text-textPrimary sm:pl-6 md:pl-3'>
                          <ParliamentSkeletonCard />
                        </td>
                        <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                          <ParliamentSkeletonCard />
                        </td>
                        <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                          <ParliamentSkeletonCard />
                        </td>
                        <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary flex items-center gap-2'>
                          <ParliamentSkeletonCard />
                        </td>
                      </tr>
                    )}

                    {/* normal state */}
                    {getAidTicketsState === 'resolved' &&
                      aidTicketData.ok &&
                      aidTicketData?.data.data.data.map(
                        (item: ParliamentTickets, index: number) => (
                          <tr
                            onClick={() => handleRowClick(`${item.id}`)}
                            key={index}
                            className='cursor-pointer'
                          >
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-body1 text-textPrimary sm:pl-6 md:pl-3'>
                              {item.id}
                            </td>
                            <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                              {
                                new Date(item.created_at)
                                  .toString()
                                  .split('GMT')[0]
                              }
                            </td>
                            {/* <Link href="/"> */}
                            <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                              {item.title}
                            </td>
                            {/* </Link> */}

                            <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary flex items-center gap-2'>
                              <span>
                                {item.ticket_status === 'COMPLETED' && (
                                  <div className='w-[10px] h-[10px] rounded-full bg-positive'></div>
                                )}
                                {item.ticket_status === 'PENDING' && (
                                  <div className='w-[10px] h-[10px] rounded-full bg-warning'></div>
                                )}
                                {item.ticket_status === 'AWAITING_REPLY' && (
                                  <div className='w-[10px] h-[10px] rounded-full bg-waitingColor'></div>
                                )}
                                {item.ticket_status === 'REJECTED' && (
                                  <div className='w-[10px] h-[10px] rounded-full bg-negative'></div>
                                )}
                              </span>
                              <span>
                                {item.ticket_status === 'AWAITING_REPLY'
                                  ? 'Awaiting reply'
                                  : item.ticket_status}
                              </span>
                            </td>
                          </tr>
                        )
                      )}

                    {/* error state */}
                    {(getAidTicketsState === 'resolved' ||
                      getAidTicketsState === 'error') &&
                      ((aidTicketData.ok &&
                        aidTicketData?.data.data.data.length === 0) ||
                        !aidTicketData.ok) && (
                        <tr>
                          <td colSpan={4}>
                            <ParliamentEmptyState />
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* PAGINATION */}
          {getAidTicketsState === 'resolved' &&
            aidTicketData.ok &&
            aidTicketData?.data.data.data.length !== 0 && (
              <ParliamentTicketingPagination
                count={aidTicketData?.data.data.meta.total}
                lastPage={aidTicketData?.data.data.meta.lastPage}
                pages={currentPage}
                rows={rowsPerCurrentPage}
                setPages={setCurrentPage}
                setRows={setRowsPerCurrentPage}
                from={
                  aidTicketData?.data.data.meta.currentPage *
                    rowsPerCurrentPage -
                  rowsPerCurrentPage +
                  1
                }
                to={
                  aidTicketData?.data.data.meta.currentPage ===
                  aidTicketData?.data.data.meta.lastPage
                    ? aidTicketData?.data.data.meta.total
                    : aidTicketData?.data.data.meta.currentPage *
                      rowsPerCurrentPage
                }
              />
            )}
          {(getAidTicketsState === 'error' ||
            getAidTicketsState === 'pending' ||
            (aidTicketData.ok &&
              aidTicketData.data.data.data.length === 0)) && (
            <ParliamentTableBottom />
          )}
        </div>
      </main>
    </div>
  );
}
