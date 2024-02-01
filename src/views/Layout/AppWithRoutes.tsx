import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { userRoutes, guestRoutes } from './Routes.tsx';
import { useGetAuthStatusQuery } from '../../queries/userQueries.ts';

const AppWithRoutes = () => {
	const { isLoading, data: response } = useGetAuthStatusQuery();

	const appRouter = createBrowserRouter(
		response?.data?.isAuthenticated ? userRoutes : guestRoutes,
	);

	if (isLoading) {
		return <Loader content="Loading..." />;
	}

	return (
		<div style={{ height: '100vh' }}>
			<RouterProvider router={appRouter} />
		</div>
	);
};

export default AppWithRoutes;
