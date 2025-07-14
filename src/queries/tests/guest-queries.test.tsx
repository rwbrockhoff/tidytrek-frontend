import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
	useViewPackQuery,
	useViewProfileQuery,
	type GuestQueryState,
	type GuestProfileViewState,
	isGuestProfileData,
} from '@/queries/guest-queries';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { createQueryWrapper } from '@/tests/wrapper-utils';
import { createMockPack, createMockCategory } from '@/tests/mocks/pack-mocks';
import { createMockUserProfile } from '@/tests/mocks/profile-mocks';
import { createMockSettings } from '@/tests/mocks/user-mocks';

// Mock API calls and utils
vi.mock('@/api/tidytrek-api', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
	},
}));

vi.mock('@/utils', () => ({
	extractData: vi.fn((res) => res.data),
	decode: vi.fn((id) => parseInt(id)),
}));

const createMockGuestInitialState = (): GuestQueryState => ({
	pack: createMockPack({ packPublic: true }),
	categories: [createMockCategory()],
	settings: createMockSettings(),
	userProfile: createMockUserProfile(),
});

const createMockGuestProfileState = (): GuestProfileViewState => ({
	userProfile: createMockUserProfile(),
	packThumbnailList: [],
	settings: createMockSettings(),
});

describe('useViewPackQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with decoded pack ID', () => {
		const packId = '123';

		renderHook(() => useViewPackQuery(packId), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/guests/pack/123');
	});

	it('should call default guest pack endpoint when no ID provided', () => {
		renderHook(() => useViewPackQuery(undefined), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/guests/pack');
	});

	it('should return transformed data correctly', async () => {
		const packId = '123';
		const mockData = createMockGuestInitialState();
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockData });

		const { result } = renderHook(() => useViewPackQuery(packId), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockData);
	});
});

describe('useViewProfileQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with username', () => {
		const username = 'testuser';

		renderHook(() => useViewProfileQuery(username), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/guests/user/testuser');
	});

	it('should return profile data when user exists and profile is public', async () => {
		const username = 'testuser';
		const mockData = createMockGuestProfileState();
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockData });

		const { result } = renderHook(() => useViewProfileQuery(username), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockData);
	});

	it('should handle private profile (null user data in 200 response)', async () => {
		const username = 'privateuser';
		const mockData = { userProfile: null, packThumbnailList: [], settings: null };
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockData });

		const { result } = renderHook(() => useViewProfileQuery(username), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data?.isPrivate).toBe(true);
		expect(result.current.data?.userProfile).toBe(null);
	});

	it('should handle user not found (404 error)', async () => {
		const username = 'nonexistentuser';
		const mockError = {
			response: { status: 404 },
		};
		vi.mocked(tidyTrekAPI.get).mockRejectedValue(mockError);

		const { result } = renderHook(() => useViewProfileQuery(username), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data?.notFound).toBe(true);
		expect(result.current.data?.userProfile).toBe(null);
	});

	it('should handle general errors', async () => {
		const username = 'erroruser';
		const mockError = {
			response: { status: 500 },
		};
		vi.mocked(tidyTrekAPI.get).mockRejectedValue(mockError);

		const { result } = renderHook(() => useViewProfileQuery(username), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data?.hasError).toBe(true);
		expect(result.current.data?.userProfile).toBe(null);
	});
});

describe('isGuestProfileData utility', () => {
	it('should identify guest profile data correctly', () => {
		const guestData = { userProfile: null, notFound: true };
		const regularData = { userProfile: createMockUserProfile() };

		expect(isGuestProfileData(guestData)).toBe(true);
		expect(isGuestProfileData(regularData)).toBe(false);
	});

	it('should return false for null or undefined data', () => {
		expect(isGuestProfileData(null)).toBe(false);
		expect(isGuestProfileData(undefined)).toBe(false);
	});
});
