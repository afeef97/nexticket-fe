import LoginForm from '@/app/(auth)/login/LoginForm';
import { getToken } from '../actions';

const Login = async () => {
  const tokenCookies = await getToken();
  return (
    <>
      <h3 className='mb-4'>Log in</h3>
      <LoginForm tokenCookies={tokenCookies} />
    </>
  );
};

export default Login;
