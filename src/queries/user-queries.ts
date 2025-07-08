import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import supabase from '../api/supabaseClient';
import { LoginUser, type RegisterUser, type User } from '../types/user-types';
import { type Settings } from '../types/settings-types';
import { type SimpleMutation } from './mutation-types';
import { extractData } from '../utils';

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
		queryFn: () => tidyTrekAPI.get('/auth/status').then((res) => res.data),
	});

export const useLoginMutation = (): SimpleMutation<LoginUser, LoginResponse> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (info: LoginUser) =>
			tidyTrekAPI.post('/auth/login', info).then(extractData),
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
			tidyTrekAPI.post('/auth/register', registerData).then(extractData),
		retry: false,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useLogoutMutation = (): SimpleMutation<void, void> => {
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

export const useRefreshSupabaseMutation = (): SimpleMutation<void, void> => {
	return useMutation({
		mutationFn: () => tidyTrekAPI.post('/auth/refresh'),
	});
};

export const useDeleteAccountMutation = (): SimpleMutation<void, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => tidyTrekAPI.delete('/auth/account'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
			queryClient.clear();
		},
	});
};
