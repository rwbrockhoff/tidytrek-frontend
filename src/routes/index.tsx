import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Flex, Theme } from '@radix-ui/themes';
import { Spinner } from '@/components/ui';
import { publicRoutes } from './public.tsx';
import { protectedRoutes } from './protected.tsx';
import { useGetAuth } from '@/hooks';

export const AppRouter = () => {
	const { isLoading, isAuthenticated, session } = useGetAuth();

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
		<div data-theme-palette="earth-tones">
			<Theme accentColor="jade" radius="small" scaling="90%">
				<RouterProvider router={appRouter} />
			</Theme>
		</div>
	);
};
