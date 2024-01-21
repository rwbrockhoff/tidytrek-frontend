import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type User = {
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
  }),
});

export const {
  useGetAuthStatusQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = userApi;
