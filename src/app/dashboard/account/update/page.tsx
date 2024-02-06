import React from 'react';
import UpdateAccountForm from './UpdateAccountForm';

const UpdateUser = () => {
  return (
    <div>
      <h3 className='tw-mb-8'>Update account</h3>

      <div className='tw-border-2 tw-border-border tw-rounded-xl tw-p-4 md:tw-p-6 tw-max-w-screen-sm tw-bg-secondary/5'>
        <UpdateAccountForm />
      </div>
    </div>
  );
};

export default UpdateUser;
