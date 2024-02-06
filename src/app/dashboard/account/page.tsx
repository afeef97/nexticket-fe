import Link from 'next/link';
import React from 'react';

const UserAccount = () => {
  return (
    <div>
      <h3 className='tw-mb-8'>My account</h3>

      <Link href={'/dashboard/account/update'}>Update account</Link>
    </div>
  );
};

export default UserAccount;
