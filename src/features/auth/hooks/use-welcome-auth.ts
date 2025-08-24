import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/use-auth';
import { useAuthActions } from './use-auth-actions';
import supabase from '@/api/supabase-client';
import { AuthFlowType } from '../constants/auth-flow-types';

export const useWelcomeAuth = () => {
	const { isAuthenticated, user, isLoading } = useAuth();
	const { loginWithoutNavigation } = useAuthActions();
	const navigate = useNavigate();
	const location = useLocation();
	const hasAttemptedLogin = useRef(false);

	const searchParams = new URLSearchParams(location.search);
	const tokenHash = searchParams.get('token_hash');
	const type = searchParams.get('type');

	const isEmailVerification = tokenHash && type === 'email';

	useEffect(() => {
		const handleAuth = async () => {
			if (!isEmailVerification || isLoading || hasAttemptedLogin.current) return;

			hasAttemptedLogin.current = true;

			try {
				const { data, error } = await supabase.auth.verifyOtp({
					token_hash: tokenHash,
					type: 'email',
				});

				if (error || !data.session || !data.user) return navigate('/');

				const { user, session } = data;

				if (!user.email || !user.id) return navigate('/');

				await loginWithoutNavigation({
					email: user.email,
					userId: user.id,
					supabaseRefreshToken: session.refresh_token,
				});
			} catch (error) {
				navigate('/');
			}
		};

		handleAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return {
		isLoading,
		isAuthenticated,
		user,
		authFlowType: isEmailVerification
			? AuthFlowType.EmailVerification
			: AuthFlowType.GoogleOauth,
	};
};
