import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrek-api';
import supabase from '../api/supabase-client';
import { LoginUser, type RegisterUser, type User } from '../types/user-types';
import { type Settings } from '../types/settings-types';
import { type SimpleMutation } from './mutation-types';
import { extractData } from './extract-data';

export type AuthStatusResponse = {
	isAuthenticated: boolean;
	user: User | null;
	settings: Settings | null;
};

type LoginResponse = {
	newUser?: boolean;
	message?: string;
};

export const useGetAuthStatusQuery = () =>
	useQuery<AuthStatusResponse>({
		queryKey: userKeys.all,
		queryFn: () => tidyTrekAPI.get('/auth/status').then(extractData<AuthStatusResponse>),
	});

export const useLoginMutation = (): SimpleMutation<LoginUser, LoginResponse> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (info: LoginUser) =>
			tidyTrekAPI.post('/auth/login', info).then(extractData<LoginResponse>),
		retry: false,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useRegisterMutation = (): SimpleMutation<
	RegisterUser,
	{ message?: string }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (registerData: RegisterUser) =>
			tidyTrekAPI
				.post('/auth/register', registerData)
				.then(extractData<{ message?: string }>),
		retry: false,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useLogoutMutation = (): SimpleMutation<void, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['logout'],
		mutationFn: async () => {
			await tidyTrekAPI.post('/auth/logout').then(extractData<void>);
			await supabase.auth.signOut();
		},
		onSuccess: () => {
			queryClient.clear();
		},
	});
};

export const useRefreshSupabaseMutation = (): SimpleMutation<void, void> => {
	return useMutation({
		mutationFn: () => tidyTrekAPI.post('/auth/refresh').then(extractData<void>),
	});
};

export const useDeleteAccountMutation = (): SimpleMutation<void, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const result = await tidyTrekAPI.delete('/auth/account').then(extractData<void>);
			// Redirect after successful deletion
			window.location.replace('/login');
			return result;
		},
		onSuccess: () => {
			queryClient.clear();
		},
	});
};
