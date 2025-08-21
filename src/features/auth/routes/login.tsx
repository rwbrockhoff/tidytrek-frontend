import { LoginForm } from '../components/login/login-form';
import { useLoginFlow } from '../components/login/hooks/use-login-flow';
import { useMutationErrors } from '@/hooks/form/use-axios-error';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { type LoginUserFormData } from '@/types/user-types';

export const Login = () => {
	const { pathname } = useLocation();
	const loginFlow = useLoginFlow();
	const { serverError, setAxiosError, resetAxiosError } = useMutationErrors();

	// Clear state when route changes

	useEffect(() => {
		loginFlow.resetAllFormErrors();
		loginFlow.resetLogin();
		if (serverError.error) resetAxiosError();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const handleLogin = (formData: LoginUserFormData) => {
		loginFlow.handleLogin(formData, setAxiosError);
	};

	return (
		<LoginForm
			isLoading={loginFlow.loginData.isPending}
			formErrors={loginFlow.formErrors}
			serverError={serverError}
			onSubmit={handleLogin}
			resetFormErrors={loginFlow.resetFormErrors}
			updateServerError={setAxiosError}
		/>
	);
};
