import { FormError, TextAreaEvent, InputEvent } from '@/types/form-types';
import { useState } from 'react';
import { z } from 'zod';

export type ZodFormErrors<T> = { [Property in keyof T]: FormError };

export function useZodError<T>(formInputs: (keyof T)[]) {
	const mappedInputs = createFormErrorShape<T>(formInputs);
	const [formErrors, setFormErrors] = useState(mappedInputs);

	const updateFormErrors = (result: z.ZodIssue[]) => {
		let errorObject: ZodFormErrors<T> = result.reduce((acc, error: z.ZodIssue) => {
			const name = error.path[0] as keyof T;
			const message = error.message;
			return { ...acc, [name]: { error: true, message } };
		}, {} as ZodFormErrors<T>);

		setFormErrors((prev) => ({ ...prev, ...errorObject }));
	};

	const resetFormErrors = (inputName: string) => {
		setFormErrors((prev) => ({
			...prev,
			...{ [inputName]: { error: false, message: '' } },
		}));
	};

	return { formErrors, updateFormErrors, resetFormErrors };
}

function createFormErrorShape<T>(formInputs: (keyof T)[]) {
	const errorObject: ZodFormErrors<T> = formInputs.reduce((acc, inputName) => {
		acc[inputName] = { error: false, message: '' };
		return acc;
	}, {} as ZodFormErrors<T>);

	return errorObject;
}

export function clearZodErrors<T extends Record<keyof T, string>>(
	e: InputEvent | TextAreaEvent,
	formErrors: Record<keyof T, FormError>,
	reset: (property: keyof T) => void,
) {
	if (e.target && 'name' in e.target) {
		const propertyName = e.target.name as keyof T;
		const hasError = formErrors[propertyName]?.error;
		if (hasError) reset(propertyName);
	}
}
