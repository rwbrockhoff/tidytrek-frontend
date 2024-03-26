import { useEffect } from 'react';
import { AuthContainer } from '../components/form-components';
import { WelcomeForm } from '../components/welcome/welcome-form';
import supabase from '@/api/supabaseClient';
import { useLoginMutation } from '@/queries/user-queries';
import { useGetAuth } from '@/hooks';

export const Welcome = () => {
	const { isAuthenticated, user } = useGetAuth();
	const { mutate: login } = useLoginMutation();

	useEffect(() => {
		// subscribe to session change and log in user
		if (isAuthenticated === false) {
			supabase.auth.getUser().then(({ data: { user } }) => {
				const { id, email } = user || {};
				if (id && email) login({ email, userId: id });
			});
		}
	}, []);

	return (
		<AuthContainer>
			<WelcomeForm defaultUsername={user?.username} />
		</AuthContainer>
	);
};
