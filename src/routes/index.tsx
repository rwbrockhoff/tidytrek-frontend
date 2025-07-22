import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { DashboardSkeleton, AuthSkeleton } from '@/components/ui';
import { publicRoutes } from './public.tsx';
import { protectedRoutes } from './protected.tsx';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useThemeSetter } from '@/hooks/ui/use-theme-setter';
import { useDelayedLoading } from '@/hooks/ui/use-delayed-loading';

export const AppRouter = () => {
	const { isLoading, isAuthenticated, settings } = useGetAuth();

	//  Show skeleton after 200ms to prevent flashing
	const showSkeleton = useDelayedLoading(isLoading, 200);

	// Set user's dark mode + palette preferences
	const { darkMode, palette } = settings || {};
	const { currentMode, currentPalette } = useThemeSetter(darkMode, palette);

	// Don't render anything until we know auth state
	if (isLoading) {
		if (showSkeleton) {
			// Check for tidytrek_token cookie to change which skeleton ui shows based on auth
			const hasTidytrekCookie = document.cookie.includes('tidytrek_token=');
			return hasTidytrekCookie ? <DashboardSkeleton /> : <AuthSkeleton />;
		}
		return null; // Show nothing until delay passes
	}

	const appRouter = createBrowserRouter(isAuthenticated ? protectedRoutes : publicRoutes);

	return (
		<div data-theme={currentMode} data-theme-palette={currentPalette} className="h-full">
			<Theme accentColor="jade" radius="small" scaling="100%">
				<RouterProvider router={appRouter} />
			</Theme>
		</div>
	);
};
