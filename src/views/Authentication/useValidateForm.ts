import { useState } from 'react';
import { validPassword, validEmail } from './authHelper';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const useValidateForm = () => {
  const [formError, setFormError] = useState({
    error: false,
    message: '',
  });

  const invalidForm = (
    message: string = 'Please make sure to fill out form properly.',
  ) => {
    setFormError({ error: true, message });
  };

  const validateFormData = (formData: FormData) => {
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

  return { formError, invalidForm, validateFormData };
};
