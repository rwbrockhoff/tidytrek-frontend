import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRedirects } from '../ui/use-redirects';
import { tidyTrekAPI } from '@/api/tidytrek-api';

vi.mock('@/api/tidytrekAPI', () => ({
	tidyTrekAPI: {
		post: vi.fn(),
		defaults: { baseURL: 'http://localhost:4001' },
	},
}));

const mockPost = vi.mocked(tidyTrekAPI.post);

describe('useRedirects', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns redirect URL for trusted domains', async () => {
		mockPost.mockResolvedValue({
			data: { trusted: true, redirectUrl: 'https://youtube.com/test' },
		});

		const { result } = renderHook(() => useRedirects());

		let response: any;
		await act(async () => {
			response = await result.current.checkRedirect('https://youtube.com/test');
		});

		expect(response).toEqual({ redirectUrl: 'https://youtube.com/test' });
	});

	it('returns warning for untrusted domains', async () => {
		mockPost.mockResolvedValue({
			data: {
				warning: true,
				message: "You're about to leave TidyTrek",
				destination: 'badsite.com',
				continueUrl: 'https://badsite.com',
			},
		});

		const { result } = renderHook(() => useRedirects());

		let response: any;
		await act(async () => {
			response = await result.current.checkRedirect('https://badsite.com');
		});

		expect(response.warning).toBeDefined();
		expect(response.warning?.domain).toBe('badsite.com');
	});
});
