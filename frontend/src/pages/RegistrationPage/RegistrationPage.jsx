import React , {lazy} from 'react';

const Registration = lazy(() => import('../../components/Registration/Registration'));

const Login = () => {
  return (
    <div>
      <Registration/>
    </div>
  );
};

export default Login;
