import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { PasswordInfo } from '../components/Account/AccountForm/AccountForm';
import { AxiosResponse } from 'axios';

export const useGetAuthStatusQuery = () =>
	useQuery<AxiosResponse>({
		queryKey: ['User'],
		queryFn: () => tidyTrekAPI.get('/auth/status'),
	});

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['User'],
		mutationFn: (info: { email: string; password: string }) =>
			tidyTrekAPI.post('/auth/login', info),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['User'] });
		},
	});
};

export const useRegisterMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['User'],
		mutationFn: (registerData: {
			name: string;
			username: string;
			email: string;
			password: string;
		}) => tidyTrekAPI.post('/auth/register', registerData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['User'] });
		},
	});
};

export const useLogoutMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['User'],
		mutationFn: () => tidyTrekAPI.post('/auth/logout'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['User'] });
		},
	});
};

export const useChangePasswordMutation = () => {
	return useMutation({
		mutationKey: ['User'],
		mutationFn: (passwordInfo: PasswordInfo) =>
			tidyTrekAPI.put('/auth/password', passwordInfo),
	});
};

export const useRequestResetPasswordMutation = () => {
	return useMutation({
		mutationKey: ['User'],
		mutationFn: (email: string) =>
			tidyTrekAPI.post('/auth/reset-password/request', { email }),
	});
};

export const useConfirmResetPasswordMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['User'],
		mutationFn: (data: {
			password: string;
			confirmPassword: string;
			resetToken: string;
		}) => tidyTrekAPI.put('/auth/reset-password/confirm', data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['User'] });
		},
	});
};

export const useDeleteAccountMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['User'],
		mutationFn: () => tidyTrekAPI.delete('/auth/account'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['User'] });
		},
	});
};
