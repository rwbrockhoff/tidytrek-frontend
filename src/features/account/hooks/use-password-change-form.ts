import { useRef } from 'react';
import {
	type InputEvent,
	type TextAreaEvent,
	type PasswordInfo,
} from '@/types/form-types';
import { z } from 'zod';
import { passwordSchema } from '@/schemas/auth-schemas';
import { useZodError, clearZodErrors } from '@/hooks/form/use-zod-error';

type ZodInputs = {
	password: string;
	confirmPassword: string;
	emailCode: string;
};

const changePasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: passwordSchema,
		emailCode: z.string().min(6, { message: 'Invalid confirmation code.' }),
	})
	.refine((data: ZodInputs) => data.password === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

export const usePasswordChangeForm = () => {
	const formRef = useRef<HTMLFormElement | null>(null);

	const { formErrors, updateFormErrors, resetFormErrors } = useZodError<ZodInputs>([
		'password',
		'confirmPassword',
		'emailCode',
	]);

	const validateForm = (
		formData: FormData,
	): { isValid: boolean; data?: PasswordInfo } => {
		const data = Object.fromEntries(formData) as PasswordInfo;
		const schemaData = changePasswordSchema.safeParse(data);

		if (!schemaData.success) {
			const errorList = JSON.parse(schemaData.error.message);
			updateFormErrors(errorList);
			return { isValid: false };
		}

		return { isValid: true, data };
	};

	const handleClearErrors = (e: InputEvent | TextAreaEvent) => {
		clearZodErrors<ZodInputs>(e, formErrors, resetFormErrors);
	};

	const resetForm = () => {
		formRef?.current && formRef.current.reset();
	};

	return {
		formRef,
		formErrors,
		validateForm,
		handleClearErrors,
		resetForm,
	};
};
