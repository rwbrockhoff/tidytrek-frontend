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

			// Check that the delete modal appears
			expect(screen.getByText(/Delete CDT Shakedown Pack?/i)).toBeInTheDocument();
		});
	});
});
