import RegisterOrganizationForm from './RegisterOrganizationForm';
import { getUserAccount } from '../actions';

const RegisterOrganization = async () => {
  const response = await getUserAccount();

  return (
    <div className='tw-max-w-lg'>
      <h4>Register Organization</h4>
      <p>Start by registering on behalf of your organization here.</p>
      <RegisterOrganizationForm userAccountData={response} />
    </div>
  );
};

export default RegisterOrganization;
