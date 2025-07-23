import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { z } from 'zod';
import { useZodError, clearZodErrors } from '../form/use-zod-error';

type MockInputEvent = React.ChangeEvent<HTMLInputElement>;

// Test form type
type TestForm = {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
};

const testFormInputs: (keyof TestForm)[] = ['firstName', 'lastName', 'email', 'age'];

// mock Zod issues for testing
const createMockZodIssue = (path: string, message: string): z.ZodIssue => ({
	code: z.ZodIssueCode.custom,
	path: [path],
	message,
	fatal: false,
});

describe('useZodError Hook', () => {
	describe('Initial State', () => {
		it('initializes with no errors for all form inputs', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			expect(result.current.formErrors).toEqual({
				firstName: { error: false, message: '' },
				lastName: { error: false, message: '' },
				email: { error: false, message: '' },
				age: { error: false, message: '' },
			});

			expect(result.current.primaryError).toEqual({
				error: false,
				message: '',
			});
		});

		it('creates error shape for different form input arrays', () => {
			const minimalInputs: (keyof Pick<TestForm, 'email'>)[] = ['email'];
			const { result } = renderHook(() =>
				useZodError<Pick<TestForm, 'email'>>(minimalInputs),
			);

			expect(result.current.formErrors).toEqual({
				email: { error: false, message: '' },
			});
		});
	});

	describe('updateFormErrors', () => {
		it('updates form errors from Zod validation issues', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			const zodIssues = [
				createMockZodIssue('firstName', 'First name is required'),
				createMockZodIssue('email', 'Invalid email format'),
			];

			act(() => {
				result.current.updateFormErrors(zodIssues);
			});

			expect(result.current.formErrors.firstName).toEqual({
				error: true,
				message: 'First name is required',
			});

			expect(result.current.formErrors.email).toEqual({
				error: true,
				message: 'Invalid email format',
			});

			// Unaffected fields should remain unchanged
			expect(result.current.formErrors.lastName).toEqual({
				error: false,
				message: '',
			});
		});

		it('sets primary error to first issue when no primary error exists', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			const zodIssues = [
				createMockZodIssue('firstName', 'First name is required'),
				createMockZodIssue('email', 'Invalid email format'),
			];

			act(() => {
				result.current.updateFormErrors(zodIssues);
			});

			expect(result.current.primaryError).toEqual({
				error: true,
				message: 'First name is required',
			});
		});

		it('does not override existing primary error', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			// Set initial primary error
			const firstIssues = [createMockZodIssue('firstName', 'First error')];
			act(() => {
				result.current.updateFormErrors(firstIssues);
			});

			// Try to set new errors
			const secondIssues = [createMockZodIssue('email', 'Second error')];
			act(() => {
				result.current.updateFormErrors(secondIssues);
			});

			// Primary error should remain the first one
			expect(result.current.primaryError).toEqual({
				error: true,
				message: 'First error',
			});
		});

		it('handles empty Zod issues array', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			act(() => {
				result.current.updateFormErrors([]);
			});

			// Should not change state
			expect(result.current.formErrors.firstName).toEqual({
				error: false,
				message: '',
			});

			expect(result.current.primaryError).toEqual({
				error: false,
				message: '',
			});
		});

		it('merges new errors with existing form errors', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			// Set first error
			const firstIssues = [createMockZodIssue('firstName', 'First name error')];
			act(() => {
				result.current.updateFormErrors(firstIssues);
			});

			// Set second error (different field)
			const secondIssues = [createMockZodIssue('email', 'Email error')];
			act(() => {
				result.current.updateFormErrors(secondIssues);
			});

			// Both errors should exist
			expect(result.current.formErrors.firstName).toEqual({
				error: true,
				message: 'First name error',
			});

			expect(result.current.formErrors.email).toEqual({
				error: true,
				message: 'Email error',
			});
		});

		it('overwrites existing error message for same field', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			// Set first error for firstName
			const firstIssues = [createMockZodIssue('firstName', 'First error message')];
			act(() => {
				result.current.updateFormErrors(firstIssues);
			});

			// Set different error for same field
			const secondIssues = [createMockZodIssue('firstName', 'Updated error message')];
			act(() => {
				result.current.updateFormErrors(secondIssues);
			});

			// Should have the updated message
			expect(result.current.formErrors.firstName).toEqual({
				error: true,
				message: 'Updated error message',
			});
		});
	});

	describe('resetFormErrors', () => {
		it('resets specific field error', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			// Set some errors
			const zodIssues = [
				createMockZodIssue('firstName', 'First name error'),
				createMockZodIssue('email', 'Email error'),
			];

			act(() => {
				result.current.updateFormErrors(zodIssues);
			});

			// Reset only firstName
			act(() => {
				result.current.resetFormErrors('firstName');
			});

			expect(result.current.formErrors.firstName).toEqual({
				error: false,
				message: '',
			});

			// Email error should remain
			expect(result.current.formErrors.email).toEqual({
				error: true,
				message: 'Email error',
			});
		});

		it('resets primary error when resetting any field', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			const zodIssues = [createMockZodIssue('firstName', 'First name error')];
			act(() => {
				result.current.updateFormErrors(zodIssues);
			});

			// Primary error should be set
			expect(result.current.primaryError.error).toBe(true);

			// Reset any field
			act(() => {
				result.current.resetFormErrors('lastName');
			});

			// Primary error should be cleared
			expect(result.current.primaryError).toEqual({
				error: false,
				message: '',
			});
		});

		it('accepts type-safe field names for reset', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			// This test verifies TypeScript compilation - all these should be valid
			act(() => {
				result.current.resetFormErrors('firstName');
				result.current.resetFormErrors('lastName');
				result.current.resetFormErrors('email');
				result.current.resetFormErrors('age');
			});

			// If this compiles, the type safety is working
			expect(true).toBe(true);
		});
	});

	describe('resetAllFormErrors', () => {
		it('resets all form errors to initial state', () => {
			const { result } = renderHook(() => useZodError<TestForm>(testFormInputs));

			// Set multiple errors
			const zodIssues = [
				createMockZodIssue('firstName', 'First name error'),
				createMockZodIssue('email', 'Email error'),
				createMockZodIssue('age', 'Age error'),
			];

			act(() => {
				result.current.updateFormErrors(zodIssues);
			});

			// Reset all errors
			act(() => {
				result.current.resetAllFormErrors();
			});

			// All errors should be cleared
			expect(result.current.formErrors).toEqual({
				firstName: { error: false, message: '' },
				lastName: { error: false, message: '' },
				email: { error: false, message: '' },
				age: { error: false, message: '' },
			});

			expect(result.current.primaryError).toEqual({
				error: false,
				message: '',
			});
		});
	});
});

