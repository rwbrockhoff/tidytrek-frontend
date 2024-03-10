import axios, { AxiosError } from 'axios';

// return nested axios error or a default error message
export const useAxiosErrorMessage = (error: Error | null) => {
	const defaultError = 'Oops! There was an error.';
	if (axios.isAxiosError(error)) {
		return error?.response ? error.response.data?.error : defaultError;
	} else {
		return defaultError;
	}
};

export const useAxiosErrorStatus = (error: Error | null) => {
	if (axios.isAxiosError(error)) {
		return error?.response ? error.response?.status : null;
	} else return null;
};

export const isAxiosError = (error: unknown): error is AxiosError =>
	axios.isAxiosError(error);
