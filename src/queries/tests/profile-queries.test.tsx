import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetProfileQuery, type ProfileQueryState } from '@/queries/profile-queries';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { createQueryWrapper } from '@/tests/wrapper-utils';
import { createMockUserProfile } from '@/tests/mocks/profile-mocks';
import { createMockPack } from '@/tests/mocks/pack-mocks';
import { createMockSettings } from '@/tests/mocks/user-mocks';

// Mock API calls
vi.mock('@/api/tidytrek-api', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
	},
}));

const createMockProfileState = (): ProfileQueryState => ({
	userProfile: createMockUserProfile(),
	packThumbnailList: [createMockPack()],
	settings: createMockSettings(),
});

describe('useGetProfileQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint', () => {
		renderHook(() => useGetProfileQuery(), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/profile/');
	});

	it('should return profile data when API call succeeds', async () => {
		const mockData = createMockProfileState();
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockData });

		const { result } = renderHook(() => useGetProfileQuery(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockData);
	});

	it('should handle API errors and return error state', async () => {
		const mockError = new Error('API Error');
		vi.mocked(tidyTrekAPI.get).mockRejectedValue(mockError);

		const { result } = renderHook(() => useGetProfileQuery(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data?.hasError).toBe(true);
		expect(result.current.data?.userProfile).toBe(null);
		expect(result.current.data?.packThumbnailList).toEqual([]);
		expect(result.current.data?.settings).toBe(null);
	});
});
