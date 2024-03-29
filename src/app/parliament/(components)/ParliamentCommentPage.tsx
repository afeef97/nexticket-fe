'use client';

import ParliamentLoadingButtonState from './ParliamentLoadingButtonState';
import { useState } from 'react';

export default function ParliamentCommentPage({
  commentData,
  type,
}: {
  commentData: any;
  type: string;
  ticketId: number;
}) {
  //   const [show, setShow] = useState(false);
  const [comments, setComment] = useState('');

  //time of comment format
  //   const formatDateTime = (dateTimeString: string) => {
  //     const dateTime = parse(dateTimeString, 'dd/MM/yyyy HH:mm:ss', new Date());

  //     if (isToday(dateTime)) {
  //       return format(dateTime, "'Today,' h:mm a");
  //     } else if (isYesterday(dateTime)) {
  //       return format(dateTime, "'Yesterday,' h:mm a");
  //     } else {
  //       return format(dateTime, "dd/MM/yyyy 'at' hh:mm a");
  //     }
  //   };

  //post api request for sending comment
  //   const { mutate: mutateAidComment, isLoading: aidCommentIsLoading } =
  //     useMutation((value) => sendAidComment(value), {
  //       onSuccess: (response) => {
  //         console.log(response);
  //         setComment('');
  //         setShow(true);
  //         refetch();
  //       },
  //       onError: (error) => {
  //         console.log(error);
  //       },
  //     });
  //   const {
  //     mutate: mutateComplaintComment,
  //     isLoading: complaintCommentIsLoading,
  //   } = useMutation((value) => sendComplaintComment(value), {
  //     onSuccess: (response) => {
  //       console.log(response);
  //       setComment('');
  //       setShow(true);
  //       refetch();
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   });
  const onSubmit = () => {
    // const data = { comments, ticket_id: ticketId };
    if (type === 'aid') {
      //   mutateAidComment(data);
    } else if (type === 'complaint') {
      //   mutateComplaintComment(data);
    }
  };
  return (
    <main className='flex  flex-col items-center justify-between '>
      <div className='w-full'>
        <textarea
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
              onClick={onSubmit}
              className=' px-4   h-[48px] bg-primary hover:bg-primaryHover text-whiteBg text-sub1 rounded-[4.8px]'
            >
              {
                /* {complaintCommentIsLoading || aidCommentIsLoading ? ( */
                false ? <ParliamentLoadingButtonState /> : 'Comment'
              }
            </button>
          </div>
        )}
        <div className='mt-8 flex flex-col gap-8'>
          {commentData?.data?.data?.map((item: any, index: number) => (
            <div
              key={index}
              className='flex gap-4 items-start'
            >
              <div>
                <div className='w-[48px] h-[48px] rounded-full flex items-center justify-center border border-lineSecondary text-textPrimary text-sub1 uppercase'>
                  {item.user_name.charAt(0)}
                </div>
              </div>
              <div className='flex flex-col gap-2 text-textPrimary'>
                <div className='text-sub1 capitalize'>
                  {item.user_name}
                  <span className='ml-4 text-body1 text-textSecondary normal-case'>
                    {/* {formatDateTime(item.updated_at)} */}
                    {new Date().toString()}
                  </span>
                </div>
                <div className='text-body1'>{item.comment}</div>
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
    </main>
  );
}
