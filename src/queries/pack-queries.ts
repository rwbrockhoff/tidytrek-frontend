import { type HeaderInfo } from '@/types/pack-types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '@/api/tidytrekAPI';
import {
	type MovePackItemProps,
	type MovePackCategoryProps,
	type InitialState,
	type Pack,
	type PackItem,
	type GearClosetItem,
	type PackListItem,
	type Category,
} from '@/types/pack-types';
import { packKeys, packListKeys, closetKeys, profileKeys } from './query-keys';
import { decode } from '@/utils';
import { paletteList } from '@/styles/theme/palette-constants';

export const getCategoryIndex = (categories: Category[], categoryId: number | string) => {
	return categories.findIndex(
		(category: Category) => category.packCategoryId.toString() === categoryId.toString(),
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
		mutationKey: ['movePack'],
		mutationFn: (moveInfo: {
			packId: string;
			prevPackIndex?: string;
			nextPackIndex?: string;
			sourceIndex?: number;
			destinationIndex?: number;
		}) => {
			const { packId, prevPackIndex, nextPackIndex } = moveInfo;
			return tidyTrekAPI.put(`/packs/index/${packId}`, {
				prev_pack_index: prevPackIndex,
				next_pack_index: nextPackIndex,
			});
		},
		onError: () => {
			// Only invalidate on error to refetch correct data
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
		onSuccess: () => {
			// Only invalidate if no other move mutations are running
			if (!queryClient.isMutating({ mutationKey: ['movePack'] })) {
				queryClient.invalidateQueries({ queryKey: packListKeys.all });
				queryClient.invalidateQueries({ queryKey: profileKeys.all });
			}
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
		onError: (_err, packInfo) => {
			// Only invalidate on error to refetch correct data
			if (packInfo.packId) {
				queryClient.invalidateQueries({ queryKey: packKeys.packId(packInfo.packId) });
			}
		},
		onSettled: (_response, _error, packInfo) => {
			// Always refetch after mutation completes to ensure consistency
			if (packInfo.packId) {
				queryClient.invalidateQueries({ queryKey: packKeys.packId(packInfo.packId) });
			}
		},
	});
};

export const useMoveItemToClosetMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItemId: number) =>
			tidyTrekAPI.put(`/packs/pack-items/closet/${packItemId}`),
		onMutate: async (packItemId: number) => {
			// Cancel any outgoing refetches for both pack and closet queries
			await queryClient.cancelQueries({ queryKey: packKeys.all });
			await queryClient.cancelQueries({ queryKey: closetKeys.all });

			// Find which pack contains this item
			const packQueries = queryClient.getQueriesData<InitialState>({
				queryKey: packKeys.all,
			});
			let previousPack: InitialState | undefined;
			let packIdWithItem: number | undefined;
			let movedItem: PackItem | undefined;

			for (const [, queryData] of packQueries) {
				if (queryData) {
					const foundItem = queryData.categories
						.flatMap((cat) => cat.packItems)
						.find((item) => item.packItemId === packItemId);
					if (foundItem) {
						previousPack = queryData;
						packIdWithItem = foundItem.packId;
						movedItem = foundItem;
						break;
					}
				}
			}

			if (!movedItem || !packIdWithItem) return {};

			// Snapshot the previous closet data
			const previousCloset = queryClient.getQueryData<{ gearClosetList: GearClosetItem[] }>(
				closetKeys.all,
			);

			// Remove item from pack optimistically
			queryClient.setQueryData<InitialState>(packKeys.packId(packIdWithItem), (old) => {
				if (!old) return old;

				const updatedCategories = old.categories.map((category) => ({
					...category,
					packItems: category.packItems.filter((item) => item.packItemId !== packItemId),
				}));

				return {
					...old,
					categories: updatedCategories,
				};
			});

			// Add item to closet optimistically
			queryClient.setQueryData<{ gearClosetList: GearClosetItem[] }>(closetKeys.all, (old) => {
				if (!old || !movedItem) return old;

				// Remove pack-specific fields from the moved item
				const closetItem: GearClosetItem = {
					...movedItem,
					packId: null,
					packCategoryId: null,
				};

				return {
					...old,
					gearClosetList: [...old.gearClosetList, closetItem],
				};
			});

			// Return context for rollback
			return { previousPack, previousCloset, packIdWithItem };
		},
		onError: (_err, _packItemId, context) => {
			// Rollback updates on error
			if (context?.previousPack && context?.packIdWithItem) {
				queryClient.setQueryData(
					packKeys.packId(context.packIdWithItem),
					context.previousPack,
				);
			}
			if (context?.previousCloset) {
				queryClient.setQueryData(closetKeys.all, context.previousCloset);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
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
				prev_category_index: prevCategoryIndex,
				next_category_index: nextCategoryIndex,
			});
		},
		onError: (_err, categoryInfo) => {
			// Only invalidate on error to refetch correct data
			if (categoryInfo.packId) {
				queryClient.invalidateQueries({ queryKey: packKeys.packId(categoryInfo.packId) });
			}
		},
		onSettled: (_response, _error, categoryInfo) => {
			if (categoryInfo.packId) {
				queryClient.invalidateQueries({ queryKey: packKeys.packId(categoryInfo.packId) });
			}
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
