import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
	useGetProfileSettingsQuery,
	useUpdateUsernameMutation,
	useEditProfileMutation,
} from '@/queries/profile-settings-queries';
import { tidyTrekAPI } from '@/api/tidytrekAPI';
import { createQueryWrapper } from '@/tests/wrapper-utils';

// Mock API calls and utils
vi.mock('@/api/tidytrekAPI', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
		put: vi.fn(),
	},
}));

vi.mock('@/utils', () => ({
	extractData: vi.fn((res) => res.data),
}));

describe('Profile Settings Queries', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should fetch profile settings from correct endpoint', () => {
		renderHook(() => useGetProfileSettingsQuery(), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/profile-settings/');
	});

	it('should update username with correct data', async () => {
		const userInfo = { username: 'newuser', trailName: 'TrailBlazer' };
		vi.mocked(tidyTrekAPI.put).mockResolvedValue({ data: { message: 'Updated' } });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useUpdateUsernameMutation(), { wrapper });

		result.current.mutate(userInfo);

		await waitFor(() => {
			expect(tidyTrekAPI.put).toHaveBeenCalledWith(
				'/profile-settings/username',
				userInfo,
			);
		});
	});

	it('should update profile info with correct data', async () => {
		const profileInfo = {
			userBio: 'Avid hiker and backpacker here in Colorado!',
			userLocation: 'Fort Collins',
			username: 'hikerBiker123',
			trailName: 'Sunny',
		};
		vi.mocked(tidyTrekAPI.put).mockResolvedValue({ data: { message: 'Updated' } });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useEditProfileMutation(), { wrapper });

		result.current.mutate(profileInfo);

		await waitFor(() => {
			expect(tidyTrekAPI.put).toHaveBeenCalledWith('/profile-settings/', profileInfo);
		});
	});
});
