import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const generalErrorMessage = 'There was an unexpected error. Contact support if needed.';

type UseGoogleAuthNavigationProps = {
	isRegisterSuccess: boolean;
	isRegisterError: boolean;
	isLoginSuccess: boolean;
	isLoginError: boolean;
	loginData: any;
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
		// subscribe to login changes
		if (isLoginSuccess && loginData) {
			if (loginData.newUser) navigate('/welcome');
		}
		if (isLoginError) updateServerError(generalErrorMessage);
	}, [isLoginSuccess, loginData, isLoginError, navigate, updateServerError]);
};
