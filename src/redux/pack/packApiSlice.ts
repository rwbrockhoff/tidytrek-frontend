import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type InitialState, type Pack, type PackItem } from '../../types/packTypes';
import { decode } from '../../utils/generateDisplayId';

const baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://api.tidytrek.co'
		: 'http://localhost:4001';

export const packApi = createApi({
	reducerPath: 'packApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
		credentials: 'include',
	}),
	tagTypes: ['Pack', 'Packlist', 'Closet'],
	endpoints: (builder) => ({
		getDefaultPack: builder.query<InitialState, void>({
			query: () => '/packs',
			providesTags: ['Pack'],
		}),
		getPack: builder.query<InitialState, string | undefined>({
			query: (packId: string) => {
				if (packId) {
					const decodedId = decode(packId);
					return { url: `/packs/${decodedId}` };
				} else return { url: `/packs` };
			},
			providesTags: ['Pack'],
		}),
		getPackList: builder.query<InitialState, void>({
			query: () => '/packs/pack-list',
			providesTags: ['Packlist'],
		}),
		addNewPack: builder.mutation<InitialState, void>({
			query: () => ({
				url: '/packs',
				method: 'POST',
			}),
			invalidatesTags: ['Packlist'],
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
			invalidatesTags: ['Pack', 'Packlist'],
		}),
		movePack: builder.mutation({
			query: (packInfo: { packId: string; newIndex: number; prevIndex: number }) => {
				const { packId, newIndex, prevIndex } = packInfo;
				return {
					url: `/packs/index/${packId}`,
					method: 'PUT',
					body: { newIndex, prevIndex },
				};
			},
			invalidatesTags: ['Packlist'],
		}),
		deletePack: builder.mutation({
			query: (packId: number) => ({
				url: `/packs/${packId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Pack', 'Packlist', 'Closet'],
		}),
		deletePackAndItems: builder.mutation({
			query: (packId: number) => ({
				url: `/packs/items/${packId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Pack', 'Packlist', 'Closet'],
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
					body: packItem,
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
		moveItemToCloset: builder.mutation({
			query: (packItemId: number) => ({
				url: `/packs/pack-items/closet/${packItemId}`,
				method: 'PUT',
			}),
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
			invalidatesTags: ['Pack', 'Closet'],
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
			invalidatesTags: ['Pack', 'Closet'],
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
	useMoveItemToClosetMutation,
	useDeletePackItemMutation,
	useAddPackCategoryMutation,
	useEditPackCategoryMutation,
	useDeletePackCategoryMutation,
	useDeletePackCategoryAndItemsMutation,
} = packApi;
