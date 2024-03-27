'use client';
import { useParams, useRouter } from 'next/navigation';
import ParliamentCommentPage from '../../(components)/ParliamentCommentPage';
import ParliamentEmptyState from '../../(components)/ParliamentEmptyState';
import ParliamentSkeletonCard from '../../(components)/ParliamentSkeletonCard';
import ParliamentTicketDetails from '../../(components)/ParliamentTicketDetails';
import { getAidTicket } from '../api';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
import { useState } from 'react';

export default function AidPage() {
  const router = useRouter();
  const params = useParams();

  //set comment/history tab
  const [showPage, setShowPage] = useState('comment');

  //add see more button if text too long
  const [showFullText, setShowFullText] = useState(false);
  //set max word for ticket content
  const maxWord = 30;
  //function to limit word count, if is to long, see more button will appear
  const renderText = (text: string) => {
    const words = text?.split(' ');
    if (words?.length < maxWord) {
      return text;
    } else {
      if (!showFullText) {
        const shortenWord = words?.slice(0, maxWord).join(' ');
        return shortenWord;
      } else {
        return text;
      }
    }
  };

  const {
    data: aidData,
    state: fetchAidState,
    triggerQuery: triggerGetAid,
  } = useQueryHandler({
    query: () => getAidTicket({ ticketId: params.id as string }),
  });
  console.log(aidData?.data?.data);
  //api call get  aid ticket data
  //   const {
  //     data: aidData,
  //     isLoading: aidIsLoading,
  //     isError: aidIsError,
  //     refetch: aidRefetch,
  //   } = useQuery({
  //     queryKey: ["oneAid"],
  //     queryFn: () => getOneAid(params.params.id),
  //   });

  //api call get  aid ticket comment
  //   const {
  //     data: commentData,
  //     isLoading: commentIsLoading,
  //     isError: commentIsError,
  //     refetch: commentRefetch,
  //   } = useQuery({
  //     queryKey: ["comment"],
  //     queryFn: () => getAidComment(params.params.id),
  //   });

  //api call get  complaint ticket history
  //   const {
  //     data: historyData,
  //     isLoading: historyIsLoading,
  //     isError: historyIsError,
  //     refetch: historyRefetch,
  //   } = useQuery({
  //     queryKey: ["history"],
  //     queryFn: () => getAidHistory(params.params.id),
  //   });

  return (
    <div>
      <div className='text-h6 text-textPrimary'>Aid</div>
      <main className='flex  flex-col items-center justify-between mt-[35px] '>
        <div className='w-full '>
          <div className='grid grid-cols-4 gap-4  '>
            <div className='col-span-3'>
              <div className='text-body1 text-textPrimary'>
                <span
                  onClick={() => router.back()}
                  className='text-primary underline cursor-pointer'
                >
                  Aid{' '}
                </span>{' '}
                <span>{`>`}</span> <span>{`Ticket ID ${params.id}`}</span>
              </div>
              <div className='text-h6 text-textPrimary mt-[35px]'>
                {aidData?.data?.data?.ticket.title}
              </div>
              <div className='text-body1 text-textPrimary mt-4'>
                {fetchAidState === 'pending' && (
                  <div className='w-1/3'>
                    <ParliamentSkeletonCard />
                  </div>
                )}
                {fetchAidState === 'resolved' && (
                  <>
                    {renderText(aidData?.data?.data?.ticket?.content)}
                    {aidData?.data?.data?.ticket?.content?.split(' ').length >
                      maxWord && (
                      <>
                        {!showFullText && (
                          <span>
                            ...
                            <span
                              onClick={() => setShowFullText(true)}
                              className='text-primary underline cursor-pointer'
                            >
                              See more
                            </span>{' '}
                          </span>
                        )}
                        {showFullText && (
                          <span
                            onClick={() => setShowFullText(false)}
                            className='text-primary underline cursor-pointer ml-1'
                          >
                            See less
                          </span>
                        )}
                      </>
                    )}
                  </>
                )}
                {fetchAidState === 'error' && <ParliamentEmptyState />}
              </div>
              <div className='my-6'>
                {/* <FileListTile files={aidData?.data.media_url} /> */}
              </div>
              <div>
                <div className='w-full border-b border-lineSecondary  flex text-sub1'>
                  <div
                    onClick={() => setShowPage('comment')}
                    className={`p-4 cursor-pointer ${
                      showPage === 'comment'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-textPrimary'
                    }`}
                  >
                    Comment
                  </div>
                  <div
                    onClick={() => setShowPage('history')}
                    className={`p-4 cursor-pointer ${
                      showPage === 'history'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-textPrimary'
                    }`}
                  >
                    History
                  </div>
                </div>
                <div className='my-6 min-h-[calc(100vh-410px)]'>
                  {showPage === 'comment' &&
                    (fetchAidState === 'pending' ? (
                      <div className='flex flex-col gap-4 w-1/2'>
                        <ParliamentSkeletonCard />
                      </div>
                    ) : fetchAidState === 'resolved' ? (
                      <ParliamentCommentPage
                        type='aid'
                        data={aidData?.data?.data?.comment?.data}
                        ticketId={aidData?.data?.data?.ticket.data.id}
                        refetch={triggerGetAid}
                      />
                    ) : fetchAidState === 'error' ? (
                      <ParliamentEmptyState />
                    ) : null)}
                  {/* {showPage === 'history' &&
                    (historyIsLoading ? (
                      <div className='flex flex-col gap-4 w-1/2'>
                        <ParliamentSkeletonCard />
                      </div>
                    ) : !historyIsLoading && !historyIsError ? (
                      <HistoryPage data={historyData?.data?.data} />
                    ) : historyIsError ? (
                      <ParliamentEmptyState />
                    ) : null)} */}
                </div>
              </div>
            </div>
            <div className='col-span-1 border-l border-lineSecondary h-full pl-4'>
              <ParliamentTicketDetails
                data={aidData.ok ? aidData?.data?.data?.ticket?.data : {}}
                isLoading={fetchAidState === 'pending'}
                isError={fetchAidState === 'error'}
                refetch={triggerGetAid}
                // historyRefetch={historyRefetch}
                type='aid'
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
