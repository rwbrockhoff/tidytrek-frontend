import { type HeaderInfo } from '@/types/pack-types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { type SimpleMutation } from './mutation-types';
import { extractData } from './extract-data';
import { updateItemIndex } from '@/utils/query-utils';
import { 
	removePackItemFromCache, 
	updatePackItemInCache,
	updatePackItemIndexInCache 
} from './cache/pack-cache';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useGuestRoute } from '@/hooks/routing/use-route-context';
import {
	type MovePackItemProps,
	type MovePackItemResponse,
	type MovePackCategoryProps,
	type MovePackProps,
	type PackQueryState,
	type Pack,
	type PackItem,
	type GearClosetItem,
	type PackListItem,
	type Category,
	type PackWithCategories,
} from '@/types/pack-types';
import { packKeys, packListKeys, closetKeys, profileKeys } from './query-keys';
import { paletteList } from '@/styles/palette/palette-constants';
import { STALE_TIME } from './query-config';

export const getCategoryIndex = (categories: Category[], categoryId: number | string) => {
	return categories.findIndex(
		(category: Category) => category.packCategoryId.toString() === categoryId.toString(),
	);
};

export const useGetPackQuery = (
	packId: number | null | undefined,
	options?: { enabled?: boolean },
) => {
	const { isAuthenticated } = useGetAuth();
	const isGuestRoute = useGuestRoute();

	// Disable on guest routes unless overridden
	const shouldEnable =
		options?.enabled ?? (Boolean(packId) && isAuthenticated && !isGuestRoute);

	return useQuery<PackQueryState>({
		queryKey: packKeys.packId(packId),
		enabled: shouldEnable,
		staleTime: STALE_TIME,
		queryFn: () => tidyTrekAPI.get(`/packs/${packId}`).then(extractData<PackQueryState>),
	});
};

export const useGetPackListQuery = () => {
	const { isAuthenticated } = useGetAuth();

	return useQuery<{ packList: PackListItem[] }>({
		queryKey: packListKeys.all,
		enabled: isAuthenticated,
		staleTime: STALE_TIME,
		queryFn: () =>
			tidyTrekAPI.get('/packs/pack-list').then(extractData<{ packList: PackListItem[] }>),
	});
};

export const useAddNewPackMutation = (): SimpleMutation<void, PackWithCategories> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => tidyTrekAPI.post('/packs').then(extractData<PackWithCategories>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
	});
};

export const useImportPackMutation = (): SimpleMutation<string, PackWithCategories> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packUrl: string) =>
			tidyTrekAPI
				.post(`/packs/import`, { packUrl, paletteList })
				.then(extractData<PackWithCategories>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
	});
};

export const useEditPackMutation = (): SimpleMutation<
	{
		packId: number;
		modifiedPack: Pack;
	},
	Pack
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packInfo: { packId: number; modifiedPack: Pack }) => {
			const { packId, modifiedPack } = packInfo;
			return tidyTrekAPI.put(`/packs/${packId}`, modifiedPack).then(extractData<Pack>);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
	});
};

export const useUploadPackPhotoMutation = (): SimpleMutation<
	{
		packId: number;
		formData: FormData;
	},
	{ packPhotoUrl: string }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (photoInfo: { packId: number; formData: FormData }) => {
			const { packId, formData } = photoInfo;
			return tidyTrekAPI
				.post(`/packs/${packId}/pack-photo`, formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then(extractData<{ packPhotoUrl: string }>);
		},
		onSuccess: (_response, variables) => {
			const { packId } = variables;
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: packKeys.packId(null) });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
	});
};

export const useDeletePackPhotoMutation = (): SimpleMutation<number, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packId: number) =>
			tidyTrekAPI.delete(`/packs/${packId}/pack-photo`).then(extractData<void>),
		onSuccess: (_response, packId) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: packKeys.packId(null) });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
	});
};

