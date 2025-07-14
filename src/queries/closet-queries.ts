import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrek-api';
import {
	PackInfo,
	type GearClosetItem,
	type MoveGearClosetItemProps,
} from '../types/pack-types';
import { closetKeys, packKeys } from './query-keys';
import { STALE_TIME } from './query-config';
import { type SimpleMutation } from './mutation-types';
import { extractData } from '../utils';

type GearClosetQueryState = {
	gearClosetList: GearClosetItem[];
};

export const useGetGearClosetQuery = () =>
	useQuery<GearClosetQueryState>({
		queryKey: closetKeys.all,
		staleTime: STALE_TIME,
		queryFn: () => tidyTrekAPI.get('/closet/').then((res) => res.data),
	});

export const useAddGearClosetItemMutation = (): SimpleMutation<void, GearClosetItem> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => tidyTrekAPI.post('/closet/items').then(extractData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useEditGearClosetItemMutation = (): SimpleMutation<
	GearClosetItem,
	GearClosetItem
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (gearClosetItem: GearClosetItem) =>
			tidyTrekAPI
				.put(`/closet/items/${gearClosetItem.packItemId}`, gearClosetItem)
				.then(extractData),
		onSuccess: (updatedItem) => {
			// only update changed item in cache
			queryClient.setQueryData<{ gearClosetList: GearClosetItem[] }>(
				closetKeys.all,
				(old) => {
					if (!old) return old;
					
					return {
						...old,
						gearClosetList: old.gearClosetList.map(item => 
							item.packItemId === updatedItem.packItemId 
								? updatedItem 
								: item
						),
					};
				}
			);
		},
	});
};

export const useMoveGearClosetItemMutation = (): SimpleMutation<
	MoveGearClosetItemProps,
	void
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['moveGearClosetItem'],
		mutationFn: (moveInfo: MoveGearClosetItemProps) => {
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

export const useMoveItemToPackMutation = (): SimpleMutation<PackInfo, void> => {
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

export const useDeleteGearClosetItemMutation = (): SimpleMutation<number, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItemId: number) => tidyTrekAPI.delete(`/closet/items/${packItemId}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: closetKeys.all }),
	});
};
