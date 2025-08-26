import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
	useGetSavedPacksQuery,
	useAddBookmarkMutation,
	useRemoveBookmarkMutation,
} from '@/queries/saved-packs-queries';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { createQueryWrapper } from '@/tests/wrapper-utils';
import { createMockApiResponse } from '@/tests/mocks/api-mocks';
import type { SavedPack } from '@/types/saved-packs-types';

vi.mock('@/api/tidytrek-api', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
		post: vi.fn(),
		delete: vi.fn(),
	},
}));

const mockSavedPack: SavedPack = {
	packId: 123,
	packName: 'Scranton Day Pack',
	packDescription: 'My pack to take mountain biking!',
	packPhotoUrl: 'https://dundermifflin.com/sales/jim/mountainbiking.jpg',
	username: 'testuser',
	profilePhotoUrl: 'https://dundermifflin.com/sales/jim/profile.jpg',
};

const mockApiResponse = createMockApiResponse({
	bookmarks: [mockSavedPack],
});

describe('saved-packs-queries', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('useGetSavedPacksQuery', () => {
		it('should fetch saved packs and return correct data', async () => {
			vi.mocked(tidyTrekAPI.get).mockResolvedValueOnce(mockApiResponse);

			const { result } = renderHook(() => useGetSavedPacksQuery(), {
				wrapper: createQueryWrapper(),
			});

			await waitFor(() => {
				expect(result.current.isSuccess).toBe(true);
			});

			expect(tidyTrekAPI.get).toHaveBeenCalledWith('/bookmarks');
			expect(result.current.data).toEqual({
				savedPacks: [mockSavedPack],
			});
		});

		it('should handle empty bookmark array', async () => {
			vi.mocked(tidyTrekAPI.get).mockResolvedValueOnce(
				createMockApiResponse({
					bookmarks: [],
				}),
			);

			const { result } = renderHook(() => useGetSavedPacksQuery(), {
				wrapper: createQueryWrapper(),
			});

			await waitFor(() => {
				expect(result.current.isSuccess).toBe(true);
			});

			expect(result.current.data).toEqual({
				savedPacks: [],
			});
		});
	});

	describe('useAddBookmarkMutation', () => {
		it('should call correct endpoint with pack data', async () => {
			vi.mocked(tidyTrekAPI.post).mockResolvedValueOnce(createMockApiResponse({}));

			const { result } = renderHook(() => useAddBookmarkMutation(), {
				wrapper: createQueryWrapper(),
			});

			const packData = { packId: 123 };
			result.current.mutate(packData);

			await waitFor(() => {
				expect(tidyTrekAPI.post).toHaveBeenCalledWith('/bookmarks', packData);
			});
		});
	});

	describe('useRemoveBookmarkMutation', () => {
		it('should call correct endpoint with pack ID', async () => {
			vi.mocked(tidyTrekAPI.delete).mockResolvedValueOnce(createMockApiResponse({}));

			const { result } = renderHook(() => useRemoveBookmarkMutation(), {
				wrapper: createQueryWrapper(),
			});

			const packId = 123;
			result.current.mutate(packId);

			await waitFor(() => {
				expect(tidyTrekAPI.delete).toHaveBeenCalledWith('/bookmarks/123');
			});
		});
	});
});
