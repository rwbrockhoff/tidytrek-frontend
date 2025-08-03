import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetAuth } from '../auth/use-get-auth';
import * as userQueries from '@/queries/user-queries';
import type { AuthStatusResponse } from '@/queries/user-queries';
import { createMockUser, createMockSettings } from '@/tests/mocks/user-mocks';
import { createQueryResponse } from '@/tests/mocks/query-mocks';
import { createQueryWrapper } from '@/tests/wrapper-utils';

// Mock the user queries
vi.mock('@/queries/user-queries', () => ({
	useGetAuthStatusQuery: vi.fn(),
}));


describe('useGetAuth Hook', () => {
	it('returns loading state when query is loading', () => {
		const queryResponse = createQueryResponse<AuthStatusResponse>({ isLoading: true });
		vi.mocked(userQueries.useGetAuthStatusQuery).mockReturnValue(queryResponse);

		const { result } = renderHook(() => useGetAuth(), {
			wrapper: createQueryWrapper(),
		});

		expect(result.current.isLoading).toBe(true);
		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.user).toBe(null);
		expect(result.current.settings).toBe(null);
	});

	it('returns authenticated user data when query succeeds', async () => {
		const mockData: AuthStatusResponse = {
			isAuthenticated: true,
			user: createMockUser(),
			settings: createMockSettings(),
		};

		const queryResponse = createQueryResponse<AuthStatusResponse>({ data: mockData });
		vi.mocked(userQueries.useGetAuthStatusQuery).mockReturnValue(queryResponse);

		const { result } = renderHook(() => useGetAuth(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isAuthenticated).toBe(true);
			expect(result.current.user).toEqual(mockData.user);
			expect(result.current.settings).toEqual(mockData.settings);
		});
	});

	it('returns unauthenticated state when no data', () => {
		const queryResponse = createQueryResponse<AuthStatusResponse>({ data: undefined });
		vi.mocked(userQueries.useGetAuthStatusQuery).mockReturnValue(queryResponse);

		const { result } = renderHook(() => useGetAuth(), {
			wrapper: createQueryWrapper(),
		});

		expect(result.current.isLoading).toBe(false);
		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.user).toBe(null);
		expect(result.current.settings).toBe(null);
	});

	it('handles null values for expected data', () => {
		const mockData: AuthStatusResponse = {
			isAuthenticated: true,
			user: null,
			settings: null,
		};

		const queryResponse = createQueryResponse<AuthStatusResponse>({ data: mockData });
		vi.mocked(userQueries.useGetAuthStatusQuery).mockReturnValue(queryResponse);

		const { result } = renderHook(() => useGetAuth(), {
			wrapper: createQueryWrapper(),
		});

		expect(result.current.isLoading).toBe(false);
		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.user).toBe(null);
		expect(result.current.settings).toBe(null);
	});
});
