import { Grid } from 'semantic-ui-react';
import { useState } from 'react';
import { useResetPasswordMutation } from '../../redux/user/userApiSlice';
import ResetPasswordForm from '../../components/Authentication/ResetPasswordForm/ResetPasswordForm';

const ResetPassword = () => {
  const [resetPassword, { isLoading, isError, isSuccess }] =
    useResetPasswordMutation();

  const [email, setEmail] = useState('');

  const [formError, setFormError] = useState({
    error: false,
    message: '',
  });

  const validEmail = (email: string) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = () => {
    if (validEmail(email)) resetPassword(email);
    else setFormError({ error: true, message: 'Invalid email format.' });
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <ResetPasswordForm
        isLoading={isLoading}
        isSuccess={isSuccess}
        formError={formError.error || isError}
        formErrorMessage={formError.message}
        onFormChange={handleFormChange}
        onSubmit={handleFormSubmit}
      />
    </Grid>
  );
};

export default ResetPassword;
