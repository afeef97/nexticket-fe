import React from 'react';
import UpdateAccountForm from './UpdateAccountForm';

const UpdateUser = () => {
  return (
    <div>
      <h3 className='mb-8'>Update account</h3>

      <div className='border-2 border-border rounded-xl p-4 md:p-6 max-w-screen-sm bg-secondary/5'>
        <UpdateAccountForm />
      </div>
    </div>
  );
};

export default UpdateUser;