export const useMovePackMutation = (): SimpleMutation<
	MovePackProps,
	{ packId: string; newIndex: string; rebalanced: boolean }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['movePack'],
		mutationFn: (moveInfo: MovePackProps) => {
			const { packId, prevPackIndex, nextPackIndex } = moveInfo;
			return tidyTrekAPI
				.put(`/packs/index/${packId}`, {
					prev_pack_index: prevPackIndex,
					next_pack_index: nextPackIndex,
				})
				.then(extractData<{ packId: string; newIndex: string; rebalanced: boolean }>);
		},
		onError: () => {
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: profileKeys.all });
		},
		onSuccess: (result) => {
			// If API rebalanced, invalidate query
			if (result.rebalanced) {
				queryClient.invalidateQueries({ queryKey: packListKeys.all });
				queryClient.invalidateQueries({ queryKey: profileKeys.all });
			} else {
				// update moved item to new fractional index from server
				queryClient.setQueryData(
					packListKeys.all,
					(old: { packList: PackListItem[] } | undefined) => {
						if (!old) return old;
						return {
							packList: updateItemIndex(old.packList, result, 'packId'),
						};
					},
				);
			}
		},
	});
};

export const useDeletePackMutation = (): SimpleMutation<number, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packId: number) =>
			tidyTrekAPI.delete(`/packs/${packId}`).then(extractData<void>),
		onSuccess: (_response, packId) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useDeletePackAndItemsMutation = (): SimpleMutation<number, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packId: number) =>
			tidyTrekAPI.delete(`/packs/items/${packId}`).then(extractData<void>),
		onSuccess: (_response, packId) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
		},
	});
};

export const useAddNewPackItemMutation = (): SimpleMutation<
	{ packId: number; packCategoryId: number },
	PackItem
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItem: { packId: number; packCategoryId: number }) => {
			const { packId, packCategoryId } = packItem;
			return tidyTrekAPI
				.post('/packs/pack-items', { packId, packCategoryId })
				.then(extractData<PackItem>);
		},
		onSuccess: (_response, { packId }) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
		},
	});
};

export const useEditPackItemMutation = (): SimpleMutation<
	{ packItemId: number; packItem: PackItem },
	PackItem
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packInfo: { packItemId: number; packItem: PackItem }) => {
			const { packItemId, packItem } = packInfo;
			return tidyTrekAPI
				.put(`/packs/pack-items/${packItemId}`, packItem)
				.then(extractData<PackItem>);
		},
		onSuccess: (updatedItem, { packItem }) => {
			// only update changed item in cache
			queryClient.setQueryData<PackQueryState>(
				packKeys.packId(packItem.packId),
				(old) => updatePackItemInCache(old, updatedItem)
			);
		},
	});
};

export const useMovePackItemMutation = (): SimpleMutation<
	MovePackItemProps,
	MovePackItemResponse
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packInfo: MovePackItemProps) => {
			const { packItemId } = packInfo;
			return tidyTrekAPI
				.put(`/packs/pack-items/index/${packItemId}`, packInfo)
				.then(extractData<MovePackItemResponse>);
		},
		onSuccess: (response, packInfo) => {
			if (packInfo.packId) {
				// If API rebalanced, invalidate query
				if (response.rebalanced) {
					queryClient.invalidateQueries({ queryKey: packKeys.packId(packInfo.packId) });
				} else {
					// update moved item with new calculated fractional index
					queryClient.setQueryData<PackQueryState>(
						packKeys.packId(packInfo.packId),
						(old) => updatePackItemIndexInCache(old, packInfo.packItemId, response.newIndex)
					);
				}
			}
		},
		onError: (_err, packInfo) => {
			if (packInfo.packId) {
				queryClient.invalidateQueries({ queryKey: packKeys.packId(packInfo.packId) });
			}
		},
	});
};

