import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { PackInfo, type GearClosetItem } from '../types/pack-types';
import { closetKeys, packKeys } from './query-keys';

type InitialState = {
	gearClosetList: GearClosetItem[];
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
		mutationFn: (gearClosetItem: GearClosetItem) =>
			tidyTrekAPI.put(`/closet/items/${gearClosetItem.packItemId}`, gearClosetItem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useMoveGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['moveGearClosetItem'],
		mutationFn: (moveInfo: {
			packItemId: string;
			prevItemIndex?: string;
			nextItemIndex?: string;
			sourceIndex?: number;
			destinationIndex?: number;
		}) => {
			const { packItemId, prevItemIndex, nextItemIndex } = moveInfo;
			return tidyTrekAPI.put(`/closet/items/index/${packItemId}`, {
				prev_item_index: prevItemIndex,
				next_item_index: nextItemIndex,
			});
		},
		onError: () => {
			// Only invalidate on error to refetch correct data
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
		onSuccess: () => {
			// Only invalidate if no other move mutations are running
			if (!queryClient.isMutating({ mutationKey: ['moveGearClosetItem'] })) {
				queryClient.invalidateQueries({ queryKey: closetKeys.all });
			}
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
