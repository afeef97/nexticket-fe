import Link from 'next/link';
import { Metadata } from 'next';
import PageTitle from '@/components/shared/PageTitle';
import React from 'react';

export const metadata: Metadata = {
  title: 'nexticket | Account',
};

const UserAccount = () => {
  return (
    <div>
      <PageTitle title='My account' />

      <Link href={'/dashboard/account/update'}>Update account</Link>
    </div>
  );
};

export default UserAccount;
