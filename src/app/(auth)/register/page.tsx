import RegisterForm from '@/app/(auth)/register/RegisterForm';

const Register = () => {
  return (
    <>
      <h3 className='tw-mb-2'>Register</h3>
      <p className='tw-mb-4 tw-text-justify md:tw-text-left'>
        This will register your account as the organization&apos;s owner.
        Otherwise, contact your organization admin to get an invitation to
        register.
      </p>
      <RegisterForm />
    </>
  );
};

export default Register;
