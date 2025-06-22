import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import supabase from '../api/supabaseClient';
import { LoginUser, type RegisterUser, type User } from '../types/user-types';
import { type Settings } from '../types/settings-types';

type InitialState = {
	isAuthenticated: boolean;
	user: User;
	settings: Settings;
};

export const useGetAuthStatusQuery = () =>
	useQuery<InitialState>({
		queryKey: userKeys.all,
		queryFn: () => tidyTrekAPI.get('/auth/status').then((res) => res.data),
	});

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (info: LoginUser) => tidyTrekAPI.post('/auth/login', info),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useRegisterMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (registerData: RegisterUser) =>
			tidyTrekAPI.post('/auth/register', registerData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useLogoutMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			// Sign out from Supabase
			await supabase.auth.signOut();
			// Clear server-side cookies
			return tidyTrekAPI.post('/auth/logout');
		},
		onSuccess: () => {
			// Immediately set auth state to logged out
			queryClient.setQueryData(userKeys.all, { isAuthenticated: false });
			queryClient.clear();
		},
	});
};

export const useRefreshSupabaseMutation = () => {
	return useMutation({
		mutationFn: () => tidyTrekAPI.post('/auth/refresh'),
	});
};

export const useDeleteAccountMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => tidyTrekAPI.delete('/auth/account'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
			queryClient.clear();
		},
	});
};
