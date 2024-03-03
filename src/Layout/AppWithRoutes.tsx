import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { userRoutes, guestRoutes } from './Routes.tsx';
import { useGetAuthStatusQuery } from '../queries/userQueries.ts';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '../shared/theme/themeUtils.ts';

const AppWithRoutes = () => {
	const { isLoading, data } = useGetAuthStatusQuery();
	const theme = createTheme(data?.settings);

	const appRouter = createBrowserRouter(data?.isAuthenticated ? userRoutes : guestRoutes);

	if (isLoading) return <Loader content="Loading..." />;

	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={appRouter} />
		</ThemeProvider>
	);
};

export default AppWithRoutes;
