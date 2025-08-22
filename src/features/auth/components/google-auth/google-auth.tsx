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
		<Flex className="justify-center w-full mb-2" style={{ height: '40px' }}>
			<div ref={google_button} style={{ width: '240px', height: '40px' }} />
		</Flex>
	);
};
