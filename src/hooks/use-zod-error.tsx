import { FormError, TextAreaEvent, InputEvent, SelectEvent } from '@/types/form-types';
import { useState } from 'react';
import { z } from 'zod';

export type ZodFormErrors<T> = { [Property in keyof T]: FormError };

export function useZodError<T>(formInputs: (keyof T)[]) {
	// create typed state object for each input
	const mappedInputs = createFormErrorShape<T>(formInputs);

	// assign mapped input errors as initial state
	const [formErrors, setFormErrors] = useState(mappedInputs);
	// default primary error
	const [primaryError, setPrimaryError] = useState<FormError>({
		error: false,
		message: '',
	});

	// update formErrors based on array of Zod Issues
	const updateFormErrors = (result: z.ZodIssue[]) => {
		// create typed error object with ZodIssue(s)
		let errorObject: ZodFormErrors<T> = result.reduce((acc, error: z.ZodIssue) => {
			// get input name (firstName, email, etc) + error
			const name = error.path[0] as keyof T;
			const message = error.message;
			// update error object
			return { ...acc, [name]: { error: true, message } };
		}, {} as ZodFormErrors<T>);

		setFormErrors((prev) => ({ ...prev, ...errorObject }));

		// if no primary error, and multiple errors passed, set first error as primary
		if (!primaryError.error && result.length >= 1) {
			setPrimaryError({ error: true, message: result[0].message });
		}
	};

	// Reset individual error
	const resetFormErrors = (inputName: string) => {
		setFormErrors((prev) => ({
			...prev,
			...{ [inputName]: { error: false, message: '' } },
		}));
		setPrimaryError({ error: false, message: '' });
	};

	// Reset all form errors
	const resetAllFormErrors = () => {
		setFormErrors(createFormErrorShape<T>(formInputs));
		setPrimaryError({ error: false, message: '' });
	};

	return {
		formErrors,
		updateFormErrors,
		resetFormErrors,
		resetAllFormErrors,
		primaryError,
	};
}

// Return formatted/typed error object with provided formInputs
function createFormErrorShape<T>(formInputs: (keyof T)[]) {
	const errorObject: ZodFormErrors<T> = formInputs.reduce((acc, inputName) => {
		acc[inputName] = { error: false, message: '' };
		return acc;
	}, {} as ZodFormErrors<T>);

	return errorObject;
}

// Clear field error when user starts typing (onChange handler)
// Provides immediate feedback that user is addressing the validation issue
export function clearZodErrors<T>(
	e: InputEvent | TextAreaEvent | SelectEvent,
	formErrors: Record<keyof T, FormError>,
	reset: (property: keyof T) => void,
) {
	if (e.target && 'name' in e.target) {
		const propertyName = e.target.name as keyof T;
		const hasError = formErrors[propertyName]?.error;
		if (hasError) reset(propertyName);
	}
}
