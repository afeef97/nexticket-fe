import RegisterParliamentForm from './RegisterParliamentForm';

const RegisterParliament = async () => {
  return (
    <div className='max-w-lg'>
      <h4>Register Parliament</h4>
      <p>Please provide the details of your parliament in the form below.</p>
      <RegisterParliamentForm />
    </div>
  );
};

export default RegisterParliament;
