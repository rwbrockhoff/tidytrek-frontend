import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { PackInfo, type PackItem } from '../types/pack-types';
import { closetKeys, packKeys } from './query-keys';

type InitialState = {
	gearClosetList: PackItem[];
};

export const useGetGearClosetQuery = () =>
	useQuery<InitialState>({
		queryKey: closetKeys.all,
		queryFn: () => tidyTrekAPI.get('/closet/').then((res) => res.data),
	});

export const useAddGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => tidyTrekAPI.post('/closet/items'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useEditGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItem: PackItem) =>
			tidyTrekAPI.put(`/closet/items/${packItem.packItemId}`, packItem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useMoveGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (moveInfo: {
			packItemId: string;
			prevItemIndex?: string;
			nextItemIndex?: string;
		}) => {
			const { packItemId, prevItemIndex, nextItemIndex } = moveInfo;
			return tidyTrekAPI.put(`/closet/items/index/${packItemId}`, {
				prev_item_index: prevItemIndex,
				next_item_index: nextItemIndex,
			});
		},
		// Disable optimistic updates for now - will reimplement with fractional indexing logic
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useMoveItemToPackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packInfo: PackInfo) => {
			const { packItemId } = packInfo;
			return tidyTrekAPI.put(`/closet/packs/${packItemId}`, packInfo);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
			queryClient.invalidateQueries({ queryKey: packKeys.all });
		},
	});
};

export const useDeleteGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItemId: number) => tidyTrekAPI.delete(`/closet/items/${packItemId}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: closetKeys.all }),
	});
};
