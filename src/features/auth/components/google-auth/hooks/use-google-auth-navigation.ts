import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginResponse = {
	newUser?: boolean;
	message?: string;
};

const generalErrorMessage = 'There was an unexpected error. Contact support if needed.';

type UseGoogleAuthNavigationProps = {
	isRegisterSuccess: boolean;
	isRegisterError: boolean;
	isLoginSuccess: boolean;
	isLoginError: boolean;
	loginData: LoginResponse | undefined;
	updateServerError: (message: string) => void;
};

export const useGoogleAuthNavigation = ({
	isRegisterSuccess,
	isRegisterError,
	isLoginSuccess,
	isLoginError,
	loginData,
	updateServerError,
}: UseGoogleAuthNavigationProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		// subscribe to register changes
		if (isRegisterSuccess) navigate('/welcome');

		if (isRegisterError) updateServerError(generalErrorMessage);
	}, [isRegisterSuccess, isRegisterError, navigate, updateServerError]);

	useEffect(() => {
		// subscribe to new user event
		if (isLoginSuccess && loginData && loginData.newUser) {
			navigate('/welcome');
		}
		if (isLoginError) updateServerError(generalErrorMessage);
	}, [isLoginSuccess, loginData, isLoginError, navigate, updateServerError]);
};
