import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { type InitialState, type Pack, type PackItem } from '../types/packTypes';
import { decode } from '../utils/generateDisplayId';

export const useGetDefaultPackQuery = () =>
	useQuery<InitialState>({
		queryKey: ['Pack'],
		queryFn: () => tidyTrekAPI.get('/packs'),
	});

export const useGetPackQuery = (packId: string | undefined) =>
	useQuery<InitialState>({
		queryKey: ['Pack', packId],
		queryFn: () => {
			if (packId) {
				const decodedId = decode(packId);
				return tidyTrekAPI.get(`/packs/${decodedId}`).then((res) => res.data);
			} else return tidyTrekAPI.get('/packs').then((res) => res.data);
		},
	});

export const useGetPackListQuery = () =>
	useQuery<InitialState>({
		queryKey: ['Packlist'],
		queryFn: () => tidyTrekAPI.get('/packs/pack-list').then((res) => res.data),
	});

export const useAddNewPackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Packlist'],
		mutationFn: () => tidyTrekAPI.post('/packs').then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Packlist'] });
		},
	});
};

export const useEditPackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (packInfo: { packId: number; modifiedPack: Pack }) => {
			const { packId, modifiedPack } = packInfo;
			return tidyTrekAPI.put(`/packs/${packId}`, { modifiedPack });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
			queryClient.invalidateQueries({ queryKey: ['Packlist'] });
		},
	});
};

export const useMovePackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Packlist'],
		mutationFn: (packInfo: { packId: string; newIndex: number; prevIndex: number }) => {
			const { packId, newIndex, prevIndex } = packInfo;
			return tidyTrekAPI.put(`/packs/index/${packId}`, { newIndex, prevIndex });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Packlist'] });
		},
	});
};

export const useDeletePackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (packId: number) => tidyTrekAPI.delete(`/packs/${packId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
			queryClient.invalidateQueries({ queryKey: ['Packlist'] });
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};

export const useDeletePackAndItemsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (packId: number) => tidyTrekAPI.delete(`/packs/items/${packId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
			queryClient.invalidateQueries({ queryKey: ['Packlist'] });
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};

export const useAddNewPackItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (packItem: { packId: number; packCategoryId: number }) => {
			const { packId, packCategoryId } = packItem;
			return tidyTrekAPI.post('/packs/pack-items', { packId, packCategoryId });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
		},
	});
};

export const useEditPackItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (packInfo: { packItemId: number; packItem: PackItem }) => {
			const { packItemId, packItem } = packInfo;
			return tidyTrekAPI.put(`/packs/pack-items/${packItemId}`, packItem);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
		},
	});
};

export const useMovePackItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (packInfo: {
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
			return tidyTrekAPI.put(`/packs/pack-items/index/${packItemId}`, {
				packCategoryId,
				packItemIndex,
				prevPackCategoryId,
				prevPackItemIndex,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
		},
	});
};

export const useMoveItemToClosetMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (packItemId: number) =>
			tidyTrekAPI.put(`/packs/pack-items/closet/${packItemId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
		},
	});
};

export const useDeletePackItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (packItemId: number) =>
			tidyTrekAPI.delete(`/packs/pack-items/${packItemId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
		},
	});
};

export const useAddPackCategoryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (packId: number) => tidyTrekAPI.post(`/packs/categories/${packId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};

export const useEditPackCategoryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (categoryInfo: { packCategoryId: number; packCategoryName: string }) => {
			const { packCategoryId, packCategoryName } = categoryInfo;
			return tidyTrekAPI.put(`/packs/categories/${packCategoryId}`, { packCategoryName });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};

export const useDeletePackCategoryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (categoryId: number) =>
			tidyTrekAPI.delete(`/packs/categories/${categoryId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};

export const useDeletePackCategoryAndItemsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['Pack'],
		mutationFn: (categoryId: number) =>
			tidyTrekAPI.delete(`/packs/categories/items/${categoryId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Pack'] });
			queryClient.invalidateQueries({ queryKey: ['Closet'] });
		},
	});
};
