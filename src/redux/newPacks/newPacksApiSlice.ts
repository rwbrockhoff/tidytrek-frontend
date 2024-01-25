import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type InitialState, type Pack, type PackItem } from '../packs/packTypes';

// const initialState: InitialState = {
// 	packList: [],
// 	pack: {} as Pack,
// 	categories: [],
// };

const baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://api.tidytrek.co'
		: 'http://localhost:4001';

export const newPacksApi = createApi({
	reducerPath: 'newPacksApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		credentials: 'include',
	}),
	tagTypes: ['Pack', 'Packlist'],
	endpoints: (builder) => ({
		getDefaultPack: builder.query<InitialState, void>({
			query: () => '/packs',
			providesTags: ['Pack'],
		}),
		getPack: builder.query<InitialState, number>({
			query: (packId) => `/packs/${packId}`,
			providesTags: ['Pack'],
		}),
		getPackList: builder.query<InitialState, void>({
			query: () => '/packs/pack-list',
			providesTags: ['Packlist'],
		}),
		addNewPack: builder.mutation({
			query: () => ({
				url: '/packs',
				method: 'POST',
			}),
			invalidatesTags: ['Pack'],
		}),
		editPack: builder.mutation({
			query: (packInfo: { packId: number; modifiedPack: Pack }) => {
				const { packId, modifiedPack } = packInfo;
				return {
					url: `/packs/${packId}`,
					method: 'PUT',
					body: { packId, modifiedPack },
				};
			},
			invalidatesTags: ['Pack'],
		}),
		movePack: builder.mutation({
			query: (packInfo: { packId: string; newIndex: number }) => {
				const { packId, newIndex } = packInfo;
				return {
					url: `/packs/index/${packId}`,
					method: 'PUT',
					body: { newIndex },
				};
			},
			invalidatesTags: ['Pack'],
		}),
		deletePack: builder.mutation({
			query: (packId: number) => ({
				url: `/packs/${packId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Pack'],
		}),
		deletePackAndItems: builder.mutation({
			query: (packId: number) => ({
				url: `/packs/items/${packId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Pack'],
		}),
		addPackItem: builder.mutation({
			query: (packItem: { packId: number; packCategoryId: number }) => {
				const { packId, packCategoryId } = packItem;
				return {
					url: `/packs/pack-items`,
					method: 'POST',
					body: { packId, packCategoryId },
				};
			},
			invalidatesTags: ['Pack'],
		}),
		editPackItem: builder.mutation({
			query: (packInfo: { packItemId: number; packItem: PackItem }) => {
				const { packItemId, packItem } = packInfo;
				return {
					url: `/packs/pack-items/${packItemId}`,
					method: 'PUT',
					body: { packItem },
				};
			},
			invalidatesTags: ['Pack'],
		}),
		movePackItem: builder.mutation({
			query: (packInfo: {
				packItemId: string;
				packCategoryId: string;
				packItemIndex: number;
				prevPackCategoryId: string;
				prevPackItemIndex: number;
			}) => {
				const {
					packItemId,
					packCategoryId,
					packItemIndex,
					prevPackCategoryId,
					prevPackItemIndex,
				} = packInfo;
				return {
					url: `/packs/pack-items/index/${packItemId}`,
					method: 'PUT',
					body: { packCategoryId, packItemIndex, prevPackCategoryId, prevPackItemIndex },
				};
			},
			invalidatesTags: ['Pack'],
		}),
		deletePackItem: builder.mutation({
			query: (packItemId: number) => ({
				url: `/packs/pack-items/${packItemId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Pack'],
		}),
		addPackCategory: builder.mutation({
			query: (packId: number) => {
				return {
					url: `/packs/categories/${packId}`,
					method: 'POST',
				};
			},
			invalidatesTags: ['Pack'],
		}),
		editPackCategory: builder.mutation({
			query: (categoryInfo: { packCategoryId: number; packCategoryName: string }) => {
				const { packCategoryId, packCategoryName } = categoryInfo;
				return {
					url: `/packs/categories/${packCategoryId}`,
					method: 'PUT',
					body: { packCategoryName },
				};
			},
			invalidatesTags: ['Pack'],
		}),
		deletePackCategory: builder.mutation({
			query: (categoryId: number) => ({
				url: `/packs/categories/${categoryId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Pack'],
		}),
		deletePackCategoryAndItems: builder.mutation({
			query: (categoryId: number) => ({
				url: `/packs/categories/items/${categoryId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Pack'],
		}),
	}),
});

export const {
	useGetDefaultPackQuery,
	useGetPackQuery,
	useGetPackListQuery,
	useAddNewPackMutation,
	useEditPackMutation,
	useMovePackMutation,
	useDeletePackMutation,
	useDeletePackAndItemsMutation,
	useAddPackItemMutation,
	useEditPackItemMutation,
	useMovePackItemMutation,
	useDeletePackItemMutation,
	useAddPackCategoryMutation,
	useEditPackCategoryMutation,
	useDeletePackCategoryMutation,
	useDeletePackCategoryAndItemsMutation,
} = newPacksApi;
