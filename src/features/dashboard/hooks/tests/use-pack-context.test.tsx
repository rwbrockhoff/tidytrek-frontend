import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePackContext } from '../use-pack-context';
import { useGuestData } from '../use-guest-data';
import { useLocation } from 'react-router-dom';
import { createMockLocation } from '@/tests/mocks/router-mocks';
import { createMockSettings } from '@/tests/mocks/user-mocks';
import { createMockUserProfile } from '@/tests/mocks/profile-mocks';
import { PALETTE_NAMES } from '@/styles/palette/palette-constants';
import { createQueryWrapper } from '@/tests/wrapper-utils';

const [tidytrek, earthTones, southwest] = PALETTE_NAMES;

vi.mock('react-router-dom', () => ({
	useParams: vi.fn(() => ({ packId: 'abc123' })),
	useLocation: vi.fn(() => createMockLocation()),
}));

vi.mock('@/hooks/auth/use-get-auth', () => ({
	useGetAuth: vi.fn(() => ({
		settings: createMockSettings({
			palette: tidytrek,
			weightUnit: 'imperial',
			currencyUnit: 'USD',
		}),
	})),
}));

vi.mock('@/queries/pack-queries', () => ({
	useGetPackQuery: vi.fn(() => ({
		data: { pack: { palette: southwest } },
	})),
}));

vi.mock('@/queries/guest-queries', () => ({
	useViewPackQuery: vi.fn(() => ({ data: null })),
}));

vi.mock('../use-guest-data', () => ({
	useGuestData: vi.fn(() => ({ settings: null })),
}));

const mockUseGuestData = vi.mocked(useGuestData);

describe('usePackContext', () => {
	it('returns pack palette when available, otherwise user default', () => {
		const { result } = renderHook(() => usePackContext(), {
			wrapper: createQueryWrapper(),
		});

		// Pack has southwest palette, should override user's tidytrek
		expect(result.current.palette).toBe('southwest');
		expect(result.current.currency).toBe('USD');
	});

	it('handles imperial weight units correctly', () => {
		const { result } = renderHook(() => usePackContext(), {
			wrapper: createQueryWrapper(),
		});

		expect(result.current.weightUnit.base).toBe('lb');
		expect(result.current.weightUnit.detail).toBe('oz');
		expect(result.current.weightUnit.isMetric).toBe(false);
	});

	it('identifies guest routes correctly', () => {
		vi.mocked(useLocation).mockReturnValue(createMockLocation('/pk/xyz456'));

		const { result } = renderHook(() => usePackContext(), {
			wrapper: createQueryWrapper(),
		});
		expect(result.current.isGuestView).toBe(true);
	});

	it('uses pack creator settings for guest views', () => {
		vi.mocked(useLocation).mockReturnValue(createMockLocation('/pk/xyz456'));
		mockUseGuestData.mockReturnValue({
			userProfile: createMockUserProfile(),

			settings: createMockSettings({
				palette: earthTones,
				weightUnit: 'metric',
				currencyUnit: 'EUR',
			}),
		});

		const { result } = renderHook(() => usePackContext(), {
			wrapper: createQueryWrapper(),
		});

		// Should use creator's settings (EUR/metric), not viewer's (USD/imperial)
		expect(result.current.currency).toBe('EUR');
		expect(result.current.weightUnit.base).toBe('kg');
		expect(result.current.weightUnit.detail).toBe('g');
		expect(result.current.weightUnit.isMetric).toBe(true);
	});
});
