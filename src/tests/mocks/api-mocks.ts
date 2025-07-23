import { AxiosError } from 'axios';

// Mock AxiosError for testing error responses
export const createMockAxiosError = (
	status?: number,
	errorMessage?: string,
): AxiosError => {
	const error = new Error('Network Error') as AxiosError;
	error.isAxiosError = true;
	error.response = {
		status: status || 500,
		data: { error: errorMessage || 'Server error' },
		statusText: 'Error',
		headers: {},
		config: {} as never,
	};
	return error;
};

// Common API error utils
export const createNotFoundError = () => createMockAxiosError(404, 'Resource not found');

export const createUnauthorizedError = () => createMockAxiosError(401, 'Unauthorized');

export const createServerError = (message = 'Internal server error') =>
	createMockAxiosError(500, message);
