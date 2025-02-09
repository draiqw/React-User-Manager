import React , {lazy} from 'react';

const Auth = lazy(() => import('../../components/Authentication/Authentication'));

const Login = () => {
  return (
    <div>
      <Auth/>
    </div>
  );
};

export default Login;
