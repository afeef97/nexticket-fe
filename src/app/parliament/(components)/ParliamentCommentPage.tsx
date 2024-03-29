'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { commentOnParliamentTicket } from '../actions';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function ParliamentCommentPage({
  commentData,
  ticketId,
}: {
  commentData: any;
  ticketId: number;
  type: string;
}) {
  //   const [show, setShow] = useState(false);
  const [comments, setComment] = useState('');

  const { mutateAsync: triggerComment, isPending: isPendingComment } =
    useMutation({
      mutationFn: async () =>
        await commentOnParliamentTicket(comments, ticketId.toString()),
      onSuccess: () => {
        setComment('');
      },
    });

  return (
    <div className='flex flex-col items-center justify-between '>
      <div className='w-full'>
        <textarea
          disabled={isPendingComment}
          placeholder='Leave a comment here'
          value={comments}
          onChange={(e) => setComment(e.target.value)}
          className={`w-full resize-none p-2 text-textPrimary border outline-none border-linePrimary rounded focus:h-[120px] focus:border-linePrimary ${
            comments !== '' ? 'h-[120px]' : ' h-[48px]'
          }`}
        />
        {comments !== '' && (
          <div className='flex gap-2 items-center justify-end mt-4'>
            <button
              onClick={() => setComment('')}
              className=' px-4 h-[48px] border border-primary hover:border-[#86CDE0] hover:text-[#86CDE0] text-primary text-sub1 rounded-[4.8px]'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isPendingComment}
              onClick={() => triggerComment()}
              className=' px-4 h-[48px] bg-primary hover:bg-primaryHover text-whiteBg text-sub1 rounded-[4.8px]'
            >
              Comment
            </button>
          </div>
        )}
        <div className='mt-8 flex flex-col overflow-auto h-[31rem]'>
          {commentData?.data?.data?.map((item: any, index: number) => (
            <div
              key={index}
              className='flex gap-4 items-center border-y border-y-muted -mb-[1px] p-2'
            >
              <Avatar>
                <AvatarFallback>{item.user_name[0]}</AvatarFallback>
                <AvatarImage src={item?.user_avatar} />
              </Avatar>
              <div className='flex flex-col gap-1 text-foreground w-full'>
                <div className='flex justify-between items-center'>
                  <span className='inline-block font-medium'>
                    {item.user_name}
                  </span>
                  <span className='text-sm text-muted-foreground'>
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>
                <div className='text-body1'>{item.comments}</div>
              </div>
            </div>
          ))}
          {/* <Snackbar
            show={show}
            close={() => setShow(false)}
            message='Comment updated'
          /> */}
        </div>
      </div>
    </div>
  );
}
