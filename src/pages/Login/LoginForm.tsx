import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import TextField, { TTFProps } from 'components/general/TextField';
import useAuth from 'components/hooks/useAuth';
import useLoader from 'components/hooks/useLoader';

type Props = {
  onForgotPassword: (input: string, status: string) => void;
  defaultUsername?: string;
};

const LoginForm: React.FC<Props> = ({ onForgotPassword, defaultUsername }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TLoginForm>();
  const { LoadingWrapper, isLoading, toggleLoading } = useLoader({
    text: 'Login',
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { authorize } = useAuth();

  useEffect(() => {
    setValue('username', defaultUsername ?? '');
  }, [defaultUsername, setValue]);

  const onSubmit: SubmitHandler<TLoginForm> = async ({
    username,
    password,
  }) => {
    toggleLoading();
    const isValid = await authorize(username, password);

    if (isValid) {
      enqueueSnackbar('Login successful', { variant: 'success' });
      return navigate('/dashboard');
    }

    toggleLoading();
    return enqueueSnackbar('Bad username/password', { variant: 'error' });
  };

  // const handleResetPassword = () =>
  //   onForgotPassword(getValues('username'), 'forgotPassword');

  const renderInput = (inputProps: TTFProps) => <TextField {...inputProps} className={classNames(inputProps.className, 'text-syne')} />;

  return (
    <Box className="flex flex-col items-start justify-start pl-12">
      <Typography variant="h1" className="text-syne">Login</Typography>
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
    </Box>
  );
};

export default LoginForm;

type TLoginForm = {
  username: string;
  password: string;
};

export const renderField = (
  { displayTitle = true, titleClassName = '', title, error = null },
  { required = false, name, render, control },
): JSX.Element => (
  <Box className="my-4">
    {displayTitle ? (
      <Typography
        className={classNames(
          titleClassName,
          'font-semibold text-sm mb-2 text-syne',
          error && 'text-red-800',
        )}
      >
        {title}
        {error && (
          <FontAwesomeIcon icon={faTriangleExclamation} className="ml-2" />
        )}
      </Typography>
    ) : null}
    <Controller
      control={control}
      rules={{ required }}
      name={name}
      render={render}
    />
  </Box>
);
