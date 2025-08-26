import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { savedPacksKeys } from './query-keys';
import { extractData } from './extract-data';
import type {
	SavedPacksQueryState,
	GetSavedPacksRequest,
	BookmarkPackData,
} from '@/types/saved-packs-types';

export const useGetSavedPacksQuery = () => {
	return useQuery<SavedPacksQueryState>({
		queryKey: savedPacksKeys.all,
		queryFn: async (): Promise<SavedPacksQueryState> => {
			const response = await tidyTrekAPI.get('/bookmarks');
			const data = extractData<GetSavedPacksRequest>(response);
			return { savedPacks: data.bookmarks || [] };
		},
	});
};

export const useAddBookmarkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: BookmarkPackData) => {
			const response = await tidyTrekAPI.post('/bookmarks', data);
			return extractData(response);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: savedPacksKeys.all });
		},
	});
};

export const useRemoveBookmarkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (packId: number) => {
			const response = await tidyTrekAPI.delete(`/bookmarks/${packId}`);
			return extractData(response);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: savedPacksKeys.all });
		},
	});
};
