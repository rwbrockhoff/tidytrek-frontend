import { AxiosError } from 'axios';
import { ZodError } from 'zod';

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
		const data = error.response?.data;

		// Handle API validation errors
		const validationErrors = extractValidationErrors(data);
		if (validationErrors) {
			return validationErrors[0]?.message || defaultMessage;
		}

		// Handle general API errors
		const apiError = data as APIErrorResponse;
		return apiError?.error?.message || defaultMessage;
	}

	// Handle frontend validation errors
	const validationErrors = extractValidationErrors(error);
	if (validationErrors) {
		return validationErrors[0]?.message || defaultMessage;
	}

	// Handle other generic error types
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

export function extractValidationErrors(error: unknown) {
	if (error instanceof ZodError) {
		return error.issues;
	}
	return null;
}
