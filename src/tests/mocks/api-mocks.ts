import { AxiosError, AxiosResponse } from 'axios';

// Mock AxiosError for testing error responses
export const createMockAxiosError = (
	status?: number,
	errorMessage?: string,
): AxiosError => {
	const error = new Error('Network Error') as AxiosError;
	error.isAxiosError = true;
	error.response = {
		status: status || 500,
		data: {
			success: false,
			error: {
				message: errorMessage || 'Server error',
			},
		},
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

// Generate mock for successful API responses
export const createMockApiResponse = <T>(data: T, message?: string): AxiosResponse => ({
	data: {
		success: true,
		data,
		message,
	},
	status: 200,
	statusText: 'OK',
	headers: {},
	config: {} as never,
});
