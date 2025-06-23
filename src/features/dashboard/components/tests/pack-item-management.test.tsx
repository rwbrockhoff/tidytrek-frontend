// @vitest-environment jsdom
import { screen } from '@testing-library/react';
import { wrappedRender } from '@/tests/test-utils';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import { PackCategory } from '../pack-category';
import { mockPackCategory, mockPackList } from '@/tests/mock-data';
import { withDashboardContext } from '@/tests/feature-wrappers';

// Only mock what breaks the rendering tests
// Add more mocks as needed when tests actually call these functions

// Template for future mutation mocking when needed:
// vi.mock('@/queries/pack-queries', async () => {
//   const actual = await vi.importActual('@/queries/pack-queries');
//   return {
//     ...actual,
//     // useAddNewPackItemMutation: () => ({ mutate: vi.fn(), isLoading: false }),
//     // useEditPackItemMutation: () => ({ mutate: vi.fn(), isLoading: false }),
//     // Add other mutations here as tests require them
//   };
// });


describe('Pack Item Management', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('Pack Category Component', () => {
		it('should render pack category with category name', () => {
			wrappedRender(
				withDashboardContext(
					<PackCategory 
						category={mockPackCategory} 
						packList={mockPackList} 
						index={0} 
					/>
				)
			);

			// Check if category name is displayed in input field
			expect(screen.getByDisplayValue(mockPackCategory.packCategoryName)).toBeInTheDocument();
		});

		it('should render pack items within the category', () => {
			wrappedRender(
				withDashboardContext(
					<PackCategory 
						category={mockPackCategory} 
						packList={mockPackList} 
						index={0} 
					/>
				)
			);

			// Check if pack items are displayed by looking for item names
			mockPackCategory.packItems.forEach(item => {
				if (item.packItemName) {
					expect(screen.getByDisplayValue(item.packItemName)).toBeInTheDocument();
				}
			});
		});
	});
});