import { Flex } from '@radix-ui/themes';
import { useGoogleOAuth } from './hooks/use-google-oauth';
import { useGoogleAuthFlow } from './hooks/use-google-auth-flow';
import { useGoogleAuthNavigation } from './hooks/use-google-auth-navigation';

type GoogleAuthProps = {
	authMethod: 'signup' | 'signin';
	updateServerError: (message: string) => void;
};

export const GoogleAuth = (props: GoogleAuthProps) => {
	const { authMethod, updateServerError } = props;

	const {
		handleGoogleAuth,
		isRegisterSuccess,
		isRegisterError,
		isLoginSuccess,
		isLoginError,
		loginData,
	} = useGoogleAuthFlow({ authMethod, updateServerError });

	// Navigation logic (navigate on success)
	useGoogleAuthNavigation({
		isRegisterSuccess,
		isRegisterError,
		isLoginSuccess,
		isLoginError,
		loginData,
		updateServerError,
	});

	// Google OAuth configuration
	const { google_button } = useGoogleOAuth({ onGoogleAuth: handleGoogleAuth });

	return (
		<Flex justify="center" width="100%" height="8" mb="2">
			<div ref={google_button} />
		</Flex>
	);
};
