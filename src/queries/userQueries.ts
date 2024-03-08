import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './queryKeys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { type RegisterUser, type User } from '../types/userTypes';
import { type Settings } from '../types/settingsTypes';
import { type PasswordInfo } from '../types/formTypes';

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
		mutationFn: (info: { email: string; userId: string }) =>
			tidyTrekAPI.post('/auth/login', info),
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
		mutationFn: () => tidyTrekAPI.post('/auth/logout'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
			queryClient.clear();
		},
	});
};

export const useChangePasswordMutation = () => {
	return useMutation({
		mutationFn: (passwordInfo: PasswordInfo) =>
			tidyTrekAPI.put('/auth/password', passwordInfo),
	});
};

export const useRequestResetPasswordMutation = () => {
	return useMutation({
		mutationFn: (email: string) =>
			tidyTrekAPI.post('/auth/reset-password/request', { email }),
	});
};

export const useConfirmResetPasswordMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: {
			password: string;
			confirmPassword: string;
			resetToken: string;
		}) => tidyTrekAPI.put('/auth/reset-password/confirm', data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
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
