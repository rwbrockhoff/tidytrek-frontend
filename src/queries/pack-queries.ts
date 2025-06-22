import { type HeaderInfo } from '@/types/pack-types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '@/api/tidytrekAPI';
import {
	type MovePackItemProps,
	type MovePackCategoryProps,
	type InitialState,
	type Pack,
	type PackItem,
	type PackListItem,
	type Category,
} from '@/types/pack-types';
import { packKeys, packListKeys, closetKeys, profileKeys } from './query-keys';
import { decode } from '@/utils';
import { paletteList } from '@/styles/theme/palette-constants';

export const getCategoryIndex = (categories: Category[], categoryId: number | string) => {
	return categories.findIndex(
		(item: Category) => item.packCategoryId === Number(categoryId),
	);
};

export const useGetPackQuery = (packId: string | undefined) => {
	const decodedId = packId ? decode(packId) : null;
	return useQuery<InitialState>({
		queryKey: packKeys.packId(decodedId as number | null),
		enabled: packId ? true : false,
		staleTime: 1000,
		queryFn: () => tidyTrekAPI.get(`/packs/${decodedId}`).then((res) => res.data),
	});
};

export const useGetPackListQuery = () => {
	return useQuery<{ packList: PackListItem[] }>({
		queryKey: packListKeys.all,
		staleTime: 1000,
		queryFn: () => tidyTrekAPI.get('/packs/pack-list').then((res) => res.data),
	});
};

export const useAddNewPackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => tidyTrekAPI.post('/packs').then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
	});
};

export const useImportPackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packUrl: string) =>
			tidyTrekAPI.post(`/packs/import`, { packUrl, paletteList }).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
	});
};

export const useEditPackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packInfo: { packId: number; modifiedPack: Pack }) => {
			const { packId, modifiedPack } = packInfo;
			return tidyTrekAPI.put(`/packs/${packId}`, modifiedPack);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
	});
};

export const useUploadPackPhotoMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (photoInfo: { packId: number; formData: FormData }) => {
			const { packId, formData } = photoInfo;
			return tidyTrekAPI.post(`/packs/${packId}/pack-photo`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
		},
		onSuccess: (_response, variables) => {
			const { packId } = variables;
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: packKeys.packId(null) });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
	});
};

export const useDeletePackPhotoMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packId: number) => tidyTrekAPI.delete(`/packs/${packId}/pack-photo`),
		onSuccess: (_response, packId) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: packKeys.packId(null) });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
	});
};

export const useMovePackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (moveInfo: {
			packId: string;
			prevPackIndex?: string;
			nextPackIndex?: string;
		}) => {
			const { packId, prevPackIndex, nextPackIndex } = moveInfo;
			return tidyTrekAPI.put(`/packs/index/${packId}`, {
				prev_pack_index: prevPackIndex,
				next_pack_index: nextPackIndex,
			});
		},
		// Disable optimistic updates for now - will reimplement with fractional indexing logic
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
	});
};

export const useDeletePackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packId: number) => tidyTrekAPI.delete(`/packs/${packId}`),
		onSuccess: (_response, packId) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useDeletePackAndItemsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packId: number) => tidyTrekAPI.delete(`/packs/items/${packId}`),
		onSuccess: (_response, packId) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
	});
};

export const useAddNewPackItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItem: { packId: number; packCategoryId: number }) => {
			const { packId, packCategoryId } = packItem;
			return tidyTrekAPI.post('/packs/pack-items', { packId, packCategoryId });
		},
		onSuccess: (_response, { packId }) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
		},
	});
};

export const useEditPackItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packInfo: { packItemId: number; packItem: PackItem }) => {
			const { packItemId, packItem } = packInfo;
			return tidyTrekAPI.put(`/packs/pack-items/${packItemId}`, packItem);
		},
		onSuccess: (_response, { packItem }) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packItem.packId) });
		},
	});
};

export const useMovePackItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packInfo: MovePackItemProps) => {
			const { packItemId } = packInfo;
			return tidyTrekAPI.put(`/packs/pack-items/index/${packItemId}`, packInfo);
		},
		// TODO: Update optimistic update logic for fractional indexing
		// onMutate: async (packInfo) => {
		// 	// Optimistic update logic disabled during fractional indexing migration
		// 	return {};
		// },
		onError: (_err, _packInfo, _context) => {
			// TODO: Re-implement error handling for fractional indexing
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
		},
		onSuccess: (_response, data) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(data.packId) });
		},
	});
};

export const useMoveItemToClosetMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItemId: number) =>
			tidyTrekAPI.put(`/packs/pack-items/closet/${packItemId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
		},
	});
};

export const useDeletePackItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItemId: number) =>
			tidyTrekAPI.delete(`/packs/pack-items/${packItemId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
		},
	});
};

export const useAddPackCategoryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (categoryData: { packId: number; categoryColor: string }) => {
			const { packId, categoryColor } = categoryData;
			return tidyTrekAPI.post(`/packs/categories/${packId}`, { categoryColor });
		},
		onSuccess: (_response, { packId }) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useEditPackCategoryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (categoryInfo: HeaderInfo) => {
			const { packCategoryId } = categoryInfo;
			return tidyTrekAPI.put(`/packs/categories/${packCategoryId}`, categoryInfo);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useMovePackCategoryMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (categoryInfo: MovePackCategoryProps) => {
			const { packCategoryId, prevCategoryIndex, nextCategoryIndex } = categoryInfo;
			return tidyTrekAPI.put(`/packs/categories/index/${packCategoryId}`, {
				prevCategoryIndex,
				nextCategoryIndex,
			});
		},
		// TODO: Update optimistic update logic for fractional indexing
		// onMutate: async (categoryInfo) => {
		// 	// Optimistic update logic disabled during fractional indexing migration
		// 	return {};
		// },
		onError: (_err, _packInfo, _context) => {
			// TODO: Re-implement error handling for fractional indexing
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
		onSuccess: (_response, { packId }) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
	});
};

export const useDeletePackCategoryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (categoryId: number) =>
			tidyTrekAPI.delete(`/packs/categories/${categoryId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useDeletePackCategoryAndItemsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (categoryId: number) =>
			tidyTrekAPI.delete(`/packs/categories/items/${categoryId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};
