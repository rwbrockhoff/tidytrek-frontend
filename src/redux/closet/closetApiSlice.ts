import { packApi } from '../pack/packApiSlice';
import { PackItem, AvailablePack } from '../../types/packTypes';

type InitialState = {
	gearClosetList: PackItem[];
	availablePacks: AvailablePack[];
};

export const closetApi = packApi.injectEndpoints({
	endpoints: (builder) => ({
		getGearCloset: builder.query<InitialState, void>({
			query: () => '/closet',
			providesTags: ['Closet'],
		}),
		addGearClosetItem: builder.mutation<InitialState, void>({
			query: () => ({
				url: '/closet/items',
				method: 'POST',
			}),
			invalidatesTags: ['Closet'],
		}),
		editGearClosetItem: builder.mutation({
			query: (packItem: PackItem) => {
				const { packItemId } = packItem;
				return {
					url: `/closet/items/${packItemId}`,
					method: 'PUT',
					body: packItem,
				};
			},
			invalidatesTags: ['Closet'],
		}),
		moveGearClosetItem: builder.mutation({
			query: (packInfo: {
				packItemId: string;
				packItemIndex: number;
				prevPackItemIndex: number;
			}) => {
				const { packItemId, packItemIndex, prevPackItemIndex } = packInfo;
				return {
					url: `/closet/items/index/${packItemId}`,
					method: 'PUT',
					body: { newIndex: packItemIndex, previousIndex: prevPackItemIndex },
				};
			},
			invalidatesTags: ['Closet'],
		}),
		moveItemToPack: builder.mutation({
			query: (packInfo: {
				packItemId: number;
				packId: string;
				packCategoryId: number;
			}) => {
				const { packItemId, packId, packCategoryId } = packInfo;
				return {
					url: `/closet/packs/${packItemId}`,
					method: 'PUT',
					body: { packId, packCategoryId },
				};
			},
			invalidatesTags: ['Closet', 'Pack'],
		}),
		deleteGearClosetItem: builder.mutation({
			query: (packItemId: number) => ({
				url: `/closet/items/${packItemId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Closet'],
		}),
	}),
});

export const {
	useGetGearClosetQuery,
	useAddGearClosetItemMutation,
	useEditGearClosetItemMutation,
	useMoveGearClosetItemMutation,
	useMoveItemToPackMutation,
	useDeleteGearClosetItemMutation,
} = closetApi;
