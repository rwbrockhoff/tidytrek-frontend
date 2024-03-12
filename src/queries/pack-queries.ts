import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '@/api/tidytrekAPI';
import {
	type MovePackItemProps,
	type InitialState,
	type Pack,
	type PackItem,
	type PackListItem,
	type Category,
} from '@/types/pack-types';
import { packKeys, packListKeys, closetKeys, profileKeys } from './query-keys';
import { decode } from '@/utils';
import { HeaderInfo } from '../features/dashboard/handlers/use-pack-category-handlers';

export const getCategoryIndex = (categories: Category[], categoryId: number | string) => {
	return categories.findIndex(
		(item: Category) => item.packCategoryId === Number(categoryId),
	);
};

export const useGetDefaultPackQuery = () =>
	useQuery<InitialState>({
		queryKey: packKeys.all,
		queryFn: () => tidyTrekAPI.get('/packs').then((res) => res.data),
	});

export const useGetPackQuery = (packId: string | undefined) => {
	const decodedId = packId ? decode(packId) : null;
	return useQuery<InitialState>({
		queryKey: packKeys.packId(decodedId as number | null),
		queryFn: () => {
			if (packId) {
				const decodedId = decode(packId);
				return tidyTrekAPI.get(`/packs/${decodedId}`).then((res) => res.data);
			} else return tidyTrekAPI.get('/packs').then((res) => res.data);
		},
	});
};

export const useGetPackListQuery = () => {
	return useQuery<{ packList: PackListItem[] }>({
		queryKey: packListKeys.all,
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

export const useEditPackMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packInfo: { packId: number; modifiedPack: Pack }) => {
			const { packId, modifiedPack } = packInfo;
			return tidyTrekAPI.put(`/packs/${packId}`, { modifiedPack });
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
		mutationFn: (packInfo: { packId: string; newIndex: number; prevIndex: number }) => {
			const { packId, newIndex, prevIndex } = packInfo;
			return tidyTrekAPI.put(`/packs/index/${packId}`, { newIndex, prevIndex });
		},
		onMutate: async (packInfo: {
			packId: string;
			newIndex: number;
			prevIndex: number;
		}) => {
			const { newIndex, prevIndex } = packInfo;
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: packListKeys.all });
			// Snapshot the previous value
			const prevPackList = queryClient.getQueryData(packListKeys.all);
			// Optimistically update to the new value
			queryClient.setQueryData(packListKeys.all, (old: any) => {
				const [item] = old.packList.splice(prevIndex, 1);
				old.packList.splice(newIndex, 0, item);
				return old;
			});
			// Return a context object with the snapshotted value
			return { prevPackList };
		},
		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (_err, _packInfo, context) => {
			queryClient.setQueryData(packListKeys.all, context?.prevPackList);
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useDeletePackAndItemsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packId: number) => tidyTrekAPI.delete(`/packs/items/${packId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
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
		onMutate: async (packInfo) => {
			const {
				packId,
				packCategoryId,
				prevPackCategoryId,
				packItemIndex,
				prevPackItemIndex,
			} = packInfo;
			await queryClient.cancelQueries({ queryKey: packKeys.packId(packId) });
			const prevPack = queryClient.getQueryData(packKeys.packId(packId));

			queryClient.setQueryData(packKeys.packId(packId), (old: any) => {
				const { categories } = old;
				const prevIndex = getCategoryIndex(categories, prevPackCategoryId);
				const [item] = categories[prevIndex].packItems.splice(prevPackItemIndex, 1);

				const sameCategory = prevPackCategoryId === packCategoryId;
				const newIndex = sameCategory
					? prevIndex
					: getCategoryIndex(categories, packCategoryId);
				categories[newIndex].packItems.splice(packItemIndex, 0, item);

				return old;
			});
			return { prevPack };
		},
		onError: (_err, _packInfo, context) => {
			queryClient.setQueryData(packKeys.all, context?.prevPack);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
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
		mutationFn: (packId: number) => tidyTrekAPI.post(`/packs/categories/${packId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
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
		mutationFn: (categoryInfo: {
			packId: number;
			packCategoryId: string;
			newIndex: number;
			prevIndex: number;
			paramPackId: string | undefined;
		}) => {
			const { packCategoryId, prevIndex, newIndex } = categoryInfo;
			return tidyTrekAPI.put(`/packs/categories/index/${packCategoryId}`, {
				prevIndex,
				newIndex,
			});
		},
		onMutate: async (categoryInfo) => {
			const { paramPackId, packId, prevIndex, newIndex } = categoryInfo;
			const packIdNum = Number(packId);

			await queryClient.cancelQueries({ queryKey: packKeys.all });
			const prevPack = queryClient.getQueryData(packKeys.packId(packIdNum));

			// set cache id based on param
			const cacheId = paramPackId ? packIdNum : null;

			queryClient.setQueryData(packKeys.packId(cacheId), (old: any) => {
				if (old) {
					// previously cached, able to modify cached pack
					const { categories, pack } = old;
					const [category] = categories.splice(prevIndex, 1);
					categories.splice(newIndex, 0, category);
					return { pack, categories };
				} else {
					// pack doesn't have cache, modify current pack data
					const currentPack = queryClient.getQueryData(packKeys.packId(null));
					const { categories, pack } = currentPack as InitialState;

					const [category] = categories.splice(prevIndex, 1);
					categories.splice(newIndex, 0, category);
					return { pack, categories };
				}
			});

			return { prevPack };
		},
		onError: (_err, _packInfo, context) => {
			queryClient.setQueryData(packKeys.all, context?.prevPack);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
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
