import { type ResetPasswordData } from '../types/auth-types';
import { useEffect, useState } from 'react';
import { ResetPasswordForm } from '../components/reset-password/reset-password-form';
import supabase from '@/api/supabaseClient';
import { frontendURL } from '@/api/tidytrekAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/queries/user-queries';
import { useGetAuth, useMutationErrors, useZodError } from '@/hooks';
import { z, emailSchema, passwordSchema } from '@/schemas';

export const ResetPassword = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { isAuthenticated } = useGetAuth();
	const { mutate: login } = useLoginMutation();
	const [emailSent, setEmailSent] = useState(false);

	const { formErrors, updateFormErrors, resetFormErrors } =
		useZodError<ResetPasswordData>(['email', 'password', 'confirmPassword']);

	const { serverError, updateAxiosError, resetAxiosError } = useMutationErrors();

	useEffect(() => {
		// Check for existing session
		if (isAuthenticated === false) {
			supabase.auth.getSession().then(({ data: { session } }) => {
				const user = session?.user;
				const { id, email } = user || {};
				if (id && email) login({ email, userId: id });
			});
		}
	}, []);

	const handleResetPasswordRequest = async (formData: ResetPasswordData) => {
		const data = emailRequestSchema.safeParse(formData);
		if (!data.success) {
			const result = JSON.parse(data.error.message);
			return updateFormErrors(result);
		}
		// send supabase request
		const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
			redirectTo: `${frontendURL}/reset-password/confirm`,
		});
		if (error) updateAxiosError(supabaseErrorMessage);
		// show success message
		else setEmailSent(true);
	};

	const handleConfirmPasswordReset = async (formData: ResetPasswordData) => {
		const data = passwordConfirmSchema.safeParse(formData);
		if (!data.success) {
			const result = JSON.parse(data.error.message);
			return updateFormErrors(result);
		}
		// call updateUser() with valid password
		const { password } = formData;
		const { error } = await supabase.auth.updateUser({ password });
		if (error) updateAxiosError(supabaseErrorMessage);
		else navigate('/reset-password/success');
	};

	const handleClearErrors = (inputName?: string) => {
		if (inputName) resetFormErrors(inputName);
		if (serverError.error) resetAxiosError();
	};

	const showPasswordView = location.pathname === '/reset-password/confirm';

	return (
		<ResetPasswordForm
			hasResetToken={showPasswordView}
			emailSent={emailSent}
			onResetRequest={handleResetPasswordRequest}
			onResetConfirm={handleConfirmPasswordReset}
			resetFormErrors={handleClearErrors}
			formErrors={formErrors}
			serverError={serverError}
		/>
	);
};

// Defaults
const supabaseErrorMessage = 'There was an error handling your request at this time.';

const emailRequestSchema = z.object({
	email: emailSchema,
});

const passwordConfirmSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});
