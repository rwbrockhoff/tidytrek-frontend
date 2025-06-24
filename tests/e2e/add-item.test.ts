import { test, expect } from '@playwright/test';

test.describe.serial('Pack Item CRUD Operations', () => {
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
				document.querySelectorAll('input[name="packItemName"]').length === expectedCount,
			initialInputCount + 1,
		);

		const itemNameInput = page.locator('input[name="packItemName"]').last();
		await expect(itemNameInput).toBeVisible();
		await itemNameInput.fill('Test Hiking Boots');
		await itemNameInput.press('Enter');
		await page.waitForLoadState('networkidle');

		await expect(itemNameInput).toHaveValue('Test Hiking Boots');
	});

	test('should edit an existing pack item', async ({ page }) => {
		const newPackName = 'Durston Kakwa 50L';
		const newPackDescription = 'New pack for the CDT!';

		const existingItemInput = page.locator('input[name="packItemName"]').first();
		const existingItemDescription = page
			.locator('input[name="packItemDescription"]')
			.first();

		await expect(existingItemInput).toBeVisible();
		await expect(existingItemDescription).toBeVisible();

		// Verify existing pack item values before editing
		const inputValue = await existingItemInput.inputValue();
		const descriptionValue = await existingItemDescription.inputValue();
		expect(inputValue).toBeTruthy();
		expect(descriptionValue).toBeTruthy();

		await existingItemInput.click();
		await existingItemInput.clear();
		await existingItemInput.fill(newPackName);
		await existingItemInput.press('Enter');

		// Wait for API between edits
		await page.waitForLoadState('networkidle');

		await existingItemDescription.click();
		await existingItemDescription.clear();
		await existingItemDescription.fill(newPackDescription);
		await existingItemDescription.press('Enter');
		await page.waitForLoadState('networkidle');

		await expect(existingItemInput).toHaveValue(newPackName);
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
		const initialItemCount = await page.locator('[data-testid="pack-item-row"]').count();
		expect(initialItemCount).toBeGreaterThan(0);

		const firstItemRow = page.locator('[data-testid="pack-item-row"]').first();
		await expect(firstItemRow).toBeVisible();
		await firstItemRow.hover();

		const deleteIcon = page.locator('[aria-label="Delete pack item"]').first();
		await expect(deleteIcon).toBeVisible();
		await deleteIcon.click();

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
});
