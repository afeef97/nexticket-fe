'use client';

import { FetchReturn, GetQuery, ParliamentTickets } from '@/lib/types';
import React, { useState } from 'react';

const ParliamentTicketContent = ({
  complaintData,
}: {
  complaintData: FetchReturn<GetQuery<ParliamentTickets>>;
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const MAX_WORD = 30;
  const renderText = (text: string) => {
    const words = text?.split(' ');
    if (words?.length < MAX_WORD) {
      return text;
    } else {
      if (!showFullText) {
        const shortenWord = words?.slice(0, MAX_WORD).join(' ');
        return shortenWord;
      } else {
        return text;
      }
    }
  };
  return (
    <>
      {renderText(complaintData.ok ? complaintData.data.data.content : '')}
      {complaintData.ok &&
        complaintData.data.data.content.split(' ').length > MAX_WORD && (
          <>
            {!showFullText && (
              <span>
                ...{' '}
                <span
                  onClick={() => setShowFullText(true)}
                  className='text-secondary underline cursor-pointer'
                >
                  See more
                </span>
              </span>
            )}
            {showFullText && (
              <span
                onClick={() => setShowFullText(false)}
                className='text-secondary underline cursor-pointer ml-1'
              >
                See less
              </span>
            )}
          </>
        )}
    </>
  );
};

export default ParliamentTicketContent;
