import { Grid } from 'semantic-ui-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	useRequestResetPasswordMutation,
	useConfirmResetPasswordMutation,
} from '../../queries/userQueries';
import ResetPasswordForm from '../../components/Authentication/ResetPasswordForm/ResetPasswordForm';
import { validEmail, validPassword } from '../Authentication/authHelper';
import { useCombineErrors, type MutationError } from '../Authentication/useCombineErrors';
import {
	useCombinePendingStatus,
	type MutationPending,
} from '../Authentication/useCombinePendingStatus';
import {
	useCombineSuccess,
	type MutationSuccess,
} from '../Authentication/useComineSuccess';
import { setFormInput } from '../../shared/formHelpers';
import { ReactInput } from '../../types/generalTypes';

const ResetPassword = () => {
	const { resetToken } = useParams();

	const requestPassData = useRequestResetPasswordMutation();
	const confirmPassData = useConfirmResetPasswordMutation();

	const [formError, setFormError] = useCombineErrors([
		requestPassData as MutationError,
		confirmPassData as MutationError,
	]);

	const isPending = useCombinePendingStatus([
		requestPassData as MutationPending,
		confirmPassData as MutationPending,
	]);

	const isSuccess = useCombineSuccess([
		requestPassData as MutationSuccess,
		confirmPassData as MutationSuccess,
	]);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleFormChange = (e: ReactInput) => setFormInput(e, setFormData);

	const handleResetPasswordRequest = () => {
		if (validEmail(formData.email)) {
			requestPassData.mutate(formData.email);
			setFormData((prevState) => ({ ...prevState, email: '' }));
		} else setFormError({ error: true, message: 'Invalid email format.' });
	};

	const handleConfirmPasswordReset = () => {
		const { password, confirmPassword } = formData;
		if (password !== confirmPassword) {
			return setFormError({
				error: true,
				message: "Passwords didn't match. Try again.",
			});
		}
		if (!validPassword(password)) {
			return setFormError({
				error: true,
				message:
					'Password should have at least 8 characters, contain one uppercase, and one number.',
			});
		}
		if (resetToken) {
			confirmPassData.mutate({ password, confirmPassword, resetToken });
			setFormData({
				email: '',
				password: '',
				confirmPassword: '',
			});
		}
	};

	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<ResetPasswordForm
				formData={formData}
				hasResetToken={resetToken ? true : false}
				isLoading={isPending}
				isSuccess={isSuccess}
				formError={formError.error}
				formErrorMessage={formError.message}
				onFormChange={handleFormChange}
				onResetRequest={handleResetPasswordRequest}
				onResetConfirm={handleConfirmPasswordReset}
			/>
		</Grid>
	);
};

export default ResetPassword;
