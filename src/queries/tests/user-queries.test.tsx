import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
	useGetAuthStatusQuery,
	useLoginMutation,
	useLogoutMutation,
	type AuthStatusResponse,
} from '@/queries/user-queries';
import { tidyTrekAPI } from '@/api/tidytrekAPI';
import supabase from '@/api/supabaseClient';
import {
	createMockLoginUser,
	createMockUser,
	createMockSettings,
} from '@/tests/mocks/user-mocks';
import { createQueryWrapper } from '@/tests/wrapper-utils';

vi.mock('@/api/tidytrekAPI', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
		post: vi.fn(),
		delete: vi.fn(),
	},
}));

vi.mock('@/api/supabaseClient', () => ({
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

	it('should fetch auth status successfully', async () => {
		vi.mocked(tidyTrekAPI.get).mockResolvedValue({ data: mockAuthResponse });

		const { result } = renderHook(() => useGetAuthStatusQuery(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockAuthResponse);
		expect(tidyTrekAPI.get).toHaveBeenCalledWith('/auth/status');
	});

	it('should handle auth status errors', async () => {
		const error = new Error('Unauthorized');
		vi.mocked(tidyTrekAPI.get).mockRejectedValue(error);

		const { result } = renderHook(() => useGetAuthStatusQuery(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error).toBe(error);
	});
});

describe('useLoginMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call login API and invalidate auth queries on success', async () => {
		const loginData = createMockLoginUser();
		const loginResponse = { newUser: false, message: 'Login successful' };

		vi.mocked(tidyTrekAPI.post).mockResolvedValue({ data: loginResponse });

		// create mutation
		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useLoginMutation(), { wrapper });

		result.current.mutate(loginData);

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(tidyTrekAPI.post).toHaveBeenCalledWith('/auth/login', loginData);
		expect(result.current.data).toEqual(loginResponse);
	});
});

describe('useLogoutMutation', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should sign out from Supabase and call logout API', async () => {
		vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null });
		vi.mocked(tidyTrekAPI.post).mockResolvedValue({});

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useLogoutMutation(), { wrapper });

		result.current.mutate();

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(supabase.auth.signOut).toHaveBeenCalled();
		expect(tidyTrekAPI.post).toHaveBeenCalledWith('/auth/logout');
	});

	it('should handle logout errors', async () => {
		const error = new Error('Logout failed');
		vi.mocked(supabase.auth.signOut).mockRejectedValue(error);

		const wrapper = createQueryWrapper();
		const { result } = renderHook(() => useLogoutMutation(), { wrapper });

		result.current.mutate();

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error).toBe(error);
	});
});
