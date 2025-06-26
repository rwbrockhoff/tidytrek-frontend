import { test, expect } from '@playwright/test';
import { performDragDrop } from './utils/drag-drop-helpers';

test.describe.serial('Pack Item Functionality', () => {
	test.describe('Pack Item CRUD Operations', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/');
			await page.waitForLoadState('networkidle');
		});

		test('should add a new pack item', async ({ page }) => {
			const addButton = page.getByRole('button', { name: /add item/i });
			await expect(addButton).toBeVisible();

			const initialInputCount = await page.locator('input[name="packItemName"]').count();
			await addButton.click();

			// Wait for new row to be added dynamically
			await page.waitForFunction(
				(expectedCount) =>
					document.querySelectorAll('input[name="packItemName"]').length ===
					expectedCount,
				initialInputCount + 1,
			);

			const itemNameInput = page.locator('input[name="packItemName"]').last();
			await expect(itemNameInput).toBeVisible();
			await itemNameInput.fill('Test Hiking Boots');
			await itemNameInput.press('Enter');
			await page.waitForLoadState('networkidle');

			await expect(itemNameInput).toHaveValue('Test Hiking Boots');
		});

		test('should edit an existing pack item name', async ({ page }) => {
			const newPackName = 'Durston Kakwa 50L';

			const existingItemInput = page.locator('input[name="packItemName"]').first();

			await expect(existingItemInput).toBeVisible();

			// Verify existing pack item values before editing
			const inputValue = await existingItemInput.inputValue();
			expect(inputValue).toBeTruthy();

			await existingItemInput.click();
			await existingItemInput.clear();
			await existingItemInput.fill(newPackName);
			await existingItemInput.press('Enter');

			await page.waitForLoadState('networkidle');

			await expect(existingItemInput).toHaveValue(newPackName);
		});

		test('should edit existing pack item description', async ({ page }) => {
			const newPackDescription = 'New pack for the CDT!';

			const existingItemDescription = page
				.locator('input[name="packItemDescription"]')
				.first();

			await expect(existingItemDescription).toBeVisible();

			// Verify existing pack item values before editing
			const descriptionValue = await existingItemDescription.inputValue();
			expect(descriptionValue).toBeTruthy();

			await existingItemDescription.click();
			await existingItemDescription.clear();
			await existingItemDescription.fill(newPackDescription);
			await existingItemDescription.press('Enter');

			await page.waitForLoadState('networkidle');

			await expect(existingItemDescription).toHaveValue(newPackDescription);
		});

		test('should toggle pack item properties', async ({ page }) => {
			const firstItemRow = page.locator('[data-testid="pack-item-row"]').first();
			await expect(firstItemRow).toBeVisible();
			await firstItemRow.hover();

			const favoriteIcon = page.locator('[name="favorite"]').first();
			await expect(favoriteIcon).toBeVisible();

			// Check initial state of favoriteActive class
			const initialClasses = await favoriteIcon.getAttribute('class');
			const isInitiallyActive = initialClasses?.includes('favoriteActive') || false;

			await favoriteIcon.click();
			await page.waitForLoadState('networkidle');

			if (isInitiallyActive) {
				await expect(favoriteIcon).not.toHaveClass(/favoriteActive/);
			} else {
				await expect(favoriteIcon).toHaveClass(/favoriteActive/);
			}

			// Test toggle back to original state
			await favoriteIcon.click();

			if (isInitiallyActive) {
				await expect(favoriteIcon).toHaveClass(/favoriteActive/);
			} else {
				await expect(favoriteIcon).not.toHaveClass(/favoriteActive/);
			}
		});

		test('should delete a pack item', async ({ page }) => {
			const initialItemCount = await page
				.locator('[data-testid="pack-item-row"]')
				.count();
			expect(initialItemCount).toBeGreaterThan(0);

			const firstItemRow = page.locator('[data-testid="pack-item-row"]').first();
			await expect(firstItemRow).toBeVisible();
			await firstItemRow.hover();

			const deleteButton = page.getByTestId('delete-pack-item-button').first();
			await expect(deleteButton).toBeVisible();
			await deleteButton.click();

			const deleteModal = page.locator('[role="dialog"]').first();
			await expect(deleteModal).toBeVisible();

			const confirmDeleteButton = deleteModal.getByRole('button', { name: /delete/i });
			await expect(confirmDeleteButton).toBeVisible();
			await confirmDeleteButton.click();

			// Wait for modal to close after deletion
			await expect(confirmDeleteButton).not.toBeVisible();

			const finalItemCount = await page.locator('[data-testid="pack-item-row"]').count();
			expect(finalItemCount).toBe(initialItemCount - 1);
		});

		test('should move pack item to gear closet', async ({ page }) => {
			const firstItemRow = page.locator('[data-testid="pack-item-row"]').first();
			await expect(firstItemRow).toBeVisible();

			// Get the item name before moving it
			const itemNameInput = firstItemRow.locator('input[name="packItemName"]');
			const itemName = await itemNameInput.inputValue();
			expect(itemName).toBeTruthy();

			await firstItemRow.hover();

			const deleteButton = page.getByTestId('delete-pack-item-button').first();
			await expect(deleteButton).toBeVisible();
			await deleteButton.click();

			const deleteModal = page.locator('[role="dialog"]').first();
			await expect(deleteModal).toBeVisible();

			// Click "Move to Gear Closet" instead of Delete
			const moveButton = page.getByRole('button', {
				name: 'Move pack item to gear closet',
			});
			await expect(moveButton).toBeVisible();
			await moveButton.click();

			// Wait for modal to close after move operation
			await expect(moveButton).not.toBeVisible();
			await page.waitForLoadState('networkidle');

			// Navigate to gear closet page
			await page.goto('/gear-closet');
			await page.waitForLoadState('networkidle');

			// Verify the same item now appears at the end of gear closet list
			const lastItemRow = page.locator('[data-testid="pack-item-row"]').last();
			await expect(lastItemRow).toBeVisible();

			const gearClosetItemInput = lastItemRow.locator('input[name="packItemName"]');
			await expect(gearClosetItemInput).toHaveValue(itemName);
		});
	});

	test.describe('Pack Item Drag and Drop Functionality', () => {
		test.beforeEach(async ({ page, request }) => {
			// Reset pack data for drag and drop testing
			await request.post('http://localhost:4002/test/reset-packs');

			await page.goto('/');
			await page.waitForLoadState('networkidle');
		});

		test('should reorder pack items by dragging item 2 to position 1', async ({
			page,
		}) => {
			const packItemRows = page.locator('[data-testid="pack-item-row"]');

			// Ensure we have at least 2 pack items
			const itemCount = await packItemRows.count();
			expect(itemCount).toBeGreaterThanOrEqual(2);

			const firstItemInput = packItemRows.nth(0).locator('input[name="packItemName"]');
			const secondItemInput = packItemRows.nth(1).locator('input[name="packItemName"]');

			const initialFirstItemName = await firstItemInput.inputValue();
			const initialSecondItemName = await secondItemInput.inputValue();

			// Verify both items have names
			expect(initialFirstItemName).toBeTruthy();
			expect(initialSecondItemName).toBeTruthy();
			expect(initialFirstItemName).not.toBe(initialSecondItemName);

			// Drag drop pack item from index 1 -> index 0
			const sourceIndex = 1;
			const targetIndex = 0;
			await performDragDrop(page, {
				sourceIndex,
				targetIndex,
				rowSelector: '[data-testid="pack-item-row"]',
				gripSelector: '[data-testid="pack-item-grip"]',
			});

			// Verify the source item moved to the target position
			const reorderedPackItemRows = page.locator('[data-testid="pack-item-row"]');
			const newFirstItemInput = reorderedPackItemRows
				.nth(targetIndex)
				.locator('input[name="packItemName"]');

			const newFirstItemName = await newFirstItemInput.inputValue();

			// The source item (originally 2nd) should now be in the first position
			expect(newFirstItemName).toBe(initialSecondItemName);
		});

		test('should reorder pack items by dragging item 1 to position 2', async ({
			page,
		}) => {
			// Ensure we have at least 2 pack items
			const packItemRows = page.locator('[data-testid="pack-item-row"]');
			const itemCount = await packItemRows.count();
			expect(itemCount).toBeGreaterThanOrEqual(2);

			const firstItemInput = packItemRows.nth(0).locator('input[name="packItemName"]');
			const secondItemInput = packItemRows.nth(1).locator('input[name="packItemName"]');

			const initialFirstItemName = await firstItemInput.inputValue();
			const initialSecondItemName = await secondItemInput.inputValue();

			// Verify both items have names
			expect(initialFirstItemName).toBeTruthy();
			expect(initialSecondItemName).toBeTruthy();
			expect(initialFirstItemName).not.toBe(initialSecondItemName);

			// Drag drop pack item from index 0 -> index 1
			const sourceIndex = 0;
			const targetIndex = 1;

			await performDragDrop(page, {
				sourceIndex,
				targetIndex,
				rowSelector: '[data-testid="pack-item-row"]',
				gripSelector: '[data-testid="pack-item-grip"]',
			});

			// Verify the source item moved to the target position
			const reorderedPackItemRows = page.locator('[data-testid="pack-item-row"]');
			const newSecondItemInput = reorderedPackItemRows
				.nth(targetIndex)
				.locator('input[name="packItemName"]');

			const newSecondItemName = await newSecondItemInput.inputValue();

			// The source item (originally 1st) should now be in the second position
			expect(newSecondItemName).toBe(initialFirstItemName);
		});
	});
});
