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
import { createMockInitialState, createMockPackList } from '@/tests/mocks/pack-mocks';

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

	it('should call correct API endpoint with decoded ID', () => {
		const packId = '123';

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

	it('should return transformed data correctly', async () => {
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

	it('should return transformed data correctly', async () => {
		const mockPackListData = createMockPackList();
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockPackListData });

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
