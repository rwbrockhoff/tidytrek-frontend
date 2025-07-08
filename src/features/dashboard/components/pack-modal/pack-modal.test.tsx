import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { PackModal } from '../pack-modal/pack-modal';
import { wrappedRender } from '@/tests/wrapper-utils';
import { createMockPack } from '@/tests/mocks/pack-mocks';

describe('PackModal', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const renderPackModal = (pack = createMockPack()) => {
		return wrappedRender(
			<PackModal pack={pack}>
				<button>Open Modal</button>
			</PackModal>,
		);
	};

	describe('Modal State', () => {
		it('can close modal using the close button', async () => {
			const { user } = renderPackModal();

			// Open modal
			await user.click(screen.getByText('Open Modal'));
			expect(screen.getByDisplayValue('CDT Shakedown')).toBeInTheDocument();

			// Close modal
			await user.click(screen.getByLabelText('Close modal'));

			// Modal should be closed - pack name should not be visible
			expect(screen.queryByDisplayValue('CDT Shakedown')).not.toBeInTheDocument();
		});

		it('shows delete modal when delete button is clicked', async () => {
			const { user } = renderPackModal();

			// Open modal
			await user.click(screen.getByText('Open Modal'));

			// Click delete button
			const deleteButton = screen.getByRole('button', { name: /delete/i });
			await user.click(deleteButton);

			// Check that delete modal appears
			expect(screen.getByText(/Delete CDT Shakedown Pack?/i)).toBeInTheDocument();
		});
	});
});
