import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
	useGetPackQuery,
	useGetPackListQuery,
	useAddNewPackMutation,
	useImportPackMutation,
} from '@/queries/pack-queries';
import { tidyTrekAPI } from '@/api/tidytrekAPI';
import { createQueryWrapper } from '@/tests/wrapper-utils';
import {
	createMockInitialState,
	createMockPackList,
	createMockPackWithCategories,
	createMockPack,
} from '@/tests/mocks/pack-mocks';

// Mock API calls and utils
vi.mock('@/api/tidytrekAPI', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
	},
}));

vi.mock('@/utils', () => ({
	extractData: vi.fn((res) => res.data),
	decode: vi.fn((id) => parseInt(id)),
}));

describe('useGetPackQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should fetch pack data when packId is provided', async () => {
		const packId = '123';
		const mockPackData = createMockInitialState();
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockPackData });

		const { result } = renderHook(() => useGetPackQuery(packId), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockPackData);
		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/packs/123');
	});

	it('should be disabled when packId is undefined', () => {
		const { result } = renderHook(() => useGetPackQuery(undefined), {
			wrapper: createQueryWrapper(),
		});

		expect(result.current.isPending).toBe(true);
		expect(tidyTrekAPI.get).not.toHaveBeenCalled();
	});

	it('should handle pack fetch errors', async () => {
		const packId = '123';
		const error = new Error('Pack not found');
		vi.mocked(tidyTrekAPI.get).mockRejectedValue(error);

		const { result } = renderHook(() => useGetPackQuery(packId), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error).toBe(error);
	});
});

describe('useGetPackListQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should fetch pack list successfully', async () => {
		const mockPackListData = createMockPackList();
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockPackListData });

		const { result } = renderHook(() => useGetPackListQuery(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockPackListData);
		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/packs/pack-list');
	});

	it('should handle pack list fetch errors', async () => {
		const error = new Error('Failed to fetch pack list');
		vi.mocked(tidyTrekAPI.get).mockRejectedValue(error);

		const { result } = renderHook(() => useGetPackListQuery(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error).toBe(error);
	});
});

describe('useAddNewPackMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should create new pack and invalidate queries on success', async () => {
		const newPackData = createMockPackWithCategories({ 
			pack: createMockPack({ packId: 3 })
		});
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({ data: newPackData });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useAddNewPackMutation(), { wrapper });

		result.current.mutate();

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(tidyTrekAPI.post).toHaveBeenCalledWith('/packs');
		expect(result.current.data).toEqual(newPackData);
	});

	it('should handle pack creation errors', async () => {
		const error = new Error('Failed to create pack');
		vi.mocked(tidyTrekAPI.post).mockRejectedValue(error);

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useAddNewPackMutation(), { wrapper });

		result.current.mutate();

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error).toBe(error);
	});
});

describe('useImportPackMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should import pack from URL and invalidate queries on success', async () => {
		const packUrl = 'https://example.com/pack';
		const importedPackData = createMockPackWithCategories({ 
			pack: createMockPack({ packId: 4 })
		});
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({ data: importedPackData });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useImportPackMutation(), { wrapper });

		result.current.mutate(packUrl);

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(tidyTrekAPI.post).toHaveBeenCalledWith('/packs/import', {
			packUrl,
			paletteList: expect.any(Array),
		});
		expect(result.current.data).toEqual(importedPackData);
	});

	it('should handle pack import errors', async () => {
		const packUrl = 'https://invalid-url.com/pack';
		const error = new Error('Invalid pack URL');
		vi.mocked(tidyTrekAPI.post).mockRejectedValue(error);

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useImportPackMutation(), { wrapper });

		result.current.mutate(packUrl);

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error).toBe(error);
	});
});
