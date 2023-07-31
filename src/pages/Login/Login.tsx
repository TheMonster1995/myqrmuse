import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import SectionWrapper from 'pages/Landing/SectionWrapper';

const Login: React.FC = () => {
  const [cmpState, setCmpState] = useState<
    'login' | 'forgotPassword' | 'lintSent'
  >('login');
  const [username, setUsername] = useState('');

  const toggleCmpState = (inputUsername, status) => {
    setUsername(inputUsername ?? '');
    setCmpState(status);
  };

  return (
    <SectionWrapper className="h-[48vh]">
      {cmpState === 'login' ? (
        <LoginForm
          onForgotPassword={toggleCmpState}
          defaultUsername={username}
        />
      ) : (
        <ForgotPasswordForm
          onBack={toggleCmpState}
          defaultUsername={username}
        />
      )}
    </SectionWrapper>
  );
};

export default Login;
