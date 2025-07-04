import type { ReactElement } from 'react';
import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { DEFAULT_PALETTE } from '@/styles/theme/palette-constants';
import { basicRender } from './test-utils';

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

// Creates a QueryClient wrapper for testing hooks that use React Query
export const createQueryWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});

	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

// Full app wrapper with all providers
export const wrappedRender: typeof basicRender = (
	Component: ReactElement,
	options?: Parameters<typeof basicRender>[1],
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