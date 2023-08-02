import { useContext } from 'react';
import mqmApi from 'axios/mqmApi';
import { useNavigate } from 'react-router-dom';
import { encrypt } from 'utils';

import { AuthContext, AuthContextUpdate } from 'store/authContext';

type ReturnType = {
  isAuthorized: () => boolean;
  checkAuth: () => Promise<boolean>;
  authorize: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (token: string, username: string, password: string, email?: string) => Promise<boolean>;
};

const useAuth = (): ReturnType => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const updateAuth = useContext(AuthContextUpdate);

  const isAuthorized = () => !!authCtx?.isAuthorized;

  const checkAuth = async () => {
    const accesstoken = localStorage.getItem('accesstoken');

    if (!accesstoken) return false;

    try {
      await mqmApi.get('/auth', {
        headers: { accesstoken },
      });
    } catch (err) {
      return false;
    }

    return true;
  };

  const authorize = async (username, password) => {
    const accesstoken = localStorage.getItem('accesstoken');

    if (accesstoken) localStorage.removeItem('accesstoken');

    const encPassword = encrypt(password);

    try {
      const login = await mqmApi.post(
        '/login',
        { username, password: encPassword },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      localStorage.setItem('accesstoken', login.data.payload.accessToken);
      localStorage.setItem('user_id__mqm', login.data.payload.userid);
      updateAuth(true);
    } catch (err) {
      return false;
    }

    return true;
  };

  const signup = async (token, username, password, email = '',) => {
    const encPassword = encrypt(password);

    try {
      const signup = await mqmApi.post(
        `/signup/${token}`,
        { username, password: encPassword, email },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      localStorage.setItem('accesstoken', signup.data.payload.accessToken);
      localStorage.setItem('user_id__mqm', signup.data.payload.userid);
      updateAuth(true);
    } catch (err) {
      return false;
    }

    return true;
  };

  const logout = () => {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('userid__mqm');
    updateAuth(false);
    navigate('/login');
  };

  return { isAuthorized, authorize, logout, checkAuth, signup };
};

export default useAuth;
