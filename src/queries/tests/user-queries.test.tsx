import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
	useGetAuthStatusQuery,
	useLoginMutation,
	useLogoutMutation,
	type AuthStatusResponse,
} from '@/queries/user-queries';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import supabase from '@/api/supabase-client';
import {
	createMockLoginUser,
	createMockUser,
	createMockSettings,
} from '@/tests/mocks/user-mocks';
import { createQueryWrapper } from '@/tests/wrapper-utils';

vi.mock('@/api/tidytrek-api', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
		post: vi.fn(),
		delete: vi.fn(),
	},
}));

vi.mock('@/api/supabase-client', () => ({
	default: {
		auth: {
			signOut: vi.fn(),
		},
	},
}));

vi.mock('@/utils', () => ({
	extractData: vi.fn((res) => res.data),
}));

const mockAuthResponse: AuthStatusResponse = {
	isAuthenticated: true,
	user: createMockUser(),
	settings: createMockSettings(),
};

describe('useGetAuthStatusQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call correct API endpoint', () => {
		renderHook(() => useGetAuthStatusQuery(), {
			wrapper: createQueryWrapper(),
		});

		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/auth/status');
	});

	it('should return transformed auth data correctly', async () => {
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockAuthResponse });

		const { result } = renderHook(() => useGetAuthStatusQuery(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockAuthResponse);
	});
});

describe('useLoginMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call login API with correct data', async () => {
		const loginData = createMockLoginUser();
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({ data: {} });

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useLoginMutation(), { wrapper });

		result.current.mutate(loginData);

		await waitFor(() => {
			expect(tidyTrekAPI.post).toHaveBeenCalledWith('/auth/login', loginData);
		});
	});
});

describe('useLogoutMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call both Supabase signOut and logout API', async () => {
		vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null });
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({});

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useLogoutMutation(), { wrapper });

		result.current.mutate();

		await waitFor(() => {
			expect(supabase.auth.signOut).toHaveBeenCalled();
			expect(tidyTrekAPI.post).toHaveBeenCalledWith('/auth/logout');
		});
	});
});
