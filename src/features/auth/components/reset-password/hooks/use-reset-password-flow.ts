import { type ResetPasswordData } from '@/features/auth/types/auth-types';
import {
	useResetPasswordRequestMutation,
	useResetPasswordConfirmMutation,
} from '@/queries/user-queries';
import { useZodError } from '@/hooks/form/use-zod-error';
import { extractErrorMessage } from '@/utils/error-utils';
import { resetRequestSchema, resetConfirmSchema } from '../../../schemas/auth-schemas';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useResetPasswordFlow = () => {
	const navigate = useNavigate();
	const resetRequestMutation = useResetPasswordRequestMutation();
	const resetConfirmMutation = useResetPasswordConfirmMutation();
	const [emailSent, setEmailSent] = useState(false);

	const { formErrors, updateFormErrors, resetFormErrors, resetAllFormErrors } =
		useZodError<ResetPasswordData>(['email', 'password', 'confirmPassword']);

	const handleResetRequest = (
		formData: ResetPasswordData,
		setAxiosError: (error: string) => void,
	) => {
		const schemaData = resetRequestSchema.safeParse(formData);
		if (!schemaData.success) {
			updateFormErrors(schemaData.error.issues);
			return;
		}

		// Send reset email
		resetRequestMutation.mutate(formData.email, {
			onSuccess: () => setEmailSent(true),
			onError: (error) => setAxiosError(extractErrorMessage(error)),
		});
	};

	const handleResetConfirm = (
		formData: ResetPasswordData,
		setAxiosError: (error: string) => void,
	) => {
		const schemaData = resetConfirmSchema.safeParse(formData);
		if (!schemaData.success) {
			updateFormErrors(schemaData.error.issues);
			return;
		}

		// Update password
		resetConfirmMutation.mutate(formData.password, {
			onSuccess: () => {
				navigate('/reset-password/success', { viewTransition: true });
			},
			onError: (error) => setAxiosError(extractErrorMessage(error)),
		});
	};

	const isLoading = resetRequestMutation.isPending || resetConfirmMutation.isPending;

	return {
		emailSent,
		isLoading,
		formErrors,
		handleResetRequest,
		handleResetConfirm,
		resetFormErrors,
		resetAllFormErrors,
	};
};
