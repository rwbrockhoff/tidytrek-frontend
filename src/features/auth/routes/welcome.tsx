import { AuthContainer } from '../components/form-components/form-components';
import { WelcomeForm } from '../components/welcome/welcome-form';
import { useWelcomeAuth } from '../hooks/use-welcome-auth';
import { AuthFlowType } from '../constants/auth-flow-types';
import { AuthFallback } from '../components/auth-fallback';

export const Welcome = () => {
	const { isLoading, isAuthenticated, user, authFlowType } = useWelcomeAuth();

	if (isLoading) return <AuthFallback />;

	// Handle email verification flow
	if (authFlowType === AuthFlowType.EmailVerification && !isAuthenticated) {
		return <AuthFallback />;
	}

	return (
		<AuthContainer>
			<WelcomeForm defaultUsername={user?.username} authFlowType={authFlowType} />
		</AuthContainer>
	);
};
