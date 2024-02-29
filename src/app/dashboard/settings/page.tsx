import GenerateApikey from './GenerateApikey';
import { Metadata } from 'next';
import PageTitle from '@/components/shared/PageTitle';
import React from 'react';

export const metadata: Metadata = {
  title: 'nexticket | Settings',
};

const Settings = () => {
  return (
    <div>
      <PageTitle title='Settings' />

      <div className='space-y-3'>
        <GenerateApikey />
      </div>
    </div>
  );
};

export default Settings;
