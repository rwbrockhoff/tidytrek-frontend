import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Flex, Theme } from '@radix-ui/themes';
import { Spinner } from '@/components/ui';
import { publicRoutes } from './public.tsx';
import { protectedRoutes } from './protected.tsx';
import { useGetAuth, useThemeSetter } from '@/hooks';
import { mixins } from '@/styles/utils';

export const AppRouter = () => {
	const { isLoading, isAuthenticated, session } = useGetAuth();

	const theme = 'light'; // TODO: Pull from user preference/system setting
	useThemeSetter(theme);

	const appRouter = createBrowserRouter(
		session && isAuthenticated ? protectedRoutes : publicRoutes,
	);

	if (isLoading)
		return (
			<Flex align="center" justify="center" height={'100%'}>
				<Spinner size="3" />
			</Flex>
		);

	return (
		<div
			data-theme={theme}
			data-theme-palette="earth-tones"
			className={mixins.fullHeight}>
			<Theme accentColor="jade" radius="small" scaling="90%">
				<RouterProvider router={appRouter} />
			</Theme>
		</div>
	);
};
