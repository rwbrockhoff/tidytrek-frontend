import type { ReactElement } from 'react';
import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';

type RenderOptions = Parameters<typeof renderComponent>[1];

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
		return <MemoryRouter>{children}</MemoryRouter>;
	};

	return basicRender(Component, { ...options, wrapper: Wrapper });
};
