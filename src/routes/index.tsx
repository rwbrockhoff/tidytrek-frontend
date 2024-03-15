import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { ThemeProvider } from 'styled-components';
import { publicRoutes } from './public.tsx';
import { protectedRoutes } from './protected.tsx';
import { useGetAuth } from '@/hooks';
import { Theme } from '@radix-ui/themes';

export const AppRouter = () => {
	const { isLoading, isAuthenticated, session, theme } = useGetAuth();

	const appRouter = createBrowserRouter(
		session && isAuthenticated ? protectedRoutes : publicRoutes,
	);

	if (isLoading) return <Loader content="Loading..." />;

	return (
		<ThemeProvider theme={theme}>
			<Theme accentColor="jade" radius="small" scaling="90%">
				<RouterProvider router={appRouter} />
			</Theme>
		</ThemeProvider>
	);
};
