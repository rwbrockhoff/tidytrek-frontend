import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { PackInfoForm } from './pack-info-form';
import { wrappedRender } from '@/tests/wrapper-utils';
import { createMockPack } from '@/tests/mocks/pack-mocks';
import type { Pack } from '@/types/pack-types';

//todo: Test form validation errors

describe('PackInfoForm', () => {
	const mockHandleFormChange = vi.fn();
	const mockHandleCheckBox = vi.fn();

	const renderPackForm = (pack: Partial<Pack> = {}) => {
		const mockPack = createMockPack(pack);
		return wrappedRender(
			<PackInfoForm
				pack={mockPack}
				handleFormChange={mockHandleFormChange}
				handleCheckBox={mockHandleCheckBox}
			/>,
		);
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('Form UI', () => {
		it('renders fields for trip details', () => {
			renderPackForm({
				packName: 'Test Pack',
				packDescription: 'Test Description',
				packLocationTag: 'Yosemite',
				packSeasonTag: 'Summer',
				packDurationTag: '3 days',
				packDistanceTag: '50 miles',
			});

			expect(screen.getByDisplayValue('Test Pack')).toBeInTheDocument();
			expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();

			expect(screen.getByDisplayValue('Yosemite')).toBeInTheDocument();
			expect(screen.getByDisplayValue('Summer')).toBeInTheDocument();
			expect(screen.getByDisplayValue('3 days')).toBeInTheDocument();
			expect(screen.getByDisplayValue('50 miles')).toBeInTheDocument();
		});

		it('shows affiliate description field when affiliate is enabled', () => {
			renderPackForm({
				packAffiliate: true,
				packAffiliateDescription: 'Custom affiliate message',
			});

			expect(screen.getByDisplayValue('Custom affiliate message')).toBeInTheDocument();
			expect(screen.getByLabelText(/custom affiliate message/i)).toBeInTheDocument();
		});

		it('hides affiliate description field when affiliate is disabled', () => {
			renderPackForm({ packAffiliate: false });

			expect(
				screen.queryByLabelText(/custom affiliate message/i),
			).not.toBeInTheDocument();
		});
	});

	describe('Form Interactions', () => {
		it('calls handleFormChange when text inputs change', async () => {
			const { user } = renderPackForm();

			const nameInput = screen.getByLabelText(/pack name/i);
			await user.type(nameInput, 'a');

			expect(mockHandleFormChange).toHaveBeenCalled();
		});

		it('calls handleFormChange when textarea changes', async () => {
			const { user } = renderPackForm();

			const descriptionInput = screen.getByLabelText(/pack description/i);
			await user.type(descriptionInput, 'New description');

			expect(mockHandleFormChange).toHaveBeenCalled();
		});

		it('calls handleCheckBox when public switch is toggled', async () => {
			const { user } = renderPackForm({ packPublic: false });

			const publicSwitch = screen.getByRole('switch', { name: /public/i });
			await user.click(publicSwitch);

			expect(mockHandleCheckBox).toHaveBeenCalledWith({ packPublic: true });
		});
	});

	describe('Pack URL', () => {
		it('calls handleFormChange when URL fields are modified', async () => {
			const { user } = renderPackForm();

			const urlInput = screen.getByLabelText(/^Link$/i);
			await user.type(urlInput, 'http://example.com');

			expect(mockHandleFormChange).toHaveBeenCalled();
		});

		it('calls handleFormChange when URL display text is modified', async () => {
			const { user } = renderPackForm();

			const urlNameInput = screen.getByLabelText(/display text/i);
			await user.type(urlNameInput, 'My Gear Video');

			expect(mockHandleFormChange).toHaveBeenCalled();
		});
	});

	describe('Form Content', () => {
		it('handles empty pack values', () => {
			renderPackForm({
				packName: undefined,
				packDescription: undefined,
				packLocationTag: undefined,
			});

			const nameInput = screen.getByLabelText(/pack name/i);
			const descriptionInput = screen.getByLabelText(/pack description/i);
			const locationInput = screen.getByLabelText(/location/i);

			expect(nameInput).toHaveValue('');
			expect(descriptionInput).toHaveValue('');
			expect(locationInput).toHaveValue('');
		});
	});

	describe('Accessibility', () => {
		// Our form is split in 2 sections, testing that both are accessible
		it('has proper form labels and structure', () => {
			renderPackForm();

			expect(
				screen.getByRole('form', { name: /pack basic information/i }),
			).toBeInTheDocument();
			expect(
				screen.getByRole('form', { name: /pack additional details and settings/i }),
			).toBeInTheDocument();
		});

		it('has accessible switch labels', () => {
			renderPackForm();

			const publicSwitch = screen.getByRole('switch', { name: /public/i });
			const pricingSwitch = screen.getByRole('switch', { name: /pack prices/i });
			const affiliateSwitch = screen.getByRole('switch', { name: /affiliate links/i });

			expect(publicSwitch).toHaveAccessibleName();
			expect(pricingSwitch).toHaveAccessibleName();
			expect(affiliateSwitch).toHaveAccessibleName();
		});
	});
});
