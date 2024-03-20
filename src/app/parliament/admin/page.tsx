'use client';

import { AccessContext, IAccessContext } from '@/components/providers/AccessContextProvider';
import { useContext, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import InviteMembers from '@/app/dashboard/users/InviteMembers';
import MemberActionButton from './MemberActionButton';
import { OrganizationMember } from '@/lib/types';
import ParliamentEmptyState from '../(components)/ParliamentEmptyState';
import ParliamentSkeletonCard from '../(components)/ParliamentSkeletonCard';
import ParliamentTableBottom from '../(components)/ParliamentTableBottom';
import ParliamentTicketingPagination from '../(components)/ParliamentTicketingPagination';
import { getParliamentMembers } from './actions';
import useQueryHandler from '@/lib/hooks/useQueryHandler';

export default function Admin() {
  const { userData } = useContext<IAccessContext>(AccessContext);
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerCurrentPage, setRowsPerCurrentPage] = useState(10);

  //search state
  const [search, setSearch] = useState('');
  // Define a state variable to avoid spamming enter key
  const [searchCooldown, setSearchCooldown] = useState(false);
  
  const {
    data: membersData,
    state: getMembersState,
    triggerQuery: triggerGetMembers,
  } = useQueryHandler({
    query: () => getParliamentMembers(search, currentPage, rowsPerCurrentPage),
    deps: [currentPage, rowsPerCurrentPage],
  });

  //set debounce for search filter
  useEffect(() => {
    // Set a new timeout to refetch data after 3 seconds if words are not empty
    const debounceTimeout = setTimeout(() => {
      setCurrentPage(1);
      triggerGetMembers();
    }, 2000);

    return () => {
      clearTimeout(debounceTimeout);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
      setSearch(`&search=${words}`);
    } else {
      setSearch('');
    }
  };

  return (
    <div>
      <h4>Admin</h4>

      <div className="flex  flex-col items-center justify-between py-16 ">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex w-[420px] items-center bg-white rounded border border-linePrimary px-3 py-2">
              <BsSearch className="text-textPrimary" />
              <input
                type="text"
                placeholder="Search name or email"
                className="ml-2 px-2 py-0.5 w-full text-body1 text-textPrimary rounded border-none outline-none shadow-none active:border-none"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <InviteMembers refetch={triggerGetMembers} />
          </div>
          <div className="mt-8 flex flex-col overflow-x-hidden">
            <div className=" sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full ">
                  <thead>
                    <tr className="bg-secondary/20">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-body1  text-textSecondary sm:pl-6 md:pl-3"
                      >
                        Name
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-left text-body1 w-[500px] text-textSecondary">
                        Email
                      </th>

                      <th scope="col" className="py-3.5 px-3 text-left text-body1  text-textSecondary w-[150px]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lineSecondary">
                    {/* loading state */}
                    {getMembersState === 'pending' && (
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-body1 text-textPrimary sm:pl-6 md:pl-3">
                          <ParliamentSkeletonCard />
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-body1 text-textPrimary">
                          <ParliamentSkeletonCard />
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-body1 text-textPrimary">
                          <ParliamentSkeletonCard />
                        </td>
                      </tr>
                    )}

                    {/* normal state */}
                    {getMembersState === 'resolved' &&
                      membersData.ok &&
                      membersData.data.data.data.map((item: OrganizationMember, index: number) => (
                        <tr key={index} className="cursor-pointer">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-body1  text-textPrimary sm:pl-6 md:pl-3">
                            {/* <Link href={`/aid?title=${item.title}&time=${item.time}`} as={`/aid/${item.id}`}> */}
                            {item.username || 'Username not found'}
                            {/* </Link> */}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-body1  text-textPrimary">{item.email}</td>
                          <td className="whitespace-nowrap py-4 px-3 text-body1  text-textPrimary flex justify-end">
                            <MemberActionButton
                              disabled={userData?.email === item.email}
                              isVerified={Boolean(item.isVerified)}
                            />
                          </td>
                        </tr>
                      ))}
                    {/* error state */}
                    {getMembersState === 'error' ||
                      (getMembersState === 'resolved' && membersData.ok && membersData?.data.data.data.length === 0 && (
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
          {membersData.ok && membersData?.data.data.data.length !== 0 && (
            <ParliamentTicketingPagination
              count={membersData?.data.data.meta.total}
              lastPage={membersData?.data.data.meta.lastPage}
              pages={currentPage}
              rows={rowsPerCurrentPage}
              setPages={setCurrentPage}
              setRows={setRowsPerCurrentPage}
              from={membersData?.data.data.meta.currentPage * rowsPerCurrentPage - rowsPerCurrentPage + 1}
              to={
                membersData?.data.data.meta.currentPage === membersData?.data.data.meta.lastPage
                  ? membersData?.data.data.meta.total
                  : membersData?.data.data.meta.currentPage * rowsPerCurrentPage
              }
            />
          )}
          {(getMembersState === 'error' ||
            getMembersState === 'pending' ||
            (membersData.ok && membersData?.data.data.data.length === 0)) && <ParliamentTableBottom />}
        </div>
      </div>
    </div>
  );
}
