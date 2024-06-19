import { BsFileEarmarkFill } from 'react-icons/bs';

export default function ParliamentEmptyState() {
  return (
    <div className='w-full flex items-center justify-center flex-col py-16'>
      <div className='flex items-center justify-center'>
        <div className=' text-linePrimary w-12 h-12 rounded-full bg-lineSecondary border border-lineSecondary flex items-center justify-center'>
          <BsFileEarmarkFill size={24} />
        </div>
      </div>
      <h3 className='mt-2 text-body1'>No data found</h3>
    </div>
  );
}
