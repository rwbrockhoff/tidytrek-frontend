import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { ThemeProvider } from 'styled-components';
import { publicRoutes } from './public.tsx';
import { protectedRoutes } from './protected.tsx';
import { useGetAuth } from '@/hooks';

export const AppRouter = () => {
	const { isLoading, isAuthenticated, session, theme } = useGetAuth();

	const appRouter = createBrowserRouter(
		session && isAuthenticated ? protectedRoutes : publicRoutes,
	);

	if (isLoading) return <Loader content="Loading..." />;

	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={appRouter} />
		</ThemeProvider>
	);
};
