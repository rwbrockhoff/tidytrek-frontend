import { test, expect } from '@playwright/test';

test.describe.serial('Pack Category Functionality', () => {
	// Set larger desktop viewport to ensure sidebar is in view
	test.use({ viewport: { width: 1400, height: 900 } });

	test.beforeEach(async ({ page }) => {
		const packTitle = 'Multi Category Test Pack';

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		await page.getByRole('button', { name: packTitle }).click();
		await page.waitForLoadState('networkidle');

		// Wait for pack to load
		await expect(page.getByRole('heading', { name: packTitle })).toBeVisible({
			timeout: 10000,
		});
	});

	test('should create a new category', async ({ page }) => {
		const addCategoryButton = page.getByRole('button', { name: /add category/i });
		await expect(addCategoryButton).toBeVisible();

		const initialCategoryCount = await page
			.locator('[data-testid="pack-category-row"]')
			.count();
		await addCategoryButton.click();

		// Wait for new category to be added
		await page.waitForFunction(
			(expectedCount) =>
				document.querySelectorAll('input[name="packCategoryName"]').length ===
				expectedCount,
			initialCategoryCount + 1,
		);

		// Verify new category is visible
		const newCategoryInput = page.locator('input[name="packCategoryName"]').last();
		await expect(newCategoryInput).toBeVisible();

		// Ensure new category is editable
		await newCategoryInput.fill('Test Electronics');
		await newCategoryInput.press('Enter');
		await page.waitForLoadState('networkidle');

		await expect(newCategoryInput).toHaveValue('Test Electronics');
	});

	test('should edit an existing category name', async ({ page }) => {
		const newCategoryName = 'Base Layers';

		const existingCategoryInput = page.locator('input[name="packCategoryName"]').first();
		await expect(existingCategoryInput).toBeVisible();

		// Verify existing category has a name before editing
		const inputValue = await existingCategoryInput.inputValue();
		expect(inputValue).toBeTruthy();

		await existingCategoryInput.click();
		await existingCategoryInput.clear();
		await existingCategoryInput.fill(newCategoryName);
		await existingCategoryInput.press('Enter');

		await page.waitForLoadState('networkidle');

		await expect(existingCategoryInput).toHaveValue(newCategoryName);
	});

	test('should minimize and expand a category', async ({ page }) => {
		const firstCategoryRow = page.locator('[data-testid="pack-category-row"]').first();
		await expect(firstCategoryRow).toBeVisible();
		await firstCategoryRow.hover();

		// Click minimize button
		const minimizeButton = page.getByTestId('minimize-category-button').first();
		await expect(minimizeButton).toBeVisible();
		await minimizeButton.click();

		await page.waitForLoadState('networkidle');

		// Verify category is minimized
		const minimizedCategory = firstCategoryRow.locator('[class*="minimized"]');
		await expect(minimizedCategory).toBeVisible();

		// Click expand button
		const expandButton = page.getByTestId('minimize-category-button').first();
		await expect(expandButton).toBeVisible();
		await expandButton.click();

		await page.waitForLoadState('networkidle');

		// Verify category is expanded
		await expect(minimizedCategory).not.toBeVisible();
	});

	test('should delete a category', async ({ page }) => {
		const initialCategoryCount = await page
			.locator('[data-testid="pack-category-row"]')
			.count();
		expect(initialCategoryCount).toBeGreaterThan(0);

		// Click delete button
		const deleteButton = page.getByTestId('delete-category-button').first();
		await expect(deleteButton).toBeVisible();
		await deleteButton.click();

		// Handle modal confirmation
		const deleteModal = page.locator('[role="dialog"]');
		await expect(deleteModal).toBeVisible();

		const confirmDeleteButton = deleteModal.getByRole('button', { name: /delete/i });
		await expect(confirmDeleteButton).toBeVisible();
		await confirmDeleteButton.click();

		// Wait for modal to close
		await expect(deleteModal).not.toBeVisible();
		await page.waitForLoadState('networkidle');

		const finalCategoryCount = await page
			.locator('[data-testid="pack-category-row"]')
			.count();
		expect(finalCategoryCount).toBe(initialCategoryCount - 1);
	});
});
