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
	showAlways?: boolean;
	onClick: (property: PackItemProperty) => void;
	className?: string;
	ariaLabelledBy?: string;
}

const createDefaultProps = (overrides?: Partial<PropertyButtonsProps>) => ({
	wornWeight: false,
	consumable: false,
	favorite: false,
	isDisabled: false,
	showAlways: false,
	onClick: vi.fn(),
	...overrides,
});

describe('PropertyButtons', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('Rendering', () => {
		it('renders all three property buttons with accessibility', () => {
			const props = createDefaultProps({ ariaLabelledBy: 'test-label' });
			wrappedRender(<PropertyButtons {...props} />);

			expect(screen.getByLabelText(/toggle favorite/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/toggle consumables/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/toggle worn weight/i)).toBeInTheDocument();
			
			const group = screen.getByRole('group');
			expect(group).toHaveAttribute('aria-labelledby', 'test-label');
		});
	});

	describe('Click Handling', () => {
		it('calls onClick with correct property values for each button', async () => {
			const mockOnClick = vi.fn();
			const props = createDefaultProps({
				onClick: mockOnClick,
				showAlways: true,
			});
			const { user } = wrappedRender(<PropertyButtons {...props} />);

			await user.click(screen.getByLabelText(/toggle favorite on/i));
			expect(mockOnClick).toHaveBeenCalledWith({ favorite: true });

			await user.click(screen.getByLabelText(/toggle consumables on/i));
			expect(mockOnClick).toHaveBeenCalledWith({ consumable: true });

			await user.click(screen.getByLabelText(/toggle worn weight on/i));
			expect(mockOnClick).toHaveBeenCalledWith({ wornWeight: true });
		});

		it('toggles property values correctly', async () => {
			const mockOnClick = vi.fn();
			const props = createDefaultProps({
				favorite: true,
				onClick: mockOnClick,
				showAlways: true,
			});
			const { user } = wrappedRender(<PropertyButtons {...props} />);

			await user.click(screen.getByLabelText(/toggle favorite off/i));
			expect(mockOnClick).toHaveBeenCalledWith({ favorite: false });
		});
	});

	describe('Disabled State', () => {
		it('applies disabled styling and prevents interaction', () => {
			const props = createDefaultProps({
				isDisabled: true,
				showAlways: true,
			});
			wrappedRender(<PropertyButtons {...props} />);

			const favoriteIcon = screen.getByLabelText(/toggle favorite/i);
			expect(favoriteIcon).toHaveClass(/disabledIcon/);
			expect(favoriteIcon).toHaveStyle({ 'pointer-events': 'none' });
		});
	});

	describe('Visibility Logic', () => {
		it('shows all buttons when showAlways is true', () => {
			const props = createDefaultProps({
				showAlways: true,
				favorite: false,
				consumable: false,
				wornWeight: false,
			});
			wrappedRender(<PropertyButtons {...props} />);

			const favoriteIcon = screen.getByLabelText(/toggle favorite/i);
			const consumableIcon = screen.getByLabelText(/toggle consumables/i);
			const wornWeightIcon = screen.getByLabelText(/toggle worn weight/i);

			expect(favoriteIcon).toHaveStyle({ opacity: '100' });
			expect(consumableIcon).toHaveStyle({ opacity: '100' });
			expect(wornWeightIcon).toHaveStyle({ opacity: '100' });
		});

		it('shows only active buttons when showAlways is false', () => {
			const props = createDefaultProps({
				showAlways: false,
				favorite: true,
				consumable: false,
				wornWeight: true,
			});
			wrappedRender(<PropertyButtons {...props} />);

			const favoriteIcon = screen.getByLabelText(/toggle favorite/i);
			const consumableIcon = screen.getByLabelText(/toggle consumables/i);
			const wornWeightIcon = screen.getByLabelText(/toggle worn weight/i);

			expect(favoriteIcon).toHaveStyle({ opacity: '100' });
			expect(consumableIcon).toHaveStyle({ opacity: '0' });
			expect(wornWeightIcon).toHaveStyle({ opacity: '100' });
		});
	});

	describe('Active State Styling', () => {
		it('applies active classes when properties are true', () => {
			const props = createDefaultProps({
				favorite: true,
				consumable: true,
				wornWeight: true,
				showAlways: true,
			});
			wrappedRender(<PropertyButtons {...props} />);

			expect(screen.getByLabelText(/toggle favorite/i)).toHaveClass(/favoriteActive/);
			expect(screen.getByLabelText(/toggle consumables/i)).toHaveClass(/consumableActive/);
			expect(screen.getByLabelText(/toggle worn weight/i)).toHaveClass(/wornWeightActive/);
		});
	});
});