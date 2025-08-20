import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { useMemo } from 'react';
import { useIsMutating } from '@tanstack/react-query';
import { publicRoutes } from './public.tsx';
import { protectedRoutes } from './protected.tsx';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useThemeSetter } from '@/hooks/ui/use-theme-setter';
import { useDelayedLoading } from '@/hooks/ui/use-delayed-loading';
import { AuthLoading } from './auth-loading';

export const AppRouter = () => {
	const { isLoading, isAuthenticated, settings } = useGetAuth();
	// useIsMutating returns 1 if key is being mutated (isLoggingOut)
	const isLoggingOut = useIsMutating({ mutationKey: ['logout'] }) > 0;
	const showSkeleton = useDelayedLoading(isLoading); // Uses 300ms default
	const { darkMode, palette } = settings || {};
	const { currentMode, currentPalette } = useThemeSetter(darkMode, palette);

	const appRouter = useMemo(
		() =>
			createBrowserRouter(
				isAuthenticated || isLoggingOut ? protectedRoutes : publicRoutes,
			),
		[isAuthenticated, isLoggingOut],
	);

	if (isLoading) {
		return showSkeleton ? <AuthLoading /> : null;
	}

	return (
		<div data-theme={currentMode} data-theme-palette={currentPalette}>
			<Theme accentColor="jade" radius="small" scaling="95%">
				<RouterProvider router={appRouter} />
			</Theme>
		</div>
	);
};