export const useMoveItemToClosetMutation = (): SimpleMutation<number, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (packItemId: number) =>
			tidyTrekAPI.put(`/packs/pack-items/closet/${packItemId}`).then(extractData<void>),
		onMutate: async (packItemId: number) => {
			// Cancel any outgoing refetches for both pack and closet queries
			await queryClient.cancelQueries({ queryKey: packKeys.all });
			await queryClient.cancelQueries({ queryKey: closetKeys.all });

			// Find which pack contains this item
			const packQueries = queryClient.getQueriesData<PackQueryState>({
				queryKey: packKeys.all,
			});
			let previousPack: PackQueryState | undefined;
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
			const previousCloset = queryClient.getQueryData<{
				gearClosetList: GearClosetItem[];
			}>(closetKeys.all);

			// Remove item from pack optimistically
			queryClient.setQueryData<PackQueryState>(
				packKeys.packId(packIdWithItem),
				(old) => removePackItemFromCache(old, packItemId)
			);

			// Add item to closet optimistically
			queryClient.setQueryData<{ gearClosetList: GearClosetItem[] }>(
				closetKeys.all,
				(old) => {
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
				},
			);

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

export const useDeletePackItemMutation = (): SimpleMutation<{ packItemId: number; packId: number }, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ packItemId }: { packItemId: number; packId: number }) =>
			tidyTrekAPI.delete(`/packs/pack-items/${packItemId}`).then(extractData<void>),
		onSuccess: (_response, { packItemId, packId }) => {
			queryClient.setQueryData<PackQueryState>(
				packKeys.packId(packId),
				(old) => removePackItemFromCache(old, packItemId)
			);
		},
		onError: (_error, { packId }) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
		},
	});
};

export const useAddPackCategoryMutation = (): SimpleMutation<
	{ packId: number; categoryColor: string },
	Category
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (categoryData: { packId: number; categoryColor: string }) => {
			const { packId, categoryColor } = categoryData;
			return tidyTrekAPI
				.post(`/packs/categories/${packId}`, { categoryColor })
				.then(extractData<Category>);
		},
		onSuccess: (_response, { packId }) => {
			queryClient.invalidateQueries({ queryKey: packKeys.packId(packId) });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useEditPackCategoryMutation = (): SimpleMutation<HeaderInfo, Category> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (categoryInfo: HeaderInfo) => {
			const { packCategoryId } = categoryInfo;
			return tidyTrekAPI
				.put(`/packs/categories/${packCategoryId}`, categoryInfo)
				.then(extractData<Category>);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: packListKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useMovePackCategoryMutation = (): SimpleMutation<
	MovePackCategoryProps,
	{ packCategoryId: string; newIndex: string; rebalanced: boolean }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (categoryInfo: MovePackCategoryProps) => {
			const { packCategoryId, prevCategoryIndex, nextCategoryIndex } = categoryInfo;
			return tidyTrekAPI
				.put(`/packs/categories/index/${packCategoryId}`, {
					prev_category_index: prevCategoryIndex,
					next_category_index: nextCategoryIndex,
				})
				.then(
					extractData<{ packCategoryId: string; newIndex: string; rebalanced: boolean }>,
				);
		},
		onSuccess: (result, categoryInfo) => {
			if (categoryInfo.packId) {
				// If API rebalanced, invalidate query
				if (result.rebalanced) {
					queryClient.invalidateQueries({
						queryKey: packKeys.packId(categoryInfo.packId),
					});
				} else {
					// update moved item to new fractional index from server
					queryClient.setQueryData<PackQueryState>(
						packKeys.packId(categoryInfo.packId),
						(old) => {
							if (!old) return old;

							return {
								...old,
								categories: updateItemIndex(old.categories, result, 'packCategoryId'),
							};
						},
					);
				}
			}
		},
		onError: (_err, categoryInfo) => {
			if (categoryInfo.packId) {
				queryClient.invalidateQueries({ queryKey: packKeys.packId(categoryInfo.packId) });
			}
		},
	});
};

export const useDeletePackCategoryMutation = (): SimpleMutation<number, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (categoryId: number) =>
			tidyTrekAPI.delete(`/packs/categories/${categoryId}`).then(extractData<void>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};

export const useDeletePackCategoryAndItemsMutation = (): SimpleMutation<number, void> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (categoryId: number) =>
			tidyTrekAPI.delete(`/packs/categories/items/${categoryId}`).then(extractData<void>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: packKeys.all });
			queryClient.invalidateQueries({ queryKey: closetKeys.all });
		},
	});
};
