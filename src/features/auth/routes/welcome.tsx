import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContainer } from '../components/form-components/form-components';
import { WelcomeForm } from '../components/welcome/welcome-form';
import supabase from '@/api/supabase-client';
import { useLoginMutation } from '@/queries/user-queries';
import { useGetAuth } from '@/hooks/auth/use-get-auth';

export const Welcome = () => {
	const { isAuthenticated, user } = useGetAuth();
	const { mutate: login } = useLoginMutation();
	const navigate = useNavigate();

	useEffect(() => {
		// Handle email verification flow
		if (!isAuthenticated) {
			supabase.auth.getSession().then(({ data: { session } }) => {
				if (session?.user) {
					// User has verified email and has Supabase session
					login({
						email: session.user.email!,
						userId: session.user.id,
						supabaseRefreshToken: session.refresh_token,
					});
					// Redirect to login
				} else navigate('/');
			});
		}
	}, [isAuthenticated, login, navigate]);

	// Show welcome form only if user is authenticated
	if (!isAuthenticated || !user) {
		return null;
	}

	return (
		<AuthContainer>
			<WelcomeForm defaultUsername={user?.username} />
		</AuthContainer>
	);
};
