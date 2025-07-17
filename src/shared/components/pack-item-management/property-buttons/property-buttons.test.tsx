import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { PropertyButtons } from './property-buttons';
import { wrappedRender } from '@/tests/wrapper-utils';
import type { PackItemProperty } from '@/types/pack-types';

interface PropertyButtonsProps {
	wornWeight: boolean;
	consumable: boolean;
	favorite: boolean;
	isDisabled?: boolean;
	onClick: (property: PackItemProperty) => void;
	className?: string;
	ariaLabelledBy?: string;
}

const createDefaultProps = (overrides?: Partial<PropertyButtonsProps>) => ({
	wornWeight: false,
	consumable: false,
	favorite: false,
	isDisabled: false,
	onClick: vi.fn(),
	...overrides,
});

describe('PropertyButtons', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders all three property buttons with accessibility', () => {
		const props = createDefaultProps({ ariaLabelledBy: 'test-label' });
		wrappedRender(<PropertyButtons {...props} />);

		expect(screen.getByLabelText(/toggle favorite/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/toggle consumables/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/toggle worn weight/i)).toBeInTheDocument();
		
		const group = screen.getByRole('group');
		expect(group).toHaveAttribute('aria-labelledby', 'test-label');
	});

	it('calls onClick with correct property values for each button', async () => {
		const mockOnClick = vi.fn();
		const props = createDefaultProps({ onClick: mockOnClick });
		const { user } = wrappedRender(<PropertyButtons {...props} />);

		await user.click(screen.getByLabelText(/toggle favorite on/i));
		expect(mockOnClick).toHaveBeenCalledWith({ favorite: true });

		await user.click(screen.getByLabelText(/toggle consumables on/i));
		expect(mockOnClick).toHaveBeenCalledWith({ consumable: true });

		await user.click(screen.getByLabelText(/toggle worn weight on/i));
		expect(mockOnClick).toHaveBeenCalledWith({ wornWeight: true });
	});

	it('toggles property values correctly when active', async () => {
		const mockOnClick = vi.fn();
		const props = createDefaultProps({
			favorite: true,
			onClick: mockOnClick,
		});
		const { user } = wrappedRender(<PropertyButtons {...props} />);

		await user.click(screen.getByLabelText(/toggle favorite off/i));
		expect(mockOnClick).toHaveBeenCalledWith({ favorite: false });
	});

	it('applies disabled styling when isDisabled is true', () => {
		const props = createDefaultProps({ isDisabled: true });
		wrappedRender(<PropertyButtons {...props} />);

		const favoriteButton = screen.getByLabelText(/toggle favorite/i);
		const favoriteIcon = favoriteButton.querySelector('svg');
		
		expect(favoriteIcon).toHaveClass(/disabledIcon/);
	});

	it('applies active classes when properties are true', () => {
		const props = createDefaultProps({
			favorite: true,
			consumable: true,
			wornWeight: true,
		});
		wrappedRender(<PropertyButtons {...props} />);

		const favoriteButton = screen.getByLabelText(/toggle favorite/i);
		const consumableButton = screen.getByLabelText(/toggle consumables/i);
		const wornWeightButton = screen.getByLabelText(/toggle worn weight/i);

		const favoriteIcon = favoriteButton.querySelector('svg');
		const consumableIcon = consumableButton.querySelector('svg');
		const wornWeightIcon = wornWeightButton.querySelector('svg');

		expect(favoriteIcon).toHaveClass(/favoriteActive/);
		expect(consumableIcon).toHaveClass(/consumableActive/);
		expect(wornWeightIcon).toHaveClass(/wornWeightActive/);
	});

	it('applies showOnHover class to inactive buttons', () => {
		const props = createDefaultProps({
			favorite: false,
			consumable: true,
			wornWeight: false,
		});
		wrappedRender(<PropertyButtons {...props} />);

		const favoriteButton = screen.getByLabelText(/toggle favorite/i);
		const consumableButton = screen.getByLabelText(/toggle consumables/i);
		const wornWeightButton = screen.getByLabelText(/toggle worn weight/i);

		// Inactive buttons should have showOnHover class
		expect(favoriteButton).toHaveClass(/showOnHover/);
		expect(wornWeightButton).toHaveClass(/showOnHover/);
		
		// Active button should not have showOnHover class
		expect(consumableButton).not.toHaveClass(/showOnHover/);
	});
});