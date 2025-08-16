import axios, { AxiosError } from 'axios';
import { useMemo, useState, useCallback } from 'react';
import { extractErrorMessage } from '@/utils/error-utils';

// return nested axios error or a default error message
export const useAxiosErrorMessage = (error: Error | unknown | null) => {
	return useMemo(() => {
		return extractErrorMessage(error);
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
		const errorMessage = extractErrorMessage(error);
		return cb(errorMessage);
	}, [error, cb]);
};

export const useMutationErrors = () => {
	const [serverError, setServerError] = useState(initialErrorState);

	const updateAxiosError = useCallback((error: unknown) => {
		const message = extractErrorMessage(error);
		setServerError({ error: true, message });
	}, []);

	const setAxiosError = useCallback((message: string) => {
		setServerError({ error: true, message });
	}, []);

	const resetAxiosError = useCallback(() => {
		setServerError(initialErrorState);
	}, []);

	return { serverError, updateAxiosError, setAxiosError, resetAxiosError };
};

// defaults
// const defaultErrorMessage =
// 	'There was an error handling your request at this time. Contact support if this continues.';
const initialErrorState = { error: false, message: '' };
