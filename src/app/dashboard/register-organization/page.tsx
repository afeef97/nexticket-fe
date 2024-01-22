import RegisterOrganizationForm from './RegisterOrganizationForm';
import { getUserAccount } from '../actions';

const RegisterOrganization = async () => {
  const response = await getUserAccount();

  return (
    <div className='tw-max-w-lg'>
      <h4>Register Organization</h4>
      <p>
        Seems like you don&apos;t belong to any organization currently. Start by
        registering on behalf of your organization or contact your admin to send
        you an invitation.
      </p>
      <RegisterOrganizationForm userAccountData={response} />
    </div>
  );
};

export default RegisterOrganization;
