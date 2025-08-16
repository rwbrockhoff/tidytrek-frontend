import { useMemo, useState } from 'react';
import { FormError } from '@/types/form-types';
import { type AxiosError } from 'axios';
import { extractErrorMessage } from '@/utils/error-utils';

// isError comes from mutation, error prop comes from our API
// this allows TS check with expected props
export type MutationError = { isError: boolean; error: AxiosError | null };

// Combines error handling for form UI and mutations that are passed in as an array
// Resets error form if mutation is loading

const initialState = { error: false, message: '' };

export const useCombineErrors = (
	mutations: MutationError[],
): [FormError, (error: FormError) => void] => {
	const [formError, setFormError] = useState(initialState);

	const result: FormError = useMemo(() => {
		for (const mutation of mutations) {
			if (mutation.isError && mutation.error) {
				const message = extractErrorMessage(mutation.error);
				return { error: true, message };
			}
		}
		return initialState;
	}, [mutations]);

	if (result.error) return [result, setFormError];
	else return [formError, setFormError];
};
