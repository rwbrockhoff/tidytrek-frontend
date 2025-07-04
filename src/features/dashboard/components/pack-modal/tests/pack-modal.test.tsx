import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { PackModal } from '../pack-modal';
import { wrappedRender } from '@/tests/test-utils';
import { createMockPack } from '@/tests/mocks/pack-mocks';
import * as packQueries from '@/queries/pack-queries';

// Mock the pack queries
vi.mock('@/queries/pack-queries', () => ({
	useEditPackMutation: vi.fn(),
	useUploadPackPhotoMutation: vi.fn(),
	useDeletePackPhotoMutation: vi.fn(),
}));

// Mock cleanUpLink utility
vi.mock('@/utils/link-utils', () => ({
	cleanUpLink: vi.fn((url) => url.replace('http:', 'https:')),
}));

describe('PackModal', () => {
	const mockEditPack = vi.fn();
	const mockShowDeleteModal = vi.fn();

	beforeEach(() => {
		vi.mocked(packQueries.useEditPackMutation).mockReturnValue({
			mutate: mockEditPack,
		} as any);

		vi.mocked(packQueries.useUploadPackPhotoMutation).mockReturnValue({
			mutate: vi.fn(),
			isPending: false,
		} as any);

		vi.mocked(packQueries.useDeletePackPhotoMutation).mockReturnValue({
			mutate: vi.fn(),
			isPending: false,
		} as any);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const renderPackModal = (pack = createMockPack()) => {
		return wrappedRender(
			<PackModal pack={pack} showDeleteModal={mockShowDeleteModal}>
				<button>Open Modal</button>
			</PackModal>,
		);
	};

	describe('Form Change Handling', () => {
		it('tracks changes when form inputs are modified', async () => {
			const { user } = renderPackModal();

			// Open the modal
			await user.click(screen.getByText('Open Modal'));

			// Find and edit pack name
			const packNameInput = screen.getByDisplayValue('CDT Shakedown');
			await user.clear(packNameInput);
			await user.type(packNameInput, 'Updated Pack Name');

			// Save pack/submit form
			const saveButton = screen.getByRole('button', { name: /save/i });
			await user.click(saveButton);

			// Should call editPack on form change
			expect(mockEditPack).toHaveBeenCalledTimes(1);
			expect(mockEditPack).toHaveBeenCalledWith({
				packId: 1,
				modifiedPack: expect.objectContaining({
					packName: 'Updated Pack Name',
				}),
			});
		});

		it('does not submit when no changes are made', async () => {
			const { user } = renderPackModal();

			await user.click(screen.getByText('Open Modal'));

			// Save without making changes
			const saveButton = screen.getByRole('button', { name: /save/i });
			await user.click(saveButton);

			// Should not call editPack because no changes were made
			expect(mockEditPack).not.toHaveBeenCalled();
		});

		it('handles textarea changes correctly', async () => {
			const { user } = renderPackModal();

			await user.click(screen.getByText('Open Modal'));

			// Edit description textarea
			const descriptionInput = screen.getByDisplayValue('Current gear list for CDT');
			await user.clear(descriptionInput);
			await user.type(descriptionInput, 'Updated description');

			const saveButton = screen.getByRole('button', { name: /save/i });
			await user.click(saveButton);

			expect(mockEditPack).toHaveBeenCalledWith({
				packId: 1,
				modifiedPack: expect.objectContaining({
					packDescription: 'Updated description',
				}),
			});
		});
	});

	describe('Checkbox Handling', () => {
		it('handles public pack toggle', async () => {
			const pack = createMockPack({ packPublic: false });
			const { user } = renderPackModal(pack);

			await user.click(screen.getByText('Open Modal'));

			// Toggle the public switch
			const publicSwitch = screen.getByRole('switch', { name: /public/i });
			await user.click(publicSwitch);

			const saveButton = screen.getByRole('button', { name: /save/i });
			await user.click(saveButton);

			expect(mockEditPack).toHaveBeenCalledWith({
				packId: 1,
				modifiedPack: expect.objectContaining({
					packPublic: true,
				}),
			});
		});

		it('handles affiliate toggle', async () => {
			const pack = createMockPack({ packAffiliate: false });
			const { user } = renderPackModal(pack);

			await user.click(screen.getByText('Open Modal'));

			// Toggle the affiliate switch
			const affiliateSwitch = screen.getByRole('switch', { name: /affiliate/i });
			await user.click(affiliateSwitch);

			const saveButton = screen.getByRole('button', { name: /save/i });
			await user.click(saveButton);

			expect(mockEditPack).toHaveBeenCalledWith({
				packId: 1,
				modifiedPack: expect.objectContaining({
					packAffiliate: true,
				}),
			});
		});
	});

	describe('URL Handling', () => {
		it('cleans up URL before saving', async () => {
			const { user } = renderPackModal();

			await user.click(screen.getByText('Open Modal'));

			// Edit pack URL
			const urlInput = screen.getByDisplayValue(
				'https://fakeyoutube.com/cdt-gear-review',
			);
			await user.clear(urlInput);
			await user.type(urlInput, 'http://unsafe-site.com');

			const saveButton = screen.getByRole('button', { name: /save/i });
			await user.click(saveButton);

			// Should call editPack with cleaned URL (http -> https)
			expect(mockEditPack).toHaveBeenCalledWith({
				packId: 1,
				modifiedPack: expect.objectContaining({
					packUrl: 'https://unsafe-site.com',
				}),
			});
		});
	});

	describe('Modal State Management', () => {
		it('keeps modified data when modal closes without saving', async () => {
			const originalPack = createMockPack();
			const { user } = renderPackModal(originalPack);

			await user.click(screen.getByText('Open Modal'));

			// Make a change
			const packNameInput = screen.getByDisplayValue('CDT Shakedown');
			await user.clear(packNameInput);
			await user.type(packNameInput, 'Modified Name');

			// Close modal without saving (click outside or escape)
			await user.keyboard('{Escape}');

			// Reopen modal - currently shows modified data (not original)
			await user.click(screen.getByText('Open Modal'));
			expect(screen.getByDisplayValue('Modified Name')).toBeInTheDocument();
		});

		it('shows delete modal when delete button is clicked', async () => {
			const { user } = renderPackModal();

			await user.click(screen.getByText('Open Modal'));

			const deleteButton = screen.getByRole('button', { name: /delete/i });
			await user.click(deleteButton);

			expect(mockShowDeleteModal).toHaveBeenCalledTimes(1);
		});
	});
});
