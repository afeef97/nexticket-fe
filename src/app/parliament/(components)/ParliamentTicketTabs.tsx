'use client';

import React, { useState } from 'react';
import ParliamentCommentPage from './ParliamentCommentPage';
import ParliamentEmptyState from './ParliamentEmptyState';

const ParliamentTicketTabs = ({
  commentData,
  ticketId,
}: {
  commentData: any;
  ticketId: number;
}) => {
  const [showPage, setShowPage] = useState('comment');
  return (
    <div>
      <div className='w-full border-b border-border flex'>
        <div
          onClick={() => setShowPage('comment')}
          className={`p-4 cursor-pointer ${
            showPage === 'comment'
              ? 'text-primary border-b-2 border-primary'
              : 'text-foreground'
          }`}
        >
          <h6>Comment</h6>
        </div>
        <div
          onClick={() => setShowPage('history')}
          className={`p-4 cursor-pointer ${
            showPage === 'history'
              ? 'text-primary border-b-2 border-primary'
              : 'text-foreground'
          }`}
        >
          <h6>History</h6>
        </div>
      </div>
      <div className='my-6 min-h-[calc(100vh-410px)]'>
        {showPage === 'comment' &&
          (commentData.ok ? (
            <ParliamentCommentPage
              commentData={commentData}
              ticketId={ticketId}
              type='complaint'
            />
          ) : (
            <ParliamentEmptyState />
          ))}
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
  );
};

export default ParliamentTicketTabs;
