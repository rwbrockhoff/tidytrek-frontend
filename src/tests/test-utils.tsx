import type { ReactElement } from 'react';
import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { vi } from 'vitest';
import { DEFAULT_PALETTE } from '@/styles/theme/palette-constants';

// Mock ResizeObserver - Required for Radix UI while testing
global.ResizeObserver =
	global.ResizeObserver ||
	vi.fn(() => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
	}));

type RenderOptions = Parameters<typeof renderComponent>[1];

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export const wrapper = ({ children }: PropsWithChildren) => {
	return <MemoryRouter>{children}</MemoryRouter>;
};

export const basicRender = (ui: ReactElement, options?: RenderOptions) => {
	return {
		...renderComponent(ui, options),
		user: userEvent.setup(),
	};
};

export const wrappedRender: typeof basicRender = (
	Component: ReactElement,
	options?: RenderOptions,
) => {
	const Wrapper = ({ children }: PropsWithChildren) => {
		return (
			<QueryClientProvider client={queryClient}>
				<Theme>
					<TooltipProvider>
						<div data-theme-palette={DEFAULT_PALETTE}>
							<MemoryRouter>{children}</MemoryRouter>
						</div>
					</TooltipProvider>
				</Theme>
			</QueryClientProvider>
		);
	};

	return basicRender(Component, { ...options, wrapper: Wrapper });
};
