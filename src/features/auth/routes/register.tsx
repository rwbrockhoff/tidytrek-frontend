import { RegisterForm } from '../components/register/register-form';
import { useRegisterFlow } from '../components/register/hooks/use-register-flow';
import { useMutationErrors } from '@/hooks/form/use-axios-error';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SplitAuthLayout } from '../components/shared/split-auth-layout';
import { AuthFormLayout } from '../components/shared/auth-form-layout';
import { RegisterTerms } from '../components/shared/auth-footers';

export const Register = () => {
	const { pathname } = useLocation();
	const { serverError, setAxiosError, resetAxiosError } = useMutationErrors();
	const {
		registerMutation,
		formErrors,
		handleRegister,
		resetFormErrors,
		resetAllFormErrors,
	} = useRegisterFlow();

	useEffect(() => {
		resetAllFormErrors();
		registerMutation.reset();
		if (serverError.error) resetAxiosError();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<SplitAuthLayout>
			<AuthFormLayout
				title="Create your account"
				authMethod="signup"
				isRegister={true}
				serverError={serverError}
				updateServerError={setAxiosError}
				additionalContent={
					<div className="mt-2">
						<RegisterTerms />
					</div>
				}>
				<RegisterForm
					isLoading={registerMutation.isPending}
					isRegisterSuccess={registerMutation.isSuccess}
					formErrors={formErrors}
					serverError={serverError}
					onSubmit={(formData) => handleRegister(formData, setAxiosError)}
					resetFormErrors={resetFormErrors}
					updateServerError={setAxiosError}
				/>
			</AuthFormLayout>
		</SplitAuthLayout>
	);
};
