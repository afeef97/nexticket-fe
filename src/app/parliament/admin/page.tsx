'use client';
import { BsPlusLg, BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { OrganizationMember } from '@/lib/types';
import ParliamentEmptyState from '../(components)/ParliamentEmptyState';
import ParliamentSkeletonCard from '../(components)/ParliamentSkeletonCard';
import { getParliamentMembers } from './actions';
import useQueryHandler from '@/lib/hooks/useQueryHandler';

export default function Admin() {
  //pagination state
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [rowsPerCurrentPage, setRowsPerCurrentPage] = useState(10);

  //search state
  const [search, setSearch] = useState('');
  // Define a state variable to avoid spamming enter key
  const [searchCooldown, setSearchCooldown] = useState(false);

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

  //to avoid spamming enter button when searching
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

  //search function
  const handleSearch = (words: string) => {
    if (words !== '') {
      setSearch(`&&search=${words}`);
    } else {
      setSearch('');
    }
  };

  //to open add admin dialog
  const [, setIsOpenDialog] = useState(false);

  const { data: membersData, state: getMembersState } = useQueryHandler({
    query: getParliamentMembers,
  });

  return (
    <div>
      <h4>Admin</h4>

      <div className='flex  flex-col items-center justify-between py-16 '>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex w-[420px] items-center bg-white rounded border border-linePrimary px-3 py-2'>
              <BsSearch className='text-textPrimary' />
              <input
                type='text'
                placeholder='Search name or email'
                className='ml-2 px-2 py-0.5 w-full text-body1 text-textPrimary rounded border-none outline-none shadow-none active:border-none'
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsOpenDialog(true)}
              className=' px-4  w-[150px] h-[48px] bg-primary hover:bg-primaryHover text-whiteBg text-sub1 rounded-[4.8px] flex items-center justify-center'
            >
              <span>
                <BsPlusLg size={20} className='text-whiteBg' />
              </span>
              Add admin
            </button>
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
                    {/* loading state */}
                    {getMembersState === 'pending' && (
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
                      </tr>
                    )}

                    {/* normal state */}
                    {getMembersState === 'resolved' &&
                      membersData.ok &&
                      membersData.data.data.map(
                        (item: OrganizationMember, index: number) => (
                          <tr key={index} className='cursor-pointer'>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-body1  text-textPrimary sm:pl-6 md:pl-3'>
                              {/* <Link href={`/aid?title=${item.title}&time=${item.time}`} as={`/aid/${item.id}`}> */}
                              {item.username}
                              {/* </Link> */}
                            </td>
                            <td className='whitespace-nowrap py-4 px-3 text-body1  text-textPrimary'>
                              {item.email}
                            </td>
                            <td className='whitespace-nowrap py-4 px-3 text-body1  text-textPrimary flex justify-end'>
                              <GoKebabHorizontal size={24} />
                              {/* <SeeMoreButton
                              name={item.name}
                              id={item.id}
                              email={item.email}
                              refetch={refetch}
                            /> */}
                            </td>
                          </tr>
                        )
                      )}
                    {/* error state */}
                    {getMembersState === 'error' ||
                      (getMembersState === 'resolved' &&
                        membersData.ok &&
                        membersData?.data.data.length === 0 && (
                          <tr>
                            <td colSpan={3}>
                              <ParliamentEmptyState />
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* PAGINATION  */}
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
      {/* add admin dialog */}
      {/* <AddAdminDialog
        open={isOpenDialog}
        setCloseDialog={() => setIsOpenDialog(false)}
        refetch={refetch}
      /> */}
    </div>
  );
}
