import { useMemo, useState } from 'react';
import { FormError } from '@/types/form-types';
import { type AxiosError } from 'axios';

// isError comes from mutation, error prop comes from our API
// this allows TS check with expected props
export type MutationError = { isError: boolean; error: AxiosError | null };

type ServerResponse = {
	isError: boolean;
	error: { response: { data: { error: string } } };
};

type MutationData = MutationError | ServerResponse;

const hasErrorProps = (status: MutationData): status is ServerResponse => {
	return (status.isError && status.error && 'response' in status.error) || false;
};

const defaultMessage = 'There was an error.';

const createMessage = (message: string | undefined) => {
	if (message === undefined || !Object.entries(message).length) return defaultMessage;
	else return message;
};

// Combines error handling for form UI and mutations that are passed in as an array
// Resets error form if mutation is loading

const initialState = { error: false, message: '' };

export const useCombineErrors = (
	mutations: MutationError[],
): [FormError, (error: FormError) => void] => {
	const [formError, setFormError] = useState(initialState);

	const result: FormError = useMemo(() => {
		for (const mutation of mutations) {
			if (hasErrorProps(mutation)) {
				const rawMessage = mutation.error.response.data.error;
				const message = createMessage(rawMessage);
				return { error: true, message };
			}
		}
		return initialState;
	}, [mutations]);

	if (result.error) return [result, setFormError];
	else return [formError, setFormError];
};
