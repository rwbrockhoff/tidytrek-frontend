import { LoginForm } from '../components/login/login-form';
import { useLoginFlow } from '../components/login/hooks/use-login-flow';
import { useMutationErrors } from '@/hooks/form/use-axios-error';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SplitAuthLayout } from '../components/shared/split-auth-layout';

export const Login = () => {
	const { pathname } = useLocation();
	const { serverError, setAxiosError, resetAxiosError } = useMutationErrors();
	const { loginMutation, formErrors, handleLogin, resetFormErrors, resetAllFormErrors } =
		useLoginFlow();

	useEffect(() => {
		resetAllFormErrors();
		loginMutation.reset();
		if (serverError.error) resetAxiosError();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<SplitAuthLayout>
			<LoginForm
				isLoading={loginMutation.isPending}
				formErrors={formErrors}
				serverError={serverError}
				onSubmit={(formData) => handleLogin(formData, setAxiosError)}
				resetFormErrors={resetFormErrors}
				updateServerError={setAxiosError}
			/>
		</SplitAuthLayout>
	);
};
