import type { ReactElement } from 'react';
import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Extract the options type from React Testing Library's render function
// Gets function type -> extracts parameter types -> gets position 1 (render options)
type RenderOptions = Parameters<typeof renderComponent>[1];

export const basicRender = (ui: ReactElement, options?: RenderOptions) => {
	return {
		...renderComponent(ui, options),
		user: userEvent.setup(),
	};
};
