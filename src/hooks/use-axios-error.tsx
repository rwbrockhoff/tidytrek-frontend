import axios, { AxiosError } from 'axios';
import { useMemo, useState } from 'react';

// return nested axios error or a default error message
export const useAxiosErrorMessage = (error: Error | unknown | null) => {
	return useMemo(() => {
		const defaultError = 'Oops! There was an error.';
		if (axios.isAxiosError(error)) {
			return error?.response ? error.response.data?.error : defaultError;
		} else {
			return defaultError;
		}
	}, [error]);
};

export const useAxiosErrorStatus = (error: Error | null) => {
	return useMemo(() => {
		if (axios.isAxiosError(error)) {
			return error?.response ? error.response?.status : null;
		} else return null;
	}, [error]);
};

export const isAxiosError = (error: unknown): error is AxiosError =>
	axios.isAxiosError(error);

export const useMutationError = (error: unknown, cb: (message: string) => void) => {
	return useMemo(() => {
		if (isAxiosError(error)) {
			const errorMessage = useAxiosErrorMessage(error);
			return cb(errorMessage);
		} else return cb(defaultErrorMessage);
	}, [error]);
};

export const useMutationErrors = () => {
	const [serverError, setServerError] = useState(initialErrorState);

	const updateAxiosError = (error: unknown) => {
		if (isAxiosError(error)) {
			const message = useAxiosErrorMessage(error);
			setServerError({ error: true, message });
		} else setServerError({ error: true, message: defaultErrorMessage });
	};

	const setAxiosError = (message: string) => setServerError({ error: true, message });

	const resetAxiosError = () => setServerError(initialErrorState);

	return { serverError, updateAxiosError, setAxiosError, resetAxiosError };
};

// defaults
const defaultErrorMessage =
	'There was an error handling your request at this time. Contact support if this continues.';
const initialErrorState = { error: false, message: '' };
