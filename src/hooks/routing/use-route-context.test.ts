import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGuestRoute } from './use-route-context';
import { createMockLocation } from '@/tests/mocks/router-mocks';

vi.mock('react-router-dom', () => ({
	useLocation: vi.fn(),
}));

import { useLocation } from 'react-router-dom';

describe('useGuestRoute', () => {
	it('identifies guest pack routes', () => {
		vi.mocked(useLocation).mockReturnValue(createMockLocation('/pk/abc123'));

		const { result } = renderHook(() => useGuestRoute());
		expect(result.current).toBe(true);
	});

	it('identifies guest user routes', () => {
		vi.mocked(useLocation).mockReturnValue(createMockLocation('/u/johndoe'));

		const { result } = renderHook(() => useGuestRoute());
		expect(result.current).toBe(true);
	});

	it('returns false for non guest routes', () => {
		vi.mocked(useLocation).mockReturnValue(createMockLocation('/'));

		const { result } = renderHook(() => useGuestRoute());
		expect(result.current).toBe(false);
	});
});
