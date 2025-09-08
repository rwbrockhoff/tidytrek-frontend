/* eslint-disable react-refresh/only-export-components */
// convenience for testing

import type { ReactElement } from 'react';
import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { DEFAULT_PALETTE } from '@/styles/palette/palette-constants';
import { basicRender } from './test-utils';
import { AuthContext, type AuthContextValue } from '@/contexts/auth-context';
import { createMockUser, createMockSettings } from '@/tests/mocks/user-mocks';

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

const mockAuthValue: AuthContextValue = {
	isLoading: false,
	isAuthenticated: true,
	subscriptionStatus: false,
	user: createMockUser(),
	settings: createMockSettings(),
};

export const MockAuthProvider = ({ children }: PropsWithChildren) => {
	return <AuthContext.Provider value={mockAuthValue}>{children}</AuthContext.Provider>;
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
		<QueryClientProvider client={queryClient}>
			<MockAuthProvider>{children}</MockAuthProvider>
		</QueryClientProvider>
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
				<MockAuthProvider>
					<Theme>
						<TooltipProvider>
							<div data-theme-palette={DEFAULT_PALETTE}>
								<MemoryRouter>{children}</MemoryRouter>
							</div>
						</TooltipProvider>
					</Theme>
				</MockAuthProvider>
			</QueryClientProvider>
		);
	};

	return basicRender(Component, { ...options, wrapper: Wrapper });
};
