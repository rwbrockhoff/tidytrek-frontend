import { test, expect } from '@playwright/test';
import { performDragDrop } from './utils/drag-drop-helpers';

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

	test.describe('Pack Category Drag and Drop Functionality', () => {
		test.beforeEach(async ({ page, request }) => {
			// Reset pack data for drag and drop testing
			await request.post('http://localhost:4002/test/reset-packs');

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

		test('should reorder categories by dragging category 2 to position 1', async ({
			page,
		}) => {
			const categoryRows = page.locator('[data-testid="pack-category-row"]');

			// Ensure we have at least 2 categories
			const categoryCount = await categoryRows.count();
			expect(categoryCount).toBeGreaterThanOrEqual(2);

			const firstCategoryInput = categoryRows.nth(0).locator('input[name="packCategoryName"]');
			const secondCategoryInput = categoryRows.nth(1).locator('input[name="packCategoryName"]');

			const initialFirstCategoryName = await firstCategoryInput.inputValue();
			const initialSecondCategoryName = await secondCategoryInput.inputValue();

			// Verify both categories have names
			expect(initialFirstCategoryName).toBeTruthy();
			expect(initialSecondCategoryName).toBeTruthy();
			expect(initialFirstCategoryName).not.toBe(initialSecondCategoryName);

			// Drag drop category from index 1 -> index 0
			const sourceIndex = 1;
			const targetIndex = 0;
			await performDragDrop(page, {
				sourceIndex,
				targetIndex,
				rowSelector: '[data-testid="pack-category-row"]',
				gripSelector: '[data-testid="pack-category-grip"]',
			});

			// Verify the source category moved to the target position
			const reorderedCategoryRows = page.locator('[data-testid="pack-category-row"]');
			const newFirstCategoryInput = reorderedCategoryRows
				.nth(targetIndex)
				.locator('input[name="packCategoryName"]');

			const newFirstCategoryName = await newFirstCategoryInput.inputValue();

			// The source category (originally 2nd) should now be in the first position
			expect(newFirstCategoryName).toBe(initialSecondCategoryName);
		});

		test('should reorder categories by dragging category 1 to position 2', async ({
			page,
		}) => {
			// Ensure we have at least 2 categories
			const categoryRows = page.locator('[data-testid="pack-category-row"]');
			const categoryCount = await categoryRows.count();
			expect(categoryCount).toBeGreaterThanOrEqual(2);

			const firstCategoryInput = categoryRows.nth(0).locator('input[name="packCategoryName"]');
			const secondCategoryInput = categoryRows.nth(1).locator('input[name="packCategoryName"]');

			const initialFirstCategoryName = await firstCategoryInput.inputValue();
			const initialSecondCategoryName = await secondCategoryInput.inputValue();

			// Verify both categories have names
			expect(initialFirstCategoryName).toBeTruthy();
			expect(initialSecondCategoryName).toBeTruthy();
			expect(initialFirstCategoryName).not.toBe(initialSecondCategoryName);

			// Drag drop category from index 0 -> index 1
			const sourceIndex = 0;
			const targetIndex = 1;

			await performDragDrop(page, {
				sourceIndex,
				targetIndex,
				rowSelector: '[data-testid="pack-category-row"]',
				gripSelector: '[data-testid="pack-category-grip"]',
			});

			// Verify the source category moved to the target position
			const reorderedCategoryRows = page.locator('[data-testid="pack-category-row"]');
			const newSecondCategoryInput = reorderedCategoryRows
				.nth(targetIndex)
				.locator('input[name="packCategoryName"]');

			const newSecondCategoryName = await newSecondCategoryInput.inputValue();

			// The source category (originally 1st) should now be in the second position
			expect(newSecondCategoryName).toBe(initialFirstCategoryName);
		});
	});
});
