import { Flex } from '@/components/layout';
import { useGoogleOAuth } from './hooks/use-google-oauth';
import { useGoogleAuthFlow } from './hooks/use-google-auth-flow';

type GoogleAuthProps = {
	authMethod: 'signup' | 'signin';
	updateServerError: (message: string) => void;
};

export const GoogleAuth = (props: GoogleAuthProps) => {
	const { authMethod, updateServerError } = props;

	const { handleGoogleAuth } = useGoogleAuthFlow({ authMethod, updateServerError });

	const { google_button } = useGoogleOAuth({ onGoogleAuth: handleGoogleAuth });

	return (
		<Flex className="justify-center w-full h-8 mb-2">
			<div ref={google_button} />
		</Flex>
	);
};
