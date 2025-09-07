import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUserPermissions } from '@/hooks/auth/use-user-permissions';
import { createMockUser } from '@/tests/mocks/user-mocks';

vi.mock('@/hooks/auth/use-auth', () => ({
	useAuth: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
	useParams: vi.fn(() => ({})),
	useLocation: vi.fn(() => ({ pathname: '/' })),
	useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
}));

vi.mock('@/queries/pack-queries', () => ({
	useGetPackQuery: vi.fn(() => ({ data: null, isLoading: false })),
}));

import { useAuth } from '@/hooks/auth/use-auth';
import { useParams } from 'react-router-dom';

const mockUseGetAuth = vi.mocked(useAuth);
const mockUseParams = vi.mocked(useParams);

describe('useUserPermissions', () => {
	it('returns guest permissions when not authenticated', () => {
		mockUseGetAuth.mockReturnValue({
			isAuthenticated: false,
			isLoading: false,
			user: null,
			settings: null,
			subscriptionStatus: false,
		});
		mockUseParams.mockReturnValue({});

		const { result } = renderHook(() => useUserPermissions());

		expect(result.current.permissionLevel).toBe('guest');
		expect(result.current.isGuest).toBe(true);
		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.isCreator).toBe(false);
	});

	it('returns creator permissions when user owns pack', () => {
		const mockUser = createMockUser();
		const mockPack = { userId: mockUser.userId };

		mockUseGetAuth.mockReturnValue({
			isAuthenticated: true,
			isLoading: false,
			user: mockUser,
			settings: null,
			subscriptionStatus: false,
		});
		mockUseParams.mockReturnValue({});

		const { result } = renderHook(() => useUserPermissions({ pack: mockPack }));

		expect(result.current.permissionLevel).toBe('creator');
		expect(result.current.isCreator).toBe(true);
		expect(result.current.isAuthenticated).toBe(true);
	});

	it('returns creator permissions when viewing own profile', () => {
		const mockUser = createMockUser();

		mockUseGetAuth.mockReturnValue({
			isAuthenticated: true,
			isLoading: false,
			user: mockUser,
			settings: null,
			subscriptionStatus: false,
		});
		mockUseParams.mockReturnValue({ userId: mockUser.userId });

		const { result } = renderHook(() => useUserPermissions());

		expect(result.current.permissionLevel).toBe('creator');
		expect(result.current.isCreator).toBe(true);
	});

	it('returns authenticated permissions when user is not creator', () => {
		const mockUser = createMockUser();
		const otherUserPack = { userId: 'different-user' };

		mockUseGetAuth.mockReturnValue({
			isAuthenticated: true,
			isLoading: false,
			user: mockUser,
			settings: null,
			subscriptionStatus: false,
		});
		mockUseParams.mockReturnValue({});

		const { result } = renderHook(() => useUserPermissions({ pack: otherUserPack }));

		expect(result.current.permissionLevel).toBe('authenticated');
		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.isCreator).toBe(false);
	});

	it('handles loading state', () => {
		mockUseGetAuth.mockReturnValue({
			isAuthenticated: false,
			subscriptionStatus: false,
			isLoading: true,
			user: null,
			settings: null,
		});
		mockUseParams.mockReturnValue({});

		const { result } = renderHook(() => useUserPermissions());

		expect(result.current.isLoading).toBe(true);
	});

	it('returns creator permissions on profile route with no userId param', () => {
		const mockUser = createMockUser();

		mockUseGetAuth.mockReturnValue({
			isAuthenticated: true,
			isLoading: false,
			user: mockUser,
			settings: null,
			subscriptionStatus: false,
		});
		mockUseParams.mockReturnValue({});

		const { result } = renderHook(() => useUserPermissions());

		expect(result.current.permissionLevel).toBe('creator');
		expect(result.current.isCreator).toBe(true);
	});
});
