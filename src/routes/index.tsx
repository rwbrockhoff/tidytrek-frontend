import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { ThemeProvider } from 'styled-components';
import { type Session } from '@supabase/supabase-js';
import supabase from '@/api/supabaseClient.ts';
import { publicRoutes } from './public.tsx';
import { protectedRoutes } from './protected.tsx';
import { useGetAuthStatusQuery } from '@/queries/user-queries.ts';
import { createTheme } from '@/styles/theme/theme-utils.ts';

export const AppRouter = () => {
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
		session && data?.isAuthenticated ? protectedRoutes : publicRoutes,
	);

	if (isLoading) return <Loader content="Loading..." />;

	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={appRouter} />
		</ThemeProvider>
	);
};
