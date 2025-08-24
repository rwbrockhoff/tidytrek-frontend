import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';
import { AuthGuard } from './auth-guard';
import { AuthLoading } from './auth-loading';
import { OfflineBanner } from '@/components/ui/offline-banner';
import { useAuth } from '@/hooks/auth/use-auth';
import { useDelayedLoading } from '@/hooks/ui/use-delayed-loading';

const appRouter = createBrowserRouter([
	{
		path: '/',
		children: [
			...publicRoutes,
			{
				element: <AuthGuard />,
				children: protectedRoutes,
			},
		],
	},
]);

export const AppRouter = () => {
	const { isLoading } = useAuth();
	const showSkeleton = useDelayedLoading(isLoading);

	if (isLoading) {
		return showSkeleton ? <AuthLoading /> : null;
	}

	return (
		<>
			<OfflineBanner />
			<Suspense fallback={<AuthLoading />}>
				<RouterProvider router={appRouter} />
			</Suspense>
		</>
	);
};
