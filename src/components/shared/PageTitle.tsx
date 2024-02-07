import React from 'react';

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className='tw-mt-2 md:tw-mt-0 tw-mb-8 tw-border-b tw-border-border'>
      <h2 className='tw-mb-2'>{title}</h2>
    </div>
  );
};

export default PageTitle;
