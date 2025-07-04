import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock ResizeObserver - Required for Radix UI while testing
global.ResizeObserver =
	global.ResizeObserver ||
	vi.fn(() => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
	}));

afterEach(() => {
  cleanup();
});
