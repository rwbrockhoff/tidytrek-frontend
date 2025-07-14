import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useUpdateSettingsMutation } from '@/queries/user-settings-queries';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { createQueryWrapper } from '@/tests/wrapper-utils';

// Mock API calls and utils
vi.mock('@/api/tidytrek-api', () => ({
	tidyTrekAPI: {
		put: vi.fn(),
	},
}));

vi.mock('@/utils', () => ({
	extractData: vi.fn((res) => res.data),
}));

describe('useUpdateSettingsMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint with settings data', async () => {
		const settingsUpdate = { darkMode: true, weightUnit: 'kg' as const };
		vi.mocked(tidyTrekAPI.put).mockResolvedValue({
			data: { message: 'Settings updated' },
		});

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useUpdateSettingsMutation(), { wrapper });

		result.current.mutate(settingsUpdate);

		await waitFor(() => {
			expect(tidyTrekAPI.put).toHaveBeenCalledWith('/user-settings', settingsUpdate);
		});
	});

	it('should call API with partial settings update', async () => {
		const partialUpdate = { publicProfile: false, darkMode: true };
		vi.mocked(tidyTrekAPI.put).mockResolvedValue({
			data: { message: 'Settings updated' },
		});

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useUpdateSettingsMutation(), { wrapper });

		result.current.mutate(partialUpdate);

		await waitFor(() => {
			expect(tidyTrekAPI.put).toHaveBeenCalledWith('/user-settings', partialUpdate);
		});
	});
});