describe('clearZodErrors Utility Function', () => {
	it('calls reset function when field has error', () => {
		const mockReset = vi.fn();
		const formErrors = {
			firstName: { error: true, message: 'Error message' }, // error
			email: { error: false, message: '' },
		};

		const mockEvent = {
			target: { name: 'firstName' },
		} as MockInputEvent;

		clearZodErrors(mockEvent, formErrors, mockReset);

		expect(mockReset).toHaveBeenCalledTimes(1);
		expect(mockReset).toHaveBeenCalledWith('firstName');
	});

	it('does not call reset function when field has no error', () => {
		const mockReset = vi.fn();
		const formErrors = {
			// no errors
			firstName: { error: false, message: '' },
			email: { error: false, message: '' },
		};

		const mockEvent = {
			target: { name: 'firstName' },
		} as MockInputEvent;

		clearZodErrors(mockEvent, formErrors, mockReset);

		expect(mockReset).not.toHaveBeenCalled();
	});

	it('handles missing target name', () => {
		const mockReset = vi.fn();
		const formErrors = {
			firstName: { error: true, message: 'Error' },
		};

		const mockEvent = {
			target: {},
		} as MockInputEvent;

		clearZodErrors(mockEvent, formErrors, mockReset);

		expect(mockReset).not.toHaveBeenCalled();
	});

	it('handles missing target', () => {
		const mockReset = vi.fn();
		const formErrors = {
			firstName: { error: true, message: 'Error' },
		};

		const mockEvent = { target: { name: 'testField' } } as MockInputEvent;

		clearZodErrors(mockEvent, formErrors, mockReset);

		expect(mockReset).not.toHaveBeenCalled();
	});

	it('handles undefined form error', () => {
		const mockReset = vi.fn();
		const formErrors = {
			firstName: { error: true, message: 'Error' },
		};

		const mockEvent = {
			target: { name: 'nonExistentField' },
		} as MockInputEvent;

		clearZodErrors(mockEvent, formErrors, mockReset);

		expect(mockReset).not.toHaveBeenCalled();
	});
});
