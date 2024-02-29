'use client';
import { formatDateToString, subtractMonths, subtractWeeks } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function Complaint() {
  // temporary state
  const data: any = undefined;
  const isError = false;
  const isFetching = false;
  const isLoading = false;

  //pagination state
  const [currentPage] = useState(1);
  const [rowsPerCurrentPage] = useState(10);

  //to find status in url query
  const searchParams = useSearchParams();
  const statusParams = searchParams.get('status');

  //filter state
  const [filterStatus, setfilterStatus] = useState(
    statusParams ? `&&status=${statusParams}` : ''
  );

  const [filterTime, setfilterTime] = useState('');
  const [search, setSearch] = useState('');
  const filter = `${filterStatus}${filterTime}`;

  // Define a state variable to avoid spamming enter key
  const [searchCooldown, setSearchCooldown] = useState(false);

  //search function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value;
    if (words !== '') {
      setSearch(`&&search=${words}`);
    } else {
      setSearch('');
    }
  };

  //set debounce for search filter
  useEffect(() => {
    // Set a new timeout to refetch data after 3 seconds if words are not empty
    const debounceTimeout = setTimeout(() => {
      //   refetch();
    }, 2000);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

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

  //navigate to id page
  const router = useRouter();
  const handleRowClick = (itemId: string) => {
    router.push(`/complaint/${itemId}`);
  };

  //call data again if there is a change in page or row
  useEffect(() => {
    // refetch();
  }, [currentPage, rowsPerCurrentPage, filter]);

  // useEffect(() => {
  //   console.log("searchCooldown", searchCooldown);
  // }, [isFetching]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && search !== '' && !searchCooldown) {
        setSearchCooldown(true);
        event.preventDefault();
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
  return (
    <div>
      <h4>Complaint</h4>

      <div className='flex  flex-col items-center justify-between py-16 '>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-4'>
              <select
                value={filterStatus}
                onChange={(e) => setfilterStatus(e.target.value)}
                className='border text-body1 border-linePrimary w-[240px] h-[48px] px-2 py-0.5 rounded focus:outline-none focus:border-linePrimary'
              >
                <option value=''>All status</option>
                <option value='&&status=4'>Completed</option>
                <option value='&&status=1'>Pending</option>
                <option value='&&status=2'>Awaiting reply</option>
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
              {/* <BsSearch className='text-gray-400' /> */}
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
                    {(isFetching || isLoading) && (
                      <tr>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-body1 text-textPrimary sm:pl-6 md:pl-3'>
                          <Skeleton />
                        </td>
                        <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                          <Skeleton />
                        </td>
                        <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                          <Skeleton />
                        </td>
                        <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary flex items-center gap-2'>
                          <Skeleton />
                        </td>
                      </tr>
                    )}

                    {/* normal state */}
                    {!isFetching &&
                      !isLoading &&
                      !isError &&
                      data?.data.data.map((item: any, index: number) => (
                        <tr
                          onClick={() => handleRowClick(item.id)}
                          key={index}
                          className='cursor-pointer'
                        >
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-body1 text-textPrimary sm:pl-6 md:pl-3'>
                            {item.id}
                          </td>
                          <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                            {item.created_at}
                          </td>
                          <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                            {item.title}
                          </td>
                          <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary flex items-center gap-2'>
                            <span>
                              {item.ticket_status === 'Completed' && (
                                <div className='w-[10px] h-[10px] rounded-full bg-positive'></div>
                              )}
                              {item.ticket_status === 'Pending' && (
                                <div className='w-[10px] h-[10px] rounded-full bg-warning'></div>
                              )}
                              {item.ticket_status === 'AwaitingReply' && (
                                <div className='w-[10px] h-[10px] rounded-full bg-waitingColor'></div>
                              )}
                              {item.ticket_status === 'Rejected' && (
                                <div className='w-[10px] h-[10px] rounded-full bg-negative'></div>
                              )}
                            </span>
                            <span>
                              {item.ticket_status === 'AwaitingReply'
                                ? 'Awaiting reply'
                                : item.ticket_status}
                            </span>
                          </td>
                        </tr>
                      ))}

                    {/* error state */}
                    {!isFetching &&
                      !isLoading &&
                      data?.data.data.length === 0 && (
                        <tr>
                          <td colSpan={4}>{/* <EmptyState /> */}</td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* PAGINATION */}
          {/* {!isError && !isLoading && data?.data.data.length !== 0 && (
            <TicketingPagination
              count={data?.data.meta.total}
              lastPage={data?.data.meta.last_page}
              pages={currentPage}
              rows={rowsPerCurrentPage}
              setPages={setCurrentPage}
              setRows={setRowsPerCurrentPage}
              from={data?.data.meta.from}
              to={data?.data.meta.to}
            />
          )}
          {(isError || isLoading || data?.data.data.length === 0) && (
            <TableBottom />
          )} */}
        </div>
      </div>
    </div>
  );
}
