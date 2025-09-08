import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './query-keys';
import { tidyTrekAPI, baseAppURL } from '../api/tidytrek-api';
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
import { authHint } from '../utils/auth-hint';

export type AuthStatusResponse = {
	isAuthenticated: boolean;
	subscriptionStatus: boolean;
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
		queryFn: async () => {
			const response = await tidyTrekAPI
				.get('/auth/status')
				.then(extractData<AuthStatusResponse>);
			if (response.isAuthenticated) {
				authHint.checkAndRefresh();
			}
			return response;
		},
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
		onSuccess: async () => {
			authHint.set();
			const authResponse = await tidyTrekAPI
				.get('/auth/status')
				.then(extractData<AuthStatusResponse>);
			queryClient.setQueryData<AuthStatusResponse>(userKeys.all, authResponse);
		},
	});
};

export const useOAuthLoginMutation = (): SimpleMutation<LoginUser, LoginResponse> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (loginData: LoginUser) =>
			tidyTrekAPI.post('/auth/login', loginData).then(extractData<LoginResponse>),
		retry: false,
		onSuccess: async () => {
			authHint.set();
			const authResponse = await tidyTrekAPI
				.get('/auth/status')
				.then(extractData<AuthStatusResponse>);
			queryClient.setQueryData<AuthStatusResponse>(userKeys.all, authResponse);
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
					emailRedirectTo: `${baseAppURL}/welcome`,
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
			authHint.set();
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
			authHint.set();
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
			authHint.delete();
			// Set user data to null (logout state)
			queryClient.setQueryData<AuthStatusResponse>(userKeys.all, {
				isAuthenticated: false,
				subscriptionStatus: false,
				user: null,
				settings: null,
			});
			// Clear user-based cached data
			queryClient.removeQueries({
				predicate: (query) => {
					const queryKey = query.queryKey[0];
					// Keep only guest and auth queries, clear all user-specific data
					return queryKey !== 'User' && queryKey !== 'Guest';
				},
			});
		},
	});
};

export const useDeleteAccountMutation = (): SimpleMutation<void, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			return await tidyTrekAPI.delete('/auth/account').then(extractData<void>);
		},
		onSuccess: () => {
			authHint.delete();
			// Set user data to null (logged out state)
			queryClient.setQueryData<AuthStatusResponse>(userKeys.all, {
				isAuthenticated: false,
				subscriptionStatus: false,
				user: null,
				settings: null,
			});
		},
	});
};

export const useResetPasswordRequestMutation = () => {
	return useMutation({
		mutationFn: async (email: string) => {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${baseAppURL}/reset-password/confirm`,
			});
			if (error)
				throw new Error(extractErrorMessage(error) || 'Failed to send reset email.');
		},
		retry: false,
	});
};

export const useResetPasswordConfirmMutation = () => {
	return useMutation({
		mutationFn: async (password: string) => {
			const { error } = await supabase.auth.updateUser({ password });
			if (error)
				throw new Error(extractErrorMessage(error) || 'Failed to update password.');
		},
		retry: false,
	});
};
