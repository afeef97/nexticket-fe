import React from 'react';

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className='mt-2 md:mt-0 mb-8 border-b border-border'>
      <h2 className='mb-2'>{title}</h2>
    </div>
  );
};

export default PageTitle;
