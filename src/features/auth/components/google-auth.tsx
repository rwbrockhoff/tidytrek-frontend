import { type Session, type User } from '@supabase/supabase-js';
import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import supabase from '@/api/supabaseClient';
import { useRegisterMutation, useLoginMutation } from '@/queries/user-queries';
import { useNavigate } from 'react-router-dom';
import { useCheckScreen } from '@/hooks';

declare const google: any;

type GoogleAuthProps = {
	context: AuthContext;
	updateServerError: (message: string) => void;
};
type AuthContext = 'signup' | 'signin';

export const GoogleAuth = (props: GoogleAuthProps) => {
	const navigate = useNavigate();
	const google_button = useRef(null);
	const { isMobile } = useCheckScreen();
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
		if (isLoginSuccess) {
			const { data } = loginData;
			if (data?.newUser) navigate('/welcome');
		}
		if (isLoginError) updateServerError(generalErrorMessage);
	}, [isLoginSuccess]);

	useEffect(() => {
		if (process.env.NODE_ENV === 'test') return;
		// subscribe to google gsi and render button
		if (google_button.current && google) {
			google.accounts.id.initialize({
				client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
				callback: handleGoogleAuth,
			});
			google.accounts.id.renderButton(google_button.current, {
				text: 'continue_with',
				width: isMobile ? 300 : 400,
				logo_alignment: 'center',
				size: 'medium',
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
		};
	};

	const handleGoogleAuth = async (response: unknown, error: unknown) => {
		// handle error from google auth flow
		if (error) return updateServerError(googleErrorMessage);
		// pass token to supabase
		const { data, error: supaError } = await supabase.auth.signInWithIdToken({
			provider: 'google',
			//@ts-ignore
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
		<GoogleContainer>
			<div ref={google_button} />
		</GoogleContainer>
	);
};

const GoogleContainer = styled.div`
	margin: 1em 0em;
	height: 3em;
	width: 100%;
	display: flex;
	justify-content: center;
`;

// defaults
const googleErrorMessage = 'There was an error connecting with Google at this time.';
const generalErrorMessage = 'There was an unexpected error. Contact support if needed.';
