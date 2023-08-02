import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import TextField, { TTFProps } from 'components/general/TextField';
import useAuth from 'components/hooks/useAuth';
import useLoader from 'components/hooks/useLoader';
import mqmApi from 'axios/mqmApi';
import SectionWrapper from 'pages/Landing/SectionWrapper';
import { renderField } from 'pages/Login';

const Signup: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TSignupForm>();
  const { LoadingWrapper, isLoading, toggleLoading } = useLoader({
    text: 'Sign me up',
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { signup } = useAuth();
  const { token } = useParams();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await mqmApi.get(`/validate/${token ?? ''}/`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (res.status !== 200) {
          enqueueSnackbar('Invalid invite link', {
            variant: 'error',
          })
          navigate('/', { replace: true });
          return true;
        }
      } catch (err) {
        enqueueSnackbar('Invalid invite link', {
          variant: 'error',
        })
        navigate('/', { replace: true });
        return false;
      }
    };
    validateToken();
  }, [])

  const onSubmit: SubmitHandler<TSignupForm> = async ({
    username,
    password,
    email,
  }) => {
    toggleLoading();
    const isSuccessful = await signup(token, username, password, email);

    if (isSuccessful) {
      enqueueSnackbar('Signup successful', { variant: 'success' });
      return navigate('/dashboard');
    }

    toggleLoading();
    return enqueueSnackbar('Unsuccessful. Please try again', { variant: 'error' });
  };

  // const handleResetPassword = () =>
  //   onForgotPassword(getValues('username'), 'forgotPassword');

  const renderInput = (inputProps: TTFProps) => <TextField {...inputProps} />;

  return (
    <SectionWrapper className="flex flex-col items-start justify-start">
      <Typography variant="h1" className="text-syne">Sign up</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col justify-between w-96"
      >
        {renderField(
          { title: 'Username', error: errors.username ? true : null },
          {
            required: true,
            name: 'username',
            control,
            render: ({ field: { onChange } }) =>
              renderInput({
                title: 'Username',
                placeholder: 'John',
                error: !!errors['username'],
                onChange,
              }),
          },
        )}
        {renderField(
          { title: 'Password', error: errors.password ? true : null },
          {
            required: true,
            name: 'password',
            control,
            render: ({ field: { onChange } }) =>
              renderInput({
                title: 'Password',
                placeholder: '********',
                error: !!errors['password'],
                type: 'password',
                onChange,
              }),
          },
        )}
        {renderField(
          { title: 'Email', error: errors.email ? true : null },
          {
            required: false,
            name: 'email',
            control,
            render: ({ field: { onChange } }) =>
              renderInput({
                title: 'Email',
                placeholder: 'JosnDoe@gmail.com',
                error: !!errors['email'],
                type: 'email',
                onChange,
              }),
          },
        )}
        <Button
          variant="contained"
          color="primary"
          className="w-full my-4 text-syne"
          onClick={() => handleSubmit(onSubmit)()}
          disabled={isLoading}
        >
          <LoadingWrapper />
        </Button>
      </form>
      <Button variant="text" color="secondary" onClick={() => null} className="text-syne tracking-widest">
        {
          'Inspiration awaits you :)' //Reset Password
        }
      </Button>
    </SectionWrapper>
  );
};

export default Signup;

type TSignupForm = {
  username: string;
  password: string;
  email?: string;
};
