import { LoginForm } from '../components/login/login-form';
import { RegisterForm } from '../components/register/register-form';
import { useRegisterFlow } from '../hooks/use-register-flow';
import { useLoginFlow } from '../hooks/use-login-flow';
import { useMutationErrors } from '@/hooks/form/use-axios-error';
import { useCombineErrors, type MutationError } from '../hooks/use-combine-errors';
import {
	useCombinePendingStatus,
	type MutationPending,
} from '../hooks/use-combine-status';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Authentication = ({ isRegisterForm }: { isRegisterForm: boolean }) => {
	const { pathname } = useLocation();
	const registerFlow = useRegisterFlow();
	const loginFlow = useLoginFlow();
	const { serverError, updateAxiosError, resetAxiosError, setAxiosError } =
		useMutationErrors();

	const [formError] = useCombineErrors([
		registerFlow.registerData as MutationError,
		loginFlow.loginData as MutationError,
	]);

	const isPending = useCombinePendingStatus([
		registerFlow.registerData as MutationPending,
		loginFlow.loginData as MutationPending,
	]);

	// Clear state when route changes (login/register)
	useEffect(() => {
		registerFlow.resetAllFormErrors();
		loginFlow.resetAllFormErrors();
		if (serverError.error) resetAxiosError();
		registerFlow.resetRegister();
		loginFlow.resetLogin();
	}, [pathname]);

	// Subscribe to query errors
	useEffect(() => {
		if (formError.error) {
			updateAxiosError(formError.message);
		}
	}, [formError.error, formError.message, updateAxiosError]);

	const handleRegister = (formData: any) =>
		registerFlow.handleRegister(formData, setAxiosError);
	const handleLogin = (formData: any) => loginFlow.handleLogin(formData, setAxiosError);

	if (isRegisterForm) {
		return (
			<RegisterForm
				isLoading={isPending}
				isRegisterSuccess={registerFlow.isRegisterSuccess}
				formErrors={registerFlow.formErrors}
				serverError={serverError}
				onSubmit={handleRegister}
				resetFormErrors={registerFlow.resetFormErrors}
				updateServerError={setAxiosError}
			/>
		);
	}

	return (
		<LoginForm
			isLoading={isPending}
			formErrors={loginFlow.formErrors}
			serverError={serverError}
			onSubmit={handleLogin}
			resetFormErrors={loginFlow.resetFormErrors}
			updateServerError={setAxiosError}
		/>
	);
};
