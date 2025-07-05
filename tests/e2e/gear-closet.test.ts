import { test, expect } from '@playwright/test';
import { performDragDrop } from './utils/drag-drop-helpers';
import { warn } from 'console';

test.describe.serial('Gear Closet Functionality', () => {
	test.describe('Gear Closet CRUD Operations', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/gear-closet');
			await page.waitForLoadState('networkidle');
		});

		test('should add a new gear closet item', async ({ page }) => {
			const addButton = page.getByRole('button', { name: /add new item to list/i });
			await expect(addButton).toBeVisible();

			const initialInputCount = await page.locator('input[name="packItemName"]').count();
			await addButton.click();

			// Wait for new row to be added
			await page.waitForFunction(
				(expectedCount) =>
					document.querySelectorAll('input[name="packItemName"]').length ===
					expectedCount,
				initialInputCount + 1,
			);

			// Fill in new gear closet item
			const itemNameInput = page.locator('input[name="packItemName"]').last();
			await expect(itemNameInput).toBeVisible();
			await itemNameInput.fill('Test Camping Stove');
			await itemNameInput.press('Enter');
			await page.waitForLoadState('networkidle');

			await expect(itemNameInput).toHaveValue('Test Camping Stove');
		});

		test('should edit an existing gear closet item name', async ({ page }) => {
			const newItemName = 'MSR Pocket Rocket 2';

			const existingItemInput = page.locator('input[name="packItemName"]').first();
			await expect(existingItemInput).toBeVisible();

			// Verify existing item has a name value
			const inputValue = await existingItemInput.inputValue();
			expect(inputValue).toBeTruthy();

			// Fill item with new item naem
			await existingItemInput.click();
			await existingItemInput.clear();
			await existingItemInput.fill(newItemName);
			await existingItemInput.press('Enter');

			await page.waitForLoadState('networkidle');

			await expect(existingItemInput).toHaveValue(newItemName);
		});

		test('should edit existing gear closet item description', async ({ page }) => {
			const newItemDescription = 'Lightweight camping stove for backpacking';

			// Find first gear closet item's description input
			const existingItemDescription = page
				.locator('input[name="packItemDescription"]')
				.first();

			await expect(existingItemDescription).toBeVisible();

			// Clear and fill description
			await existingItemDescription.click();
			await existingItemDescription.clear();
			await existingItemDescription.fill(newItemDescription);
			await existingItemDescription.press('Enter');

			await page.waitForLoadState('networkidle');

			await expect(existingItemDescription).toHaveValue(newItemDescription);
		});

		test('should delete a gear closet item', async ({ page }) => {
			const initialItemCount = await page
				.locator('[data-testid="pack-item-row"]')
				.count();
			expect(initialItemCount).toBeGreaterThan(0);

			// Select first row and hover
			const firstItemRow = page.locator('[data-testid="pack-item-row"]').first();
			await expect(firstItemRow).toBeVisible();
			await firstItemRow.hover();

			// Click delete button
			const deleteButton = page.getByTestId('delete-pack-item-button').first();
			await expect(deleteButton).toBeVisible();
			await deleteButton.click();

			// Handle delete popup modal
			const deleteModal = page.locator('[role="dialog"]').first();
			await expect(deleteModal).toBeVisible();

			const confirmDeleteButton = deleteModal.getByRole('button', { name: /delete/i });
			await expect(confirmDeleteButton).toBeVisible();
			await confirmDeleteButton.click();

			// Wait for modal to close after deletion
			await expect(confirmDeleteButton).not.toBeVisible();
			await page.waitForLoadState('networkidle');

			const finalItemCount = await page.locator('[data-testid="pack-item-row"]').count();
			expect(finalItemCount).toBe(initialItemCount - 1);
		});
	});

	test.describe('Gear Closet Search Functionality', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/gear-closet');
			await page.waitForLoadState('networkidle');
		});

		test('should search for existing gear closet items by name', async ({ page }) => {
			// Get name value of first gear closet item
			const firstItemInput = page.locator('input[name="packItemName"]').first();
			await expect(firstItemInput).toBeVisible();
			const firstItemName = await firstItemInput.inputValue();
			expect(firstItemName).toBeTruthy();

			// Use search inputt o search for exisiting item
			const searchInput = page.locator('input[name="searchInput"]');
			await expect(searchInput).toBeVisible();
			await searchInput.fill(firstItemName);

			// Wait for search to filter results
			await page.waitForLoadState('networkidle');

			// Verify matching item is shown
			const visibleItems = page.locator('[data-testid="pack-item-row"]');
			await expect(visibleItems).toHaveCount(1);

			// Expect search item to be visible
			const visibleItemName = await visibleItems
				.first()
				.locator('input[name="packItemName"]')
				.inputValue();
			expect(visibleItemName).toBe(firstItemName);
		});

		test('should search for existing gear closet items by description', async ({
			page,
		}) => {
			// Get the description of the first item
			const firstItemDescription = page
				.locator('input[name="packItemDescription"]')
				.first();
			await expect(firstItemDescription).toBeVisible();
			const firstItemDescriptionValue = await firstItemDescription.inputValue();

			// Continue only if description value found
			if (firstItemDescriptionValue && firstItemDescriptionValue.trim()) {
				const searchInput = page.locator('input[name="searchInput"]');
				await expect(searchInput).toBeVisible();
				await searchInput.fill(firstItemDescriptionValue);

				await page.waitForLoadState('networkidle');

				// Verify the item with matching description is shown
				const visibleItems = page.locator('[data-testid="pack-item-row"]');
				await expect(visibleItems.first()).toBeVisible();

				const visibleItemDescription = await visibleItems
					.first()
					.locator('input[name="packItemDescription"]')
					.inputValue();
				expect(visibleItemDescription).toBe(firstItemDescriptionValue);

				// Throw warning for missing description (but don't break test)
			} else throw warn('Warning: Gear Closet Search Test: Item Description was empty');
		});

		test('should show "No Items Found" message when searching for non-existent item', async ({
			page,
		}) => {
			const searchInput = page.locator('input[name="searchInput"]');
			await expect(searchInput).toBeVisible();
			await searchInput.fill('NonExistentItemThatShouldNotBeFound123');

			await page.waitForLoadState('networkidle');

			// Verify no items are shown
			const itemRows = page.locator('[data-testid="pack-item-row"]');
			await expect(itemRows).toHaveCount(0);

			// Verify "No Items Found" message is displayed
			const noItemsMessage = page.getByText('No Items Found');
			await expect(noItemsMessage).toBeVisible();
		});

		test('should clear search and show all items when search input is cleared', async ({
			page,
		}) => {
			// Get initial item count
			const initialItemCount = await page
				.locator('[data-testid="pack-item-row"]')
				.count();
			expect(initialItemCount).toBeGreaterThan(0);

			const searchInput = page.locator('input[name="searchInput"]');
			await expect(searchInput).toBeVisible();

			// Search for something to filter results
			await searchInput.fill('NonExistentItem');
			await page.waitForLoadState('networkidle');

			// Verify item count is 0
			const filteredItems = page.locator('[data-testid="pack-item-row"]');
			await expect(filteredItems).toHaveCount(0);

			// Clear the search
			await searchInput.clear();
			await page.waitForLoadState('networkidle');

			// Verify all items are showing again
			const finalItemCount = await page.locator('[data-testid="pack-item-row"]').count();
			expect(finalItemCount).toBe(initialItemCount);
		});
	});

	test.describe('Gear Closet Drag and Drop Functionality', () => {
		test.beforeEach(async ({ page, request }) => {
			// Reset database to ensure clean state for drag and drop testing
			await request.post('http://localhost:4002/test/reset');

			await page.goto('/gear-closet');
			await page.waitForLoadState('networkidle');
		});

		test('should reorder gear closet items by dragging item 2 to position 1', async ({
			page,
		}) => {
			// Ensure we have at least 3 gear closet items
			const gearClosetItemRows = page.locator('[data-testid="pack-item-row"]');
			await expect(gearClosetItemRows).toHaveCount(3, { timeout: 10000 });

			// Select source/target for drag
			const sourceItemInput = gearClosetItemRows
				.nth(1)
				.locator('input[name="packItemName"]');

			const sourceItemName = await sourceItemInput.inputValue();

			// Verify source item has name
			expect(sourceItemName).toBeTruthy();

			// Drag drop pack item from index 1 -> index 0
			const sourceIndex = 1;
			const targetIndex = 0;

			await performDragDrop(page, {
				sourceIndex,
				targetIndex,
				rowSelector: '[data-testid="pack-item-row"]',
				gripSelector: '[data-testid="pack-item-grip"]',
			});

			// Verify the source item moved to destination
			const reorderedGearClosetRows = page.locator('[data-testid="pack-item-row"]');
			const newFirstItemInput = reorderedGearClosetRows
				.nth(targetIndex)
				.locator('input[name="packItemName"]');

			const newFirstItemName = await newFirstItemInput.inputValue();

			// The source item (originally 2nd) should now be in the first position
			expect(newFirstItemName).toBe(sourceItemName);
		});

		test('should reorder gear closet items by dragging item 1 to position 3', async ({
			page,
		}) => {
			// Ensure we have 3 gear closet items
			const gearClosetItemRows = page.locator('[data-testid="pack-item-row"]');
			await expect(gearClosetItemRows).toHaveCount(3, { timeout: 10000 });

			// Select source/target for drag
			const sourceItemInput = gearClosetItemRows
				.nth(0)
				.locator('input[name="packItemName"]');
			const targetItemInput = gearClosetItemRows
				.nth(2)
				.locator('input[name="packItemName"]');

			const sourceItemName = await sourceItemInput.inputValue();
			const targetItemName = await targetItemInput.inputValue();

			// Verify both items have names
			expect(sourceItemName).toBeTruthy();
			expect(targetItemName).toBeTruthy();
			expect(sourceItemName).not.toBe(targetItemName);

			const sourceIndex = 0;
			const targetIndex = 2;

			await performDragDrop(page, {
				sourceIndex,
				targetIndex,
				rowSelector: '[data-testid="pack-item-row"]',
				gripSelector: '[data-testid="pack-item-grip"]',
			});

			const reorderedGearClosetRows = page.locator('[data-testid="pack-item-row"]');
			const newLastItemInput = reorderedGearClosetRows
				.nth(targetIndex)
				.locator('input[name="packItemName"]');

			const newLastItemName = await newLastItemInput.inputValue();

			// The source item (originally 1st) should now be in the third position
			expect(newLastItemName).toBe(sourceItemName);
		});

		test('should reorder gear closet items by dragging item 3 to position 2', async ({
			page,
		}) => {
			// Ensure we have 3 gear closet items
			const gearClosetItemRows = page.locator('[data-testid="pack-item-row"]');
			await expect(gearClosetItemRows).toHaveCount(3, { timeout: 10000 });

			// Select source/target for drag
			const sourceItemInput = gearClosetItemRows
				.nth(2)
				.locator('input[name="packItemName"]');
			const targetItemInput = gearClosetItemRows
				.nth(1)
				.locator('input[name="packItemName"]');

			const sourceItemName = await sourceItemInput.inputValue();
			const targetItemName = await targetItemInput.inputValue();

			// Verify both items have names
			expect(sourceItemName).toBeTruthy();
			expect(targetItemName).toBeTruthy();
			expect(sourceItemName).not.toBe(targetItemName);

			const sourceIndex = 2;
			const targetIndex = 1;

			await performDragDrop(page, {
				sourceIndex,
				targetIndex,
				rowSelector: '[data-testid="pack-item-row"]',
				gripSelector: '[data-testid="pack-item-grip"]',
			});

			const reorderedGearClosetRows = page.locator('[data-testid="pack-item-row"]');
			const newSecondItemInput = reorderedGearClosetRows
				.nth(targetIndex)
				.locator('input[name="packItemName"]');

			const newSecondItemName = await newSecondItemInput.inputValue();

			// The source item (originally 3rd) should now be in the second position
			expect(newSecondItemName).toBe(sourceItemName);
		});
	});
});
