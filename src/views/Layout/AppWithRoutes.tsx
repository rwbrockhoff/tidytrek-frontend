import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { userRoutes, guestRoutes } from './Routes.tsx';
import { useGetAuthStatusQuery } from '../../queries/userQueries.ts';
import { ThemeProvider } from 'styled-components';
import { type Settings } from '../../types/userTypes.ts';

const AppWithRoutes = () => {
	const { isLoading, data } = useGetAuthStatusQuery();
	const theme = generateTheme(data?.settings);

	const appRouter = createBrowserRouter(data?.isAuthenticated ? userRoutes : guestRoutes);

	if (isLoading) return <Loader content="Loading..." />;

	return (
		<ThemeProvider theme={theme}>
			<div style={{ height: '100vh' }}>
				<RouterProvider router={appRouter} />
			</div>
		</ThemeProvider>
	);
};

export default AppWithRoutes;

interface UserTheme {
	[key: string]: string | undefined;
}

const generateTheme = (settings: Settings | undefined) => {
	let userTheme: UserTheme = {};
	if (settings && settings.themeColors) {
		settings.themeColors.map(({ themeColorName, themeColor }) => {
			userTheme[themeColorName] = themeColor;
		});
	} else return {};
	return userTheme;
};
