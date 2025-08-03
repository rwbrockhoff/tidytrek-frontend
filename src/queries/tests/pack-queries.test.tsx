import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
	useGetPackQuery,
	useGetPackListQuery,
	useAddNewPackMutation,
	useImportPackMutation,
	useEditPackMutation,
	useDeletePackMutation,
	useAddNewPackItemMutation,
	useEditPackItemMutation,
	useDeletePackItemMutation,
	useAddPackCategoryMutation,
} from '@/queries/pack-queries';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { createQueryWrapper } from '@/tests/wrapper-utils';
import {
	createMockInitialState,
	createMockPack,
	createMockPackItem,
	createMockPackList,
} from '@/tests/mocks/pack-mocks';
import { createMockApiResponse } from '@/tests/mocks/api-mocks';
import { createMockUser } from '@/tests/mocks/user-mocks';
import { useGetAuth } from '@/hooks/auth/use-get-auth';

vi.mock('@/api/tidytrek-api', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		delete: vi.fn(),
	},
}));

vi.mock('@/hooks/auth/use-get-auth', () => ({
	useGetAuth: vi.fn(() => ({
		user: createMockUser(),
		isLoading: false,
		isAuthenticated: true,
		settings: null,
	})),
}));

vi.mock('@/utils', () => ({
	extractData: vi.fn((res) => res.data),
	decode: vi.fn((id) => parseInt(id)),
}));

describe('useGetPackQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with decoded ID', () => {
		const packId = 123;

		renderHook(() => useGetPackQuery(packId), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/packs/123');
	});

	it('should be disabled when packId is undefined', () => {
		renderHook(() => useGetPackQuery(undefined), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).not.toHaveBeenCalled();
	});

	it('should be disabled when user is not authenticated', () => {
		// Mock unauthenticated state
		vi.mocked(useGetAuth).mockReturnValueOnce({
			user: null,
			isLoading: false,
			isAuthenticated: false,
			settings: null,
		});

		renderHook(() => useGetPackQuery(123), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).not.toHaveBeenCalled();
	});

	it('should return transformed data correctly', async () => {
		const packId = 123;
		const mockPackData = createMockInitialState();
		vi.mocked(tidyTrekAPI.get).mockResolvedValue(createMockApiResponse(mockPackData));

		const { result } = renderHook(() => useGetPackQuery(packId), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockPackData);
	});
});

describe('useGetPackListQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint', () => {
		renderHook(() => useGetPackListQuery(), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/packs/pack-list');
	});

	it('should be disabled when user is not authenticated', () => {
		// Mock unauthenticated state
		vi.mocked(useGetAuth).mockReturnValueOnce({
			user: null,
			isLoading: false,
			isAuthenticated: false,
			settings: null,
		});

		renderHook(() => useGetPackListQuery(), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).not.toHaveBeenCalled();
	});

	it('should return transformed data correctly', async () => {
		const mockPackListData = createMockPackList();
		vi.mocked(tidyTrekAPI.get).mockResolvedValue(createMockApiResponse(mockPackListData));

		const { result } = renderHook(() => useGetPackListQuery(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockPackListData);
	});
});

describe('useAddNewPackMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint for creating pack', async () => {
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({ data: {} });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useAddNewPackMutation(), { wrapper });

		result.current.mutate();

		await waitFor(() => {
			expect(tidyTrekAPI.post).toHaveBeenCalledWith('/packs');
		});
	});
});

describe('useImportPackMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call import API with URL and palette data', async () => {
		const packUrl = 'https://example.com/pack';
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({ data: {} });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useImportPackMutation(), { wrapper });

		result.current.mutate(packUrl);

		await waitFor(() => {
			expect(tidyTrekAPI.post).toHaveBeenCalledWith('/packs/import', {
				packUrl,
				paletteList: expect.any(Array),
			});
		});
	});
});

describe('useEditPackMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with pack data', async () => {
		const packData = {
			packId: 1,
			modifiedPack: createMockPack({ packName: 'Updated Pack' }),
		};

		vi.mocked(tidyTrekAPI.put).mockResolvedValue({ data: {} });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useEditPackMutation(), { wrapper });

		result.current.mutate(packData);

		await waitFor(() => {
			expect(tidyTrekAPI.put).toHaveBeenCalledWith('/packs/1', packData.modifiedPack);
		});
	});
});

describe('useDeletePackMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with pack ID', async () => {
		const packId = 1;
		vi.mocked(tidyTrekAPI.delete).mockResolvedValue({});

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useDeletePackMutation(), { wrapper });

		result.current.mutate(packId);

		await waitFor(() => {
			expect(tidyTrekAPI.delete).toHaveBeenCalledWith('/packs/1');
		});
	});
});

describe('useAddNewPackItemMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with pack item data', async () => {
		const packItem = { packId: 1, packCategoryId: 2 };
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({ data: {} });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useAddNewPackItemMutation(), { wrapper });

		result.current.mutate(packItem);

		await waitFor(() => {
			expect(tidyTrekAPI.post).toHaveBeenCalledWith('/packs/pack-items', packItem);
		});
	});
});

describe('useEditPackItemMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with item data', async () => {
		const itemData = {
			packItemId: 1,
			packItem: createMockPackItem({ packItemName: 'Updated Item' }),
		};

		vi.mocked(tidyTrekAPI.put).mockResolvedValue({ data: {} });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useEditPackItemMutation(), { wrapper });

		result.current.mutate(itemData);

		await waitFor(() => {
			expect(tidyTrekAPI.put).toHaveBeenCalledWith(
				'/packs/pack-items/1',
				itemData.packItem,
			);
		});
	});
});

describe('useDeletePackItemMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with item ID', async () => {
		const packItemId = 1;
		vi.mocked(tidyTrekAPI.delete).mockResolvedValue({});

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useDeletePackItemMutation(), { wrapper });

		result.current.mutate(packItemId);

		await waitFor(() => {
			expect(tidyTrekAPI.delete).toHaveBeenCalledWith('/packs/pack-items/1');
		});
	});
});

describe('useAddPackCategoryMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with category data', async () => {
		const categoryData = { packId: 1, categoryColor: '#ff0000' };
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({ data: {} });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useAddPackCategoryMutation(), { wrapper });

		result.current.mutate(categoryData);

		await waitFor(() => {
			expect(tidyTrekAPI.post).toHaveBeenCalledWith('/packs/categories/1', {
				categoryColor: '#ff0000',
			});
		});
	});
});
