import { useMemo } from 'react';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type SerializedError } from '@reduxjs/toolkit';

type FormErrorInfoProps = {
  formError: FormError;
  registerStatus: MutationData;
  loginStatus: MutationData;
};

type FormError = {
  error: boolean;
  message: string;
};
// isError comes from mutation, error prop comes from our API
// this allows TS check with expected props
type ServerResponse = { isError: boolean; error: { data: { error: string } } };

type MutationResponse = {
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
};

type MutationData = MutationResponse | ServerResponse;

const hasErrorProps = (status: MutationData): status is ServerResponse => {
  return (status.isError && status.error && 'data' in status.error) || false;
};

const defaultMessage = 'There was an error.';

const createMessage = (message: string | undefined) => {
  if (message === undefined || !Object.entries(message).length)
    return defaultMessage;
  else return message;
};

// Combines error handling for form UI, login, register
export const useFormErrorInfo = ({
  formError,
  loginStatus,
  registerStatus,
}: FormErrorInfoProps): FormError => {
  return useMemo(() => {
    const errorInfo: FormError = { error: false, message: '' };
    if (hasErrorProps(loginStatus)) {
      errorInfo.error = true;
      const errorMessage = loginStatus.error.data?.error;
      errorInfo.message = createMessage(errorMessage);
    } else if (hasErrorProps(registerStatus)) {
      errorInfo.error = true;
      const errorMessage = registerStatus.error.data?.error;
      errorInfo.message = createMessage(errorMessage);
    } else if (formError.error) {
      return formError;
    } else return errorInfo;

    return errorInfo;
  }, [formError, loginStatus, registerStatus]);
};
