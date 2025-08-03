import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { useMemo } from 'react';
import { DashboardSkeleton, AuthSkeleton } from '@/components/ui';
import { publicRoutes } from './public.tsx';
import { protectedRoutes } from './protected.tsx';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useThemeSetter } from '@/hooks/ui/use-theme-setter';
import { useDelayedLoading } from '@/hooks/ui/use-delayed-loading';

export const AppRouter = () => {
	const { isLoading, isAuthenticated, settings } = useGetAuth();
	const showSkeleton = useDelayedLoading(isLoading, 200);
	const { darkMode, palette } = settings || {};
	const { currentMode, currentPalette } = useThemeSetter(darkMode, palette);

	const appRouter = useMemo(
		() => createBrowserRouter(isAuthenticated ? protectedRoutes : publicRoutes),
		[isAuthenticated],
	);

	if (isLoading) {
		if (showSkeleton) {
			// Check for tidytrek_token cookie to change which skeleton ui shows based on auth
			const hasTidytrekCookie = document.cookie.includes('tidytrek_token=');
			return hasTidytrekCookie ? <DashboardSkeleton /> : <AuthSkeleton />;
		}
		return null; // Show nothing until delay passes
	}

	return (
		<div data-theme={currentMode} data-theme-palette={currentPalette}>
			<Theme accentColor="jade" radius="small" scaling="95%">
				<RouterProvider router={appRouter} />
			</Theme>
		</div>
	);
};
