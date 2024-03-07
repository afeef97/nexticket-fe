export default function ParliamentSkeletonCard() {
  return (
    <>
      <div className='flex w-full flex-1 flex-col items-center'>
        <div className=' w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl'>
          <div className='flex flex-col space-y-2'>
            <div className='h-6 w-full rounded-md bg-muted '></div>
            {/* <div className="h-6 w-10/12 rounded-md bg-lineSecondary "></div>
            <div className="h-6 w-9/12 rounded-md bg-lineSecondary "></div>
            <div className="h-6 w-9/12 rounded-md bg-lineSecondary "></div> */}
          </div>
        </div>
      </div>
    </>
  );
}
