import { ResetPasswordForm } from '../components/reset-password/reset-password-form';
import { useLocation } from 'react-router-dom';
import { useMutationErrors } from '@/hooks/form/use-axios-error';
import { SplitAuthLayout } from '../components/shared/split-auth-layout';
import { useResetPasswordFlow } from '../components/reset-password/hooks/use-reset-password-flow';

export const ResetPassword = () => {
	const location = useLocation();
	const { serverError, setAxiosError, resetAxiosError } = useMutationErrors();

	const {
		emailSent,
		isLoading,
		formErrors,
		handleResetRequest,
		handleResetConfirm,
		resetFormErrors,
	} = useResetPasswordFlow();

	const handleClearErrors = (inputName?: string) => {
		resetFormErrors(inputName);
		if (serverError.error) resetAxiosError();
	};

	const showPasswordView = location.pathname === '/reset-password/confirm';

	return (
		<SplitAuthLayout>
			<ResetPasswordForm
				hasResetToken={showPasswordView}
				emailSent={emailSent}
				isLoading={isLoading}
				onResetRequest={(formData) => handleResetRequest(formData, setAxiosError)}
				onResetConfirm={(formData) => handleResetConfirm(formData, setAxiosError)}
				resetFormErrors={handleClearErrors}
				formErrors={formErrors}
				serverError={serverError}
			/>
		</SplitAuthLayout>
	);
};
