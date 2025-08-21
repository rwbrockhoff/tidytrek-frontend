import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useAuthActions } from './use-auth-actions';
import supabase from '@/api/supabase-client';
import { AuthFlowType } from '../constants/auth-flow-types';

// Hook to handle Welcome page auth logic

export const useWelcomeAuth = () => {
	const { isAuthenticated, user, isLoading } = useGetAuth();
	const { loginWithoutNavigation } = useAuthActions();
	const navigate = useNavigate();
	const hasAttemptedLogin = useRef(false);

	const isEmailVerification = window.location.hash.includes('access_token');


	useEffect(() => {
		const handleAuth = async () => {
			if (!isEmailVerification || isLoading || hasAttemptedLogin.current) return;

			// Parse tokens (# in url prevents React Router for this)
			const hashParams = new URLSearchParams(window.location.hash.substring(1));
			const hasTokens = hashParams.has('access_token') && hashParams.has('refresh_token');

			if (!hasTokens) return;

			const accessToken = hashParams.get('access_token');
			const refreshToken = hashParams.get('refresh_token');

			if (!accessToken || !refreshToken) {
				return navigate('/');
			}

			// Set login attempt to prevent re-runs
			hasAttemptedLogin.current = true;

			try {
				// Validate access token and get user info without setting session
				const { data: { user }, error } = await supabase.auth.getUser(accessToken);

				if (!user || error) {
					return navigate('/');
				}

				// Now login with backend using extracted info
				await loginWithoutNavigation({
					email: user.email!,
					userId: user.id,
					supabaseRefreshToken: refreshToken,
				});
			} catch {
				navigate('/');
			}
		};

		handleAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, navigate]);

	return {
		isLoading,
		isAuthenticated,
		user,
		authFlowType: isEmailVerification ? AuthFlowType.EmailVerification : AuthFlowType.GoogleOauth,
	};
};
