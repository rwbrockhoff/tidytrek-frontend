import { RegisterForm } from '../components/register/register-form';
import { useRegisterFlow } from '../components/register/hooks/use-register-flow';
import { useMutationErrors } from '@/hooks/form/use-axios-error';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { type RegisterUserFormData } from '@/types/user-types';

export const Register = () => {
	const { pathname } = useLocation();
	const registerFlow = useRegisterFlow();
	const { serverError, setAxiosError, resetAxiosError } = useMutationErrors();

	// Clear the state when route changes
	useEffect(() => {
		registerFlow.resetAllFormErrors();
		registerFlow.resetRegister();
		if (serverError.error) resetAxiosError();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const handleRegister = (formData: RegisterUserFormData) => {
		registerFlow.handleRegister(formData, setAxiosError);
	};

	return (
		<RegisterForm
			isLoading={registerFlow.registerData.isPending}
			isRegisterSuccess={registerFlow.isRegisterSuccess}
			formErrors={registerFlow.formErrors}
			serverError={serverError}
			onSubmit={handleRegister}
			resetFormErrors={registerFlow.resetFormErrors}
			updateServerError={setAxiosError}
		/>
	);
};
