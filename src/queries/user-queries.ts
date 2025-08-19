import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './query-keys';
import { tidyTrekAPI, frontendURL } from '../api/tidytrek-api';
import supabase from '../api/supabase-client';
import {
	LoginUser,
	type RegisterUser,
	type User,
	type RegisterUserFormData,
	type LoginUserFormData,
} from '../types/user-types';
import { type Settings } from '../types/settings-types';
import { type SimpleMutation } from './mutation-types';
import { extractData } from './extract-data';
import { extractErrorMessage } from '../utils/error-utils';

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

export const useLoginMutation = (): SimpleMutation<LoginUserFormData, LoginResponse> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (formData: LoginUserFormData) => {
			const { email, password } = formData;

			// Sign in using Supabase
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			// Handle Supabase error
			if (!data.user || error) {
				throw new Error(extractErrorMessage(error) || 'Invalid login credentials.');
			}

			const userId = data.user.id;
			const supabaseRefreshToken = data?.session?.refresh_token;

			return tidyTrekAPI
				.post('/auth/login', {
					userId,
					email,
					supabaseRefreshToken,
				})
				.then(extractData<LoginResponse>);
		},
		retry: false,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useOAuthLoginMutation = (): SimpleMutation<LoginUser, LoginResponse> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (loginData: LoginUser) =>
			tidyTrekAPI.post('/auth/login', loginData).then(extractData<LoginResponse>),
		retry: false,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useRegisterMutation = (): SimpleMutation<
	RegisterUserFormData,
	{ message?: string }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (formData: RegisterUserFormData) => {
			const { email, password } = formData;

			// Sign up using Supabase
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${frontendURL}/welcome`,
				},
			});

			// Handle Supabase error
			if (!data.user || error) {
				throw new Error(
					extractErrorMessage(error) || 'There was an error registering your account.',
				);
			}

			const userId = data.user.id;
			const supabaseRefreshToken = data?.session?.refresh_token;

			return tidyTrekAPI
				.post('/auth/register', {
					...formData,
					userId,
					supabaseRefreshToken,
				})
				.then(extractData<{ message?: string }>);
		},
		retry: false,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useOAuthRegisterMutation = (): SimpleMutation<
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
