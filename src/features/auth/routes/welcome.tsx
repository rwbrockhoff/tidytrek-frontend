import { AuthContainer } from '../components/form-components/form-components';
import { WelcomeForm } from '../components/welcome/welcome-form';
import { useWelcomeAuth } from '../hooks/use-welcome-auth';

export const Welcome = () => {
	const { isLoading, isAuthenticated, user, authFlowType } = useWelcomeAuth();

	if (isLoading) return null;

	if (!isAuthenticated || !user) return null;

	return (
		<AuthContainer>
			<WelcomeForm defaultUsername={user?.username} authFlowType={authFlowType} />
		</AuthContainer>
	);
};
