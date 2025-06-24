import { test, expect } from '@playwright/test';
import { baseURL } from '../../src/api/tidytrekAPI';

test.describe('Pack Item CRUD Operations', () => {
	test('should add a new pack item', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Find and click the Add Item button
		const addButton = page.getByRole('button', { name: /add item/i });
		await expect(addButton).toBeVisible();
		
		// Count existing inputs before adding
		const initialInputCount = await page.locator('input[name="packItemName"]').count();
		
		await addButton.click();

		// Wait for new row to be added (should have one more input than before)
		await page.waitForFunction(
			(expectedCount) => document.querySelectorAll('input[name="packItemName"]').length === expectedCount,
			initialInputCount + 1
		);

		// Now target the last input (the newly created row)
		const itemNameInput = page.locator('input[name="packItemName"]').last();
		await expect(itemNameInput).toBeVisible();
		await itemNameInput.fill('Test Hiking Boots');

		// Save the item by pressing Enter or clicking away
		await itemNameInput.press('Enter');

		// Verify the item was added to the table
		await expect(itemNameInput).toHaveValue('Test Hiking Boots');
	});
});
