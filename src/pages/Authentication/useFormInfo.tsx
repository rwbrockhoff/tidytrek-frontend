import { useMemo, useState } from 'react';
import { FormError } from '../../types/formTypes';

// isError comes from mutation, error prop comes from our API
// this allows TS check with expected props
type ServerResponse = { isError: boolean; error: { data: { error: string } } };

type MutationResponse = {
	isError: boolean;
	error: FormError | undefined;
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

// Combines error handling for form UI and mutations that are passed in as an array
// Resets error form if mutation is loading

const initialState = { error: false, message: '' };

export const useFormInfo = (
	mutations: MutationData[],
	loading: boolean,
): [FormError, (error: FormError) => void] => {
	const [formError, setFormError] = useState(initialState);

	const result: FormError = useMemo(() => {
		for (const mutation of mutations) {
			if (hasErrorProps(mutation)) {
				const rawMessage = mutation.error.data?.error;
				const message = createMessage(rawMessage);
				return { error: true, message };
			}
		}
		return initialState;
	}, [mutations]);

	if (loading && formError.error) setFormError(initialState);
	if (result.error) return [result, setFormError];
	else return [formError, setFormError];
};
