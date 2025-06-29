import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { DashboardSkeleton } from '@/components/ui';
import { publicRoutes } from './public.tsx';
import { protectedRoutes } from './protected.tsx';
import { useGetAuth, useThemeSetter, useDelayedLoading } from '@/hooks';
import { mx } from '@/styles/utils';

export const AppRouter = () => {
	const { isLoading, isAuthenticated } = useGetAuth();

	// Only show skeleton after 500ms to prevent flashing
	const showSkeleton = useDelayedLoading(isLoading, 500);

	const theme = 'light'; // TODO: Pull from user preference/system setting
	useThemeSetter(theme);

	// Don't render anything until we know auth state
	if (isLoading) {
		if (showSkeleton) return <DashboardSkeleton />;
		return null; // Show nothing until delay passes
	}

	const appRouter = createBrowserRouter(isAuthenticated ? protectedRoutes : publicRoutes);

	return (
		<div data-theme={theme} data-theme-palette="earth-tones" className={mx.fullHeight}>
			<Theme accentColor="jade" radius="small" scaling="90%">
				<RouterProvider router={appRouter} />
			</Theme>
		</div>
	);
};
