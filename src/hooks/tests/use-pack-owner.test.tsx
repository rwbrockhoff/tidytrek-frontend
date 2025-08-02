import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePackOwner } from '../auth/use-pack-owner';
import * as useGetAuth from '../auth/use-get-auth';
import * as packQueries from '@/queries/pack-queries';
import { createMockUser } from '@/tests/mocks/user-mocks';
import { createMockPack } from '@/tests/mocks/pack-mocks';
import { createQueryResponse } from '@/tests/mocks/query-mocks';
import { createQueryWrapper } from '@/tests/wrapper-utils';
import type { PackQueryState } from '@/types/pack-types';

vi.mock('../auth/use-get-auth');
vi.mock('@/queries/pack-queries');
vi.mock('react-router-dom', () => ({
	useParams: () => ({ packId: '1' }),
}));

describe('usePackOwner', () => {
	const mockUser = createMockUser();
	const mockPack = createMockPack({ userId: mockUser.userId });

	beforeEach(() => {
		vi.mocked(packQueries.useGetPackQuery).mockReturnValue(
			createQueryResponse<PackQueryState>({ 
				isLoading: true,
				isSuccess: false,
				status: 'pending'
			})
		);
	});

	it('should return true for pack owner', () => {
		vi.mocked(useGetAuth.useGetAuth).mockReturnValue({
			user: mockUser,
			isLoading: false,
			isAuthenticated: true,
			settings: null,
		});

		const { result } = renderHook(() => usePackOwner({ pack: mockPack }), {
			wrapper: createQueryWrapper(),
		});

		expect(result.current.isPackOwner).toBe(true);
		expect(result.current.packOwnerId).toBe(mockUser.userId);
	});

	it('should return false for different user', () => {
		vi.mocked(useGetAuth.useGetAuth).mockReturnValue({
			user: mockUser,
			isLoading: false,
			isAuthenticated: true,
			settings: null,
		});

		const otherUsersPack = createMockPack({ userId: 'differentUserId' });

		const { result } = renderHook(() => usePackOwner({ pack: otherUsersPack }), {
			wrapper: createQueryWrapper(),
		});

		expect(result.current.isPackOwner).toBe(false);
		expect(result.current.packOwnerId).toBe('differentUserId');
	});

	it('should return false when not logged in', () => {
		vi.mocked(useGetAuth.useGetAuth).mockReturnValue({
			user: null,
			isLoading: false,
			isAuthenticated: false,
			settings: null,
		});

		const { result } = renderHook(() => usePackOwner({ pack: mockPack }), {
			wrapper: createQueryWrapper(),
		});

		expect(result.current.isPackOwner).toBe(false);
	});

	it('should fetch pack when given packId', () => {
		vi.mocked(useGetAuth.useGetAuth).mockReturnValue({
			user: mockUser,
			isLoading: false,
			isAuthenticated: true,
			settings: null,
		});

		const mockQueryResponse = createQueryResponse<PackQueryState>({
			data: { 
				packList: [],
				pack: mockPack,
				categories: []
			},
			isLoading: false,
		});
		vi.mocked(packQueries.useGetPackQuery).mockReturnValue(mockQueryResponse);

		const { result } = renderHook(() => usePackOwner({ packId: 1 }), {
			wrapper: createQueryWrapper(),
		});

		expect(packQueries.useGetPackQuery).toHaveBeenCalledWith(1);
		expect(result.current.isPackOwner).toBe(true);
	});
});