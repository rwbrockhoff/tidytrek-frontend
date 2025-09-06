import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/use-auth';

export const AuthRedirect = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) return null;

	if (isAuthenticated) return <Navigate to="/" replace />;

	return <Outlet />;
};
