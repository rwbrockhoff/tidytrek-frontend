import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useAuthActions } from './use-auth-actions';
import supabase from '@/api/supabase-client';

// Hook to handle Welcome page auth logic

export const useWelcomeAuth = () => {
	const { isAuthenticated, user, isLoading } = useGetAuth();
	const { loginWithoutNavigation } = useAuthActions();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	// Determine auth flow
	const isEmailVerification =
		searchParams.has('access_token') || searchParams.has('refresh_token');

	useEffect(() => {
		if (!isEmailVerification || isAuthenticated || isLoading) return;

		const accessToken = searchParams.get('access_token');
		const refreshToken = searchParams.get('refresh_token');

		if (!accessToken || !refreshToken) return navigate('/');

		// create session for new user with tokens
		supabase.auth
			.setSession({
				access_token: accessToken,
				refresh_token: refreshToken,
			})
			.then(({ data: { session } }) => {
				if (session?.user) {
					loginWithoutNavigation({
						email: session.user.email!,
						userId: session.user.id,
						supabaseRefreshToken: session.refresh_token,
					}).catch(() => navigate('/'));
				} else {
					navigate('/');
				}
			})
			.catch(() => navigate('/'));
	}, [
		isEmailVerification,
		isAuthenticated,
		isLoading,
		loginWithoutNavigation,
		navigate,
		searchParams,
	]);

	return {
		isLoading,
		isAuthenticated,
		user,
		authFlowType: isEmailVerification ? 'email-verification' : 'google-oauth',
	};
};
