import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AxiosError } from 'axios';
import {
	useAxiosErrorMessage,
	useAxiosErrorStatus,
	isAxiosError,
	useMutationErrors,
} from '@/hooks/use-axios-error';

import axios from 'axios';

// Mock axios so we can control what isAxiosError returns
// This lets us test our hook logic without depending on the real axios function
// We mock both default and named exports to handle different import styles
vi.mock('axios', () => ({
	default: {
		isAxiosError: vi.fn(),
	},
	isAxiosError: vi.fn(),
}));

const mockIsAxiosError = vi.mocked(axios.isAxiosError);

const createMockAxiosError = (status: number, errorMessage: string): AxiosError => {
	const error = new Error('Network Error') as AxiosError;
	error.isAxiosError = true;
	error.response = {
		status,
		data: { error: errorMessage },
		statusText: 'Error',
		headers: {},
		config: {} as any,
	};
	return error;
};

describe('useAxiosErrorMessage', () => {
	it('should return default error message when error is null', () => {
		const { result } = renderHook(() => useAxiosErrorMessage(null));
		expect(result.current).toBe('Oops! There was an error.');
	});

	it('should return error message from axios when available', () => {
		const axiosError = createMockAxiosError(400, 'Bad request error');
		mockIsAxiosError.mockReturnValue(true);

		const { result } = renderHook(() => useAxiosErrorMessage(axiosError));
		expect(result.current).toBe('Bad request error');
	});

	it('should return default error for non-axios errors', () => {
		const regularError = new Error('Regular error');
		mockIsAxiosError.mockReturnValue(false);

		const { result } = renderHook(() => useAxiosErrorMessage(regularError));
		expect(result.current).toBe('Oops! There was an error.');
	});
});

describe('useAxiosErrorStatus', () => {
	it('should return null when error is null', () => {
		const { result } = renderHook(() => useAxiosErrorStatus(null));
		expect(result.current).toBeNull();
	});

	it('should return status code from axios response', () => {
		const axiosError = createMockAxiosError(404, 'Not found');
		mockIsAxiosError.mockReturnValue(true);

		const { result } = renderHook(() => useAxiosErrorStatus(axiosError));
		expect(result.current).toBe(404);
	});
});

describe('isAxiosError', () => {
	it('should correctly identify axios errors', () => {
		mockIsAxiosError.mockReturnValue(true);
		const axiosError = createMockAxiosError(500, 'Server error');

		expect(isAxiosError(axiosError)).toBe(true);

		mockIsAxiosError.mockReturnValue(false);
		expect(isAxiosError(new Error('Regular error'))).toBe(false);
	});
});

describe('useMutationErrors', () => {
	it('should initialize with empty error state', () => {
		const { result } = renderHook(() => useMutationErrors());

		expect(result.current.serverError).toEqual({
			error: false,
			message: '',
		});
	});

	it('should update error state with axios error', () => {
		const axiosError = createMockAxiosError(422, 'Validation failed');
		mockIsAxiosError.mockReturnValue(true);

		const { result } = renderHook(() => useMutationErrors());

		act(() => {
			result.current.updateAxiosError(axiosError);
		});

		expect(result.current.serverError).toEqual({
			error: true,
			message: 'Validation failed',
		});
	});

	it('should reset error state', () => {
		const { result } = renderHook(() => useMutationErrors());

		// Set an error first
		act(() => {
			result.current.setAxiosError('Test error');
		});

		expect(result.current.serverError.error).toBe(true);

		// Reset the error
		act(() => {
			result.current.resetAxiosError();
		});

		expect(result.current.serverError).toEqual({
			error: false,
			message: '',
		});
	});
});
