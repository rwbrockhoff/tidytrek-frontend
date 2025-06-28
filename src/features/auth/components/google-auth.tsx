import { type Session, type User } from '@supabase/supabase-js';
import { useRef, useEffect } from 'react';
import supabase from '@/api/supabaseClient';
import { useRegisterMutation, useLoginMutation } from '@/queries/user-queries';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@radix-ui/themes';

// Google Identity Services API types
type GoogleAccounts = {
	id: {
		initialize: (config: {
			client_id: string;
			callback: (response: GoogleCredentialResponse) => void;
		}) => void;
		renderButton: (element: HTMLElement, options: GoogleButtonConfig) => void;
	};
};

type GoogleCredentialResponse = {
	credential?: string;
	error?: string;
};

type GoogleButtonConfig = {
	text?: 'continue_with' | 'signin_with' | 'signup_with';
	logo_alignment?: 'left' | 'center';
	size?: 'large' | 'medium' | 'small';
};

declare const google: { accounts: GoogleAccounts };

type GoogleAuthProps = {
	context: AuthContext;
	updateServerError: (message: string) => void;
};

type AuthContext = 'signup' | 'signin';

const googlePublicId =
	'778562703378-b8d69qdpjgvtcgmd0u7b3odot2gmsi6j.apps.googleusercontent.com';

export const GoogleAuth = (props: GoogleAuthProps) => {
	const navigate = useNavigate();
	const google_button = useRef(null);
	const { context, updateServerError } = props;

	const {
		mutate: registerUser,
		isError: isRegisterError,
		isSuccess: isRegisterSuccess,
	} = useRegisterMutation();

	const {
		mutate: loginUser,
		isError: isLoginError,
		isSuccess: isLoginSuccess,
		data: loginData,
	} = useLoginMutation();

	useEffect(() => {
		// subscribe to register mutation
		if (isRegisterSuccess) navigate('/welcome');
		if (isRegisterError) updateServerError(generalErrorMessage);
	}, [isRegisterSuccess]);

	useEffect(() => {
		// subscribe to login mutation
		if (isLoginSuccess && loginData) {
			if (loginData.newUser) navigate('/welcome');
		}
		if (isLoginError) updateServerError(generalErrorMessage);
	}, [isLoginSuccess, loginData]);

	useEffect(() => {
		if (process.env.NODE_ENV === 'test') return;
		// subscribe to google gsi and render button
		if (google_button.current && google) {
			google.accounts.id.initialize({
				client_id: googlePublicId,
				callback: handleGoogleAuth,
			});
			google.accounts.id.renderButton(google_button.current, {
				text: 'continue_with',
				logo_alignment: 'center',
				size: 'large',
			});
		}
	}, [google_button.current]);

	const createUserInfo = (data: { user: User; session: Session }) => {
		const { email, avatar_url, full_name } = data?.user?.user_metadata;
		const splitName = full_name.split(' ');
		return {
			userId: data?.user?.id,
			email,
			firstName: splitName[0] || '',
			lastName: splitName[1] || '',
			avatarUrl: avatar_url,
			supabaseRefreshToken: data?.session?.refresh_token,
		};
	};

	const handleGoogleAuth = async (response: GoogleCredentialResponse) => {
		// Handle error from Google auth
		if (response.error || !response.credential) {
			return updateServerError(googleErrorMessage);
		}

		// pass token to supabase
		const { data, error: supaError } = await supabase.auth.signInWithIdToken({
			provider: 'google',
			token: response.credential,
		});
		// handle supabase error
		if (supaError || !data.session) return updateServerError(generalErrorMessage);

		// continue register/sign in process
		const user = createUserInfo(data);
		if (context === 'signup') {
			registerUser(user);
		} else loginUser(user);
	};

	return (
		<Flex justify="center" width="100%" height="8" mb="4">
			<div ref={google_button} />
		</Flex>
	);
};

// defaults
const googleErrorMessage = 'There was an error connecting with Google at this time.';
const generalErrorMessage = 'There was an unexpected error. Contact support if needed.';
