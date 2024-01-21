import LogInForm from '../../components/Authentication/LogInForm/LogInForm';
import { Grid } from 'semantic-ui-react';
import { useState } from 'react';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../redux/user/userApiSlice';
import { useFormErrorInfo } from './useFormErrorInfo';

type AuthProps = {
  isRegisterForm: boolean;
};

const Authentication = (props: AuthProps) => {
  const [login, loginData] = useLoginMutation();
  const [register, registerData] = useRegisterMutation();

  const loginStatus = { isError: loginData.isError, error: loginData.error };
  const registerStatus = {
    isError: registerData.isError,
    error: registerData.error,
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState({
    error: false,
    message: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const validEmail = (email: string) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validPassword = (password: string) => {
    if (password.length < 8) {
      return false;
    } else if (password.search(/[a-z]/) < 0) {
      return false;
    } else if (password.search(/[A-Z]/) < 0) {
      return false;
    } else if (password.search(/[0-9]/) < 0) {
      return false;
    } else {
      return true;
    }
  };

  const invalidForm = (
    message: string = 'Please make sure to fill out form properly.',
  ) => {
    setFormError((prevState) => ({
      ...prevState,
      error: true,
      message,
    }));
  };

  const validateFormData = () => {
    const { name, email, password, confirmPassword } = formData;
    //validate name when registering
    if (!name) {
      invalidForm('Please type in your name.');
      return false;
    }
    //validate email
    else if (!email || !validEmail(email)) {
      invalidForm('Please include a valid email address.');
      return false;
    } else if (!password) {
      invalidForm('Please type in your password.');
      return false;
    }
    //validate passwords match when registering
    else if (password !== confirmPassword) {
      invalidForm('Passwords need to match.');
      return false;
    } else if (!validPassword(password)) {
      invalidForm(
        'Password should have at least 8 characters, contain one uppercase, and one number.',
      );
      return false;
    } else {
      return true;
    }
  };

  const handleFormSubmit = () => {
    const { name, email, password } = formData;
    if (props.isRegisterForm) {
      const formIsValid = validateFormData();
      formIsValid && register({ name, email, password });
    } else {
      if (email && password) login({ email, password });
      else {
        invalidForm('Please provide your email and password.');
      }
    }
  };

  const { error, message } = useFormErrorInfo({
    formError,
    registerStatus,
    loginStatus,
  });

  const { isLoading: isLoadingLogin } = loginData;
  const { isLoading: isLoadingRegister } = registerData;

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <LogInForm
        isRegisterForm={props.isRegisterForm}
        isLoading={isLoadingLogin || isLoadingRegister}
        formError={error}
        formErrorMessage={message}
        onFormChange={handleFormChange}
        onSubmit={handleFormSubmit}
      />
    </Grid>
  );
};

export default Authentication;
