import { FormError, TextAreaEvent, InputEvent, SelectEvent } from '@/types/form-types';
import { useState } from 'react';
import { z } from 'zod';

export type ZodFormErrors<T> = { [Property in keyof T]: FormError };

export function useZodError<T>(formInputs: (keyof T)[]) {
	const mappedInputs = createFormErrorShape<T>(formInputs);
	const [formErrors, setFormErrors] = useState(mappedInputs);
	const [primaryError, setPrimaryError] = useState<FormError>({
		error: false,
		message: '',
	});

	const updateFormErrors = (result: z.ZodIssue[]) => {
		let errorObject: ZodFormErrors<T> = result.reduce((acc, error: z.ZodIssue) => {
			const name = error.path[0] as keyof T;
			const message = error.message;
			return { ...acc, [name]: { error: true, message } };
		}, {} as ZodFormErrors<T>);

		setFormErrors((prev) => ({ ...prev, ...errorObject }));

		if (!primaryError.error && result.length >= 1) {
			setPrimaryError({ error: true, message: result[0].message });
		}
	};

	const resetFormErrors = (inputName: string) => {
		setFormErrors((prev) => ({
			...prev,
			...{ [inputName]: { error: false, message: '' } },
		}));
		setPrimaryError({ error: false, message: '' });
	};

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

function createFormErrorShape<T>(formInputs: (keyof T)[]) {
	const errorObject: ZodFormErrors<T> = formInputs.reduce((acc, inputName) => {
		acc[inputName] = { error: false, message: '' };
		return acc;
	}, {} as ZodFormErrors<T>);

	return errorObject;
}

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
