import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PasswordInfo } from '../../components/Account/AccountForm/AccountForm';

export type User = {
	userId: string;
	name: string;
	email: string;
	username: string;
};

type InitialState = {
	isAuthenticated: boolean;
	user: User;
};

const baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://api.tidytrek.co'
		: 'http://localhost:4001';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		credentials: 'include',
	}),
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		getAuthStatus: builder.query<InitialState, void>({
			query: () => '/auth/status',
			providesTags: ['Auth'],
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/auth/login',
				method: 'POST',
				body: { email, password },
			}),
			invalidatesTags: ['Auth'],
		}),
		register: builder.mutation({
			query: ({ name, username, email, password }) => ({
				url: '/auth/register',
				method: 'POST',
				body: { name, username, email, password },
			}),
			invalidatesTags: ['Auth'],
		}),
		logout: builder.mutation({
			query: () => ({ url: '/auth/logout', method: 'POST' }),
			invalidatesTags: ['Auth'],
		}),
		changePassword: builder.mutation({
			query: (passwordInfo: PasswordInfo) => ({
				url: '/auth/password',
				method: 'PUT',
				body: passwordInfo,
			}),
		}),
		requestResetPassword: builder.mutation({
			query: (email: string) => ({
				url: '/auth/reset-password/request',
				method: 'POST',
				body: { email },
			}),
		}),
		confirmResetPassword: builder.mutation({
			query: ({ password, confirmPassword, resetToken }) => ({
				url: '/auth/reset-password/confirm',
				method: 'PUT',
				body: { password, confirmPassword, resetToken },
			}),
			invalidatesTags: ['Auth'],
		}),
		deleteAccount: builder.mutation<InitialState, void>({
			query: () => ({ url: '/auth/account', method: 'DELETE' }),
			invalidatesTags: ['Auth'],
		}),
	}),
});

export const {
	useGetAuthStatusQuery,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useChangePasswordMutation,
	useRequestResetPasswordMutation,
	useConfirmResetPasswordMutation,
	useDeleteAccountMutation,
} = userApi;
