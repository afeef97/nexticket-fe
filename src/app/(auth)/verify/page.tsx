import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import VerifyForm from '@/app/(auth)/verify/VerifyForm';

const Verify = () => {
  return (
    <>
      <h3 className='tw-mb-2'>Verify your account</h3>
      <p className='tw-mb-4 tw-text-justify md:tw-text-left'>
        A token has been sent to your email. Please enter the token below to
        verify your account
      </p>
      <Suspense fallback={<Skeleton className='tw-w-full tw-h-[6.5rem]' />}>
        <VerifyForm />
      </Suspense>
    </>
  );
};

export default Verify;
