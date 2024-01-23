import RegisterOrganizationForm from './RegisterOrganizationForm';

const RegisterOrganization = async () => {
  return (
    <div className='tw-max-w-lg'>
      <h4>Register Organization</h4>
      <p>Start by registering on behalf of your organization here.</p>
      <RegisterOrganizationForm />
    </div>
  );
};

export default RegisterOrganization;
