import { useMemo } from 'react';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type SerializedError } from '@reduxjs/toolkit';
import { FormError } from '../../types/generalTypes';

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
	if (message === undefined || !Object.entries(message).length) return defaultMessage;
	else return message;
};

// Combines error handling for form UI, login, register

export const useFormErrorInfo = (
	formError: FormError,
	mutations: MutationData[],
): FormError => {
	return useMemo(() => {
		const errorInfo: FormError = { error: false, message: '' };
		if (formError.error) return formError; // UI errors

		for (const mutation of mutations) {
			if (hasErrorProps(mutation)) {
				errorInfo.error = true;
				const errorMessage = mutation.error.data?.error;
				errorInfo.message = createMessage(errorMessage);
				return errorInfo;
			}
		}

		return errorInfo;
	}, [formError, mutations]);
};
