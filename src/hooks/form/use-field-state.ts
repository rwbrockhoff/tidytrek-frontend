import { useState } from 'react';
import { type InputEvent, type FormError } from '@/types/form-types';
import { extractErrorMessage } from '@/utils/error-utils';

interface UseFieldStateOptions<T> {
	initialValue: T;
	validator?: (value: T) => boolean;
	resetOnSuccess?: () => void;
}

// Hook that manages an individual input's state, error handling, and reset
// Useful for small, encapsulated UI elements that need proper state management

export function useFieldState<T = string>({
	initialValue,
	validator,
	resetOnSuccess,
}: UseFieldStateOptions<T>) {
	const [value, setValue] = useState<T>(initialValue);
	const [validationError, setValidationError] = useState<FormError | null>(null);
	const [apiError, setApiError] = useState<FormError | null>(null);

	const handleChange = (e: InputEvent) => {
		const newValue = e.target.value as T;
		setValue(newValue);
		setValidationError(null);
		setApiError(null);
		if (resetOnSuccess) {
			resetOnSuccess();
		}
	};

	const validate = (valueToValidate?: T) => {
		const targetValue = valueToValidate ?? value;

		if (!validator) return true;

		try {
			const isValid = validator(targetValue);
			if (isValid) {
				setValidationError(null);
			}
			return isValid;
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			setValidationError({ error: true, message: errorMessage });
			return false;
		}
	};

	const setApiErrorFromResponse = (error: unknown) => {
		const errorMessage = extractErrorMessage(error);
		setApiError({ error: true, message: errorMessage });
	};

	const reset = () => {
		setValue(initialValue);
		setValidationError(null);
		setApiError(null);
	};

	const clearErrors = () => {
		setValidationError(null);
		setApiError(null);
	};

	return {
		value,
		setValue,
		validationError,
		apiError,
		handleChange,
		validate,
		setApiErrorFromResponse,
		reset,
		clearErrors,
	};
}
