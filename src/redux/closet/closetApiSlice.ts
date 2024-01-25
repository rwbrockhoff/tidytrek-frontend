import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PackItem, Pack } from '../packs/packTypes';

type InitialState = {
	gearClosetList: PackItem[];
	availablePacks: Pack[];
};

const baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://api.tidytrek.co'
		: 'http://localhost:4001';

export const closetApi = createApi({
	reducerPath: 'closetApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		credentials: 'include',
	}),
	tagTypes: ['Closet'],
	endpoints: (builder) => ({
		getGearCloset: builder.query<InitialState, void>({
			query: () => '/closet/',
			providesTags: ['Closet'],
		}),
		// login: builder.mutation({
		// 	query: ({ email, password }) => ({
		// 		url: '/auth/login',
		// 		method: 'POST',
		// 		body: { email, password },
		// 	}),
		// 	invalidatesTags: ['Closet'],
		// }),
	}),
});

export const { useGetGearClosetQuery } = closetApi;
