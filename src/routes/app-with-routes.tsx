import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { type Session } from '@supabase/supabase-js';
import supabase from '../api/supabaseClient.ts';
import { Loader } from 'semantic-ui-react';
import { userRoutes, guestRoutes } from './routes.tsx';
import { useGetAuthStatusQuery } from '../queries/userQueries.ts';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '../styles/theme/theme-utils.ts';

export const AppWithRoutes = () => {
	const { isLoading, data } = useGetAuthStatusQuery();
	const theme = createTheme(data?.settings);

	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	const appRouter = createBrowserRouter(
		session && data?.isAuthenticated ? userRoutes : guestRoutes,
	);

	if (isLoading) return <Loader content="Loading..." />;

	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={appRouter} />
		</ThemeProvider>
	);
};
