import { useEffect, useState } from 'react';
import supabase from '@/api/supabaseClient';
import { useGetAuthStatusQuery } from '@/queries/user-queries';
import { Session } from '@supabase/supabase-js';

export const useGetAuth = () => {
	const [session, setSession] = useState<Session | null>(null);

	const { isLoading, data } = useGetAuthStatusQuery();

	const user = data?.user || null;
	const isAuthenticated = data?.isAuthenticated || false;

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

	return { isLoading, isAuthenticated, user, session };
};
