import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { AxiosResponse } from 'axios';
import { PackItem } from '../types/packTypes';

export const useGetGearClosetQuery = () =>
	useQuery<AxiosResponse>({
		queryKey: ['Closet'],
		queryFn: () => tidyTrekAPI.get('/closet/'),
	});

export const useAddGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Closet'],
		mutationFn: () => tidyTrekAPI.post('/closet/items'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};

export const useEditGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Closet'],
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
		mutationKey: ['Closet'],
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};

export const useMoveItemToPackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Closet'],
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
			// todo: needs to also clear query key for 'Pack'
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};

export const useDeleteGearClosetItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Closet'],
		mutationFn: (packItemId: number) => tidyTrekAPI.delete(`/closet/items/${packItemId}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Closet'] }),
	});
};
