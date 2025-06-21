import type { ReactElement } from 'react';
import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
				<div data-theme-palette="earth-tones">
					<MemoryRouter>{children}</MemoryRouter>
				</div>
			</QueryClientProvider>
		);
	};

	return basicRender(Component, { ...options, wrapper: Wrapper });
};
