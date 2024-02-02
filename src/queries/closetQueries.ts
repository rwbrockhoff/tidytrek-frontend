import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { type PackItem, type AvailablePack } from '../types/packTypes';

type InitialState = {
	gearClosetList: PackItem[];
	availablePacks: AvailablePack[];
};

export const useGetGearClosetQuery = () =>
	useQuery<InitialState>({
		queryKey: ['Closet'],
		queryFn: () => tidyTrekAPI.get('/closet/').then((res) => res.data),
	});

export const useAddGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => tidyTrekAPI.post('/closet/items'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};

export const useEditGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItem: PackItem) =>
			tidyTrekAPI.put(`/closet/items/${packItem.packItemId}`, packItem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
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

			await queryClient.cancelQueries({ queryKey: ['Closet'] });
			const prevClosetList = queryClient.getQueryData(['Closet']);

			queryClient.setQueryData(['Closet'], (old: any) => {
				const { gearClosetList } = old;
				const [item] = gearClosetList.splice(prevPackItemIndex, 1);
				gearClosetList.splice(packItemIndex, 0, item);
				return old;
			});
			return { prevClosetList };
		},
		onError: (_err, _packInfo, context) => {
			queryClient.setQueryData(['Closet'], context?.prevClosetList);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
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
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
		},
	});
};

export const useDeleteGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItemId: number) => tidyTrekAPI.delete(`/closet/items/${packItemId}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Closet'] }),
	});
};
