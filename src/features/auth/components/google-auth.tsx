import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import supabase from '../../../api/supabaseClient';
declare const google: any;
import { useRegisterMutation, useLoginMutation } from '../../../queries/userQueries';
import { useNavigate } from 'react-router-dom';
import useCheckMobile from '../../../hooks/useCheckMobile';

type GoogleAuthProps = {
	context: AuthContext;
	invalidForm: (message: string) => void;
};
type AuthContext = 'signup' | 'signin';

const GoogleAuth = (props: GoogleAuthProps) => {
	const navigate = useNavigate();
	const google_button = useRef(null);
	const isMobile = useCheckMobile();
	const { context, invalidForm } = props;

	const {
		mutate: registerUser,
		isError: isRegisterError,
		isSuccess: isRegisterSuccess,
	} = useRegisterMutation();

	const { mutate: loginUser, isError: isLoginError } = useLoginMutation();

	useEffect(() => {
		// subscribe to success/error for auth requests
		if (isRegisterSuccess) navigate('/welcome');
		if (isRegisterError || isLoginError) invalidForm(generalErrorMessage);
	}, [isRegisterSuccess]);

	useEffect(() => {
		// subscribe to google gsi and render button
		if (google_button.current) {
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

	const handleGoogleAuth = async (response: unknown, error: unknown) => {
		// handle error from google auth flow
		if (error) return invalidForm(googleErrorMessage);
		// pass token to supabase
		const { data, error: supaError } = await supabase.auth.signInWithIdToken({
			provider: 'google',
			//@ts-ignore
			token: response.credential,
		});
		// handle supabase error
		if (supaError || !data.session) return invalidForm(generalErrorMessage);
		else {
			// continue register/sign in process
			const userId = data?.user?.id;
			const userInfo = data?.user?.user_metadata;
			const { email, avatar_url, full_name } = userInfo;
			if (context === 'signup') {
				const splitName = full_name.split(' ');
				const resizedPhoto = resizeGoogleAvatar(avatar_url);
				registerUser({
					userId,
					email,
					firstName: splitName[0] || '',
					lastName: splitName[1] || '',
					avatarUrl: resizedPhoto,
				});
			} else loginUser({ userId, email });
		}
	};

	return (
		<GoogleContainer>
			<div ref={google_button} />
		</GoogleContainer>
	);
};

export default GoogleAuth;

const GoogleContainer = styled.div`
	margin: 1em 0em;
	height: 3em;
	width: 100%;
	display: flex;
	justify-content: center;
`;

const resizeGoogleAvatar = (url: string) => {
	if (!url) return null;
	const index = url.indexOf('=s96');
	const validIndex = index >= 0;
	return (
		url.substring(0, validIndex ? index : url.length) + (validIndex ? '=s200-c' : '')
	);
};

// defaults
const googleErrorMessage = 'There was an error connecting with Google at this time.';
const generalErrorMessage = 'There was an unexpected error. Contact support if needed.';
