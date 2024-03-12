import { type InputEvent } from '@/types/form-types';
import { useEffect, useState } from 'react';
import { ResetPasswordForm } from '../components/reset-password/reset-password-form';
import { validEmail, validPassword } from '@/features/auth/utils/auth-helpers';
import { setFormInput } from '@/utils';
import supabase from '@/api/supabaseClient';
import { frontendURL } from '@/api/tidytrekAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAuthStatusQuery, useLoginMutation } from '@/queries/user-queries';

export const ResetPassword = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { data } = useGetAuthStatusQuery();
	const { mutate: login } = useLoginMutation();

	const [formData, setFormData] = useState(initialState);
	const [formError, setFormError] = useState(initialErrorState);
	const [emailSent, setEmailSent] = useState(false);

	useEffect(() => {
		// subscribe to session change and log in user
		if (data?.isAuthenticated === false) {
			supabase.auth.getUser().then(({ data: { user } }) => {
				const { id, email } = user || {};
				if (id && email) login({ email, userId: id });
			});
		}
	}, []);

	const handleFormChange = (e: InputEvent) => {
		if (formError.error) setFormError(initialErrorState);
		setFormInput(e, setFormData);
	};

	const handleResetPasswordRequest = async () => {
		const { email } = formData;
		// handle invalid email
		if (!validEmail(email)) return handleError('Invalid email format.');
		// supabase send request
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${frontendURL}/reset-password/confirm`,
		});
		if (error)
			handleError('There was an error sending the request to your email at this time.');
		// reset form
		else {
			setFormData(initialState);
			setEmailSent(true);
		}
	};

	const handleError = (message: string) => setFormError({ error: true, message });

	const handleConfirmPasswordReset = async () => {
		const { password, confirmPassword } = formData;
		if (password !== confirmPassword) {
			return handleError("Passwords didn't match. Try again.");
		}
		if (!validPassword(password)) {
			return handleError(
				'Password should have at least 8 characters, contain one uppercase, and one number.',
			);
		}
		// call updateUser() with valid password
		const { error } = await supabase.auth.updateUser({ password });
		if (error) handleError('There was an error updating your password at this time.');
		else navigate('/reset-password/success');
	};

	const showPasswordView = location.pathname === '/reset-password/confirm';
	console.log('Show Pass ? ', showPasswordView);
	return (
		<ResetPasswordForm
			formData={formData}
			formError={formError}
			emailSent={emailSent}
			hasResetToken={showPasswordView}
			onFormChange={handleFormChange}
			onResetRequest={handleResetPasswordRequest}
			onResetConfirm={handleConfirmPasswordReset}
		/>
	);
};

// Defaults
const initialState = {
	email: '',
	password: '',
	confirmPassword: '',
};

const initialErrorState = {
	error: false,
	message: '',
};
