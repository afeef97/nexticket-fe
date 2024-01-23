import { Suspense } from 'react';
import VerifyForm from '@/app/(auth)/verify/VerifyForm';

const Verify = () => {
  return (
    <div>
      <Suspense>
        <VerifyForm />
      </Suspense>
    </div>
  );
};

export default Verify;
