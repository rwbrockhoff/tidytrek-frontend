import { type Session, type User } from '@supabase/supabase-js';
import supabase from '@/api/supabase-client';
import { type GoogleCredentialResponse } from '../google-types';
import { useAuthActions } from '../../../hooks/use-auth-actions';

const googleErrorMessage = 'There was an error connecting with Google at this time.';
const generalErrorMessage = 'There was an unexpected error. Contact support if needed.';

type UseGoogleAuthFlowProps = {
	updateServerError: (message: string) => void;
};

export const useGoogleAuthFlow = ({ updateServerError }: UseGoogleAuthFlowProps) => {
	const { login, register } = useAuthActions();

	const createUserInfo = (data: { user: User; session: Session }) => {
		const { email, avatar_url, full_name } = data?.user?.user_metadata || {};
		const splitName = full_name?.split(' ') || [];
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

		// try login first, fallback to register if user doesn't exist
		const user = createUserInfo(data);
		try {
			// Always try login first
			await login(user);
		} catch (loginError) {
			// If login fails (user doesn't exist), try to register
			try {
				await register(user);
			} catch (registerError) {
				// If both fail, show error
				updateServerError(generalErrorMessage);
			}
		}
	};

	return {
		handleGoogleAuth,
	};
};
