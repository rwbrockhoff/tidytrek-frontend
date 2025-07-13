import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
	useGetGearClosetQuery,
	useAddGearClosetItemMutation,
	useEditGearClosetItemMutation,
	useDeleteGearClosetItemMutation,
} from '@/queries/closet-queries';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { createQueryWrapper } from '@/tests/wrapper-utils';
import {
	createMockGearClosetList,
	createMockGearClosetItem,
} from '@/tests/mocks/closet-mocks';

// Mock API calls and utils
vi.mock('@/api/tidytrekAPI', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		delete: vi.fn(),
	},
}));

vi.mock('@/utils', () => ({
	extractData: vi.fn((res) => res.data),
}));

describe('useGetGearClosetQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint', () => {
		renderHook(() => useGetGearClosetQuery(), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/closet/');
	});

	it('should return transformed data correctly', async () => {
		const mockGearClosetData = createMockGearClosetList();
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockGearClosetData });

		const { result } = renderHook(() => useGetGearClosetQuery(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockGearClosetData);
	});
});

describe('useAddGearClosetItemMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint for adding items', async () => {
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({ data: {} });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useAddGearClosetItemMutation(), { wrapper });

		result.current.mutate();

		await waitFor(() => {
			expect(tidyTrekAPI.post).toHaveBeenCalledWith('/closet/items');
		});
	});
});

describe('useEditGearClosetItemMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with item data', async () => {
		const gearItem = createMockGearClosetItem({ packItemId: 1 });
		vi.mocked(tidyTrekAPI.put).mockResolvedValue({ data: {} });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useEditGearClosetItemMutation(), { wrapper });

		result.current.mutate(gearItem);

		await waitFor(() => {
			expect(tidyTrekAPI.put).toHaveBeenCalledWith('/closet/items/1', gearItem);
		});
	});
});

describe('useDeleteGearClosetItemMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with item ID', async () => {
		const packItemId = 1;
		vi.mocked(tidyTrekAPI.delete).mockResolvedValue({});

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useDeleteGearClosetItemMutation(), { wrapper });

		result.current.mutate(packItemId);

		await waitFor(() => {
			expect(tidyTrekAPI.delete).toHaveBeenCalledWith('/closet/items/1');
		});
	});
});
