import { type FormErrors as FormErrorsType } from '@/features/auth/types/auth-types';
import { useState } from 'react';
import { z } from 'zod';

export const useZodError = (formInputs: string[]) => {
	const mappedInputs = createFormErrorShape(formInputs);
	const [formErrors, setFormErrors] = useState<FormErrorsType>(mappedInputs);

	const updateFormErrors = (result: z.ZodIssue[]) => {
		let errorObject: FormErrorsType = {};
		result.map((error: z.ZodIssue) => {
			const name = error.path[0];
			const message = error.message;
			errorObject[name] = { error: true, message };
		});
		setFormErrors((prev) => ({ ...prev, ...errorObject }));
	};

	const resetFormErrors = (inputName: string) => {
		setFormErrors((prev) => ({
			...prev,
			...{ [inputName]: { error: false, message: '' } },
		}));
	};

	return { formErrors, updateFormErrors, resetFormErrors };
};

const createFormErrorShape = (formInputs: string[]) => {
	let errorObject: FormErrorsType = {};
	formInputs.map((inputName) => (errorObject[inputName] = { error: false, message: '' }));
	return errorObject;
};
