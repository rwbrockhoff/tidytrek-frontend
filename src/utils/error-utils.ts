import { AxiosError } from 'axios';

type APIErrorResponse = {
	success: boolean;
	error: {
		message: string;
		code?: string;
		details?: unknown;
	};
};

// Centralized extraction of error messages from server/axios
// to make it easier to cleanly get/display errors in UI

export function extractErrorMessage(error: unknown): string {
	const defaultMessage = 'An error occurred. Please try again.';

	if (!error) return defaultMessage;

	if (isAxiosError(error)) {
		const data = error.response?.data as APIErrorResponse;
		return data?.error?.message || defaultMessage;
	}

	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === 'string') {
		return error;
	}

	return defaultMessage;
}

export function isAxiosError(error: unknown): error is AxiosError {
	return error instanceof Error && 'response' in error && 'request' in error;
}

export function getErrorStatus(error: unknown): number | null {
	if (!isAxiosError(error)) return null;
	return error.response?.status || null;
}
