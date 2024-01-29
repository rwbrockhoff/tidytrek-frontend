import { Grid } from 'semantic-ui-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	useRequestResetPasswordMutation,
	useConfirmResetPasswordMutation,
} from '../../redux/user/userApiSlice';
import ResetPasswordForm from '../../components/Authentication/ResetPasswordForm/ResetPasswordForm';
import { validEmail, validPassword } from '../Authentication/authHelper';
import { useFormErrorInfo } from '../Authentication/useFormErrorInfo';
import { setFormInput } from '../../shared/formHelpers';
import { ReactInput } from '../../types/generalTypes';

const ResetPassword = () => {
	const { resetToken } = useParams();

	const [resetPassword, requestPassData] = useRequestResetPasswordMutation();

	const [confirmResetPassword, confirmPassData] = useConfirmResetPasswordMutation();

	const requestPassStatus = {
		isError: requestPassData.isError,
		error: requestPassData.error,
	};
	const confirmPassStatus = {
		isError: confirmPassData.isError,
		error: confirmPassData.error,
	};

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [formError, setFormError] = useState({
		error: false,
		message: '',
	});

	const handleFormChange = (e: ReactInput) => setFormInput(e, setFormData);

	const handleResetPasswordRequest = () => {
		if (validEmail(formData.email)) {
			resetPassword(formData.email);
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
		confirmResetPassword({ password, confirmPassword, resetToken });
		setFormData({
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	const { error, message } = useFormErrorInfo(
		formError,
		requestPassStatus,
		confirmPassStatus,
	);

	const { isLoading: isLoadingRequest, isSuccess: isSuccessRequest } = requestPassData;
	const { isLoading: isLoadingConfirmPass, isSuccess: isSuccessConfirmPass } =
		confirmPassData;
	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<ResetPasswordForm
				formData={formData}
				hasResetToken={resetToken ? true : false}
				isLoading={isLoadingRequest || isLoadingConfirmPass}
				isSuccess={isSuccessRequest || isSuccessConfirmPass}
				formError={error}
				formErrorMessage={message}
				onFormChange={handleFormChange}
				onResetRequest={handleResetPasswordRequest}
				onResetConfirm={handleConfirmPasswordReset}
			/>
		</Grid>
	);
};

export default ResetPassword;
