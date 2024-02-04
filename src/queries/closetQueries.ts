import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { type PackItem } from '../types/packTypes';
import { closetKeys, packKeys } from './queryKeys';

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
		mutationFn: (packInfo: {
			packItemId: string;
			packItemIndex: number;
			prevPackItemIndex: number;
		}) => {
			const { packItemId, packItemIndex, prevPackItemIndex } = packInfo;
			return tidyTrekAPI.put(`/closet/items/index/${packItemId}`, {
				newIndex: packItemIndex,
				previousIndex: prevPackItemIndex,
			});
		},
		onMutate: async (packInfo) => {
			const { packItemIndex, prevPackItemIndex } = packInfo;

			await queryClient.cancelQueries({ queryKey: closetKeys.all });
			const prevClosetList = queryClient.getQueryData(closetKeys.all);

			queryClient.setQueryData(closetKeys.all, (old: any) => {
				const { gearClosetList } = old;
				const [item] = gearClosetList.splice(prevPackItemIndex, 1);
				gearClosetList.splice(packItemIndex, 0, item);
				return old;
			});
			return { prevClosetList };
		},
		onError: (_err, _packInfo, context) => {
			queryClient.setQueryData(closetKeys.all, context?.prevClosetList);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useMoveItemToPackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packInfo: {
			packItemId: number;
			packId: number;
			packCategoryId: number;
		}) => {
			const { packItemId, packId, packCategoryId } = packInfo;
			return tidyTrekAPI.put(`/closet/packs/${packItemId}`, {
				packId,
				packCategoryId,
			});
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
