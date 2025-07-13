import { type Session, type User } from '@supabase/supabase-js';
import supabase from '@/api/supabaseClient';
import { useRegisterMutation, useLoginMutation } from '@/queries/user-queries';
import { type GoogleCredentialResponse, type AuthMethod } from '../google-types';

const googleErrorMessage = 'There was an error connecting with Google at this time.';
const generalErrorMessage = 'There was an unexpected error. Contact support if needed.';

type UseGoogleAuthFlowProps = {
	authMethod: AuthMethod;
	updateServerError: (message: string) => void;
};

export const useGoogleAuthFlow = ({
	authMethod,
	updateServerError,
}: UseGoogleAuthFlowProps) => {
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
		if (authMethod === 'signup') {
			registerUser(user);
		} else loginUser(user);
	};

	return {
		handleGoogleAuth,
		isRegisterSuccess,
		isRegisterError,
		isLoginSuccess,
		isLoginError,
		loginData,
	};
};
