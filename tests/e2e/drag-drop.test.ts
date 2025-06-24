import { test, expect } from '@playwright/test';

test.describe('Drag and Drop Operations', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('should reorder pack items by dragging item 2 above item 1', async ({ page }) => {
		// Defensive check: ensure we have at least 2 pack items
		const packItemRows = page.locator('[data-testid="pack-item-row"]');
		await expect(packItemRows).toHaveCount(2, { timeout: 10000 });

		// Get the initial order of items
		const firstItemInput = packItemRows.nth(0).locator('input[name="packItemName"]');
		const secondItemInput = packItemRows.nth(1).locator('input[name="packItemName"]');

		const initialFirstItemName = await firstItemInput.inputValue();
		const initialSecondItemName = await secondItemInput.inputValue();

		// Verify both items have names
		expect(initialFirstItemName).toBeTruthy();
		expect(initialSecondItemName).toBeTruthy();
		expect(initialFirstItemName).not.toBe(initialSecondItemName);

		// Hover over the second item to reveal the grip icon
		const secondItemRow = packItemRows.nth(1);
		const firstItemRow = packItemRows.nth(0);

		await secondItemRow.hover();

		// Find the grip button for pack items using data-testid
		const packItemGrips = page.locator('[data-testid="pack-item-grip"]');
		await expect(packItemGrips).toHaveCount(2, { timeout: 5000 });
		
		// Get the second grip button (for the second item we want to drag)
		const gripButton = packItemGrips.nth(1);
		await expect(gripButton).toBeVisible({ timeout: 5000 });
		
		// Get bounding boxes for manual drag operation
		const gripBox = await gripButton.boundingBox();
		const targetBox = await firstItemRow.boundingBox();
		expect(gripBox).toBeTruthy();
		expect(targetBox).toBeTruthy();

		// Perform manual drag operation with gradual movement
		const startX = gripBox!.x + gripBox!.width / 2;
		const startY = gripBox!.y + gripBox!.height / 2;
		const endX = targetBox!.x + targetBox!.width / 2;
		const endY = targetBox!.y - 20;

		await page.mouse.move(startX, startY);
		await page.mouse.down();
		
		// Wait for drag to initiate
		await page.waitForTimeout(200);
		
		// Move gradually to ensure drag preview appears
		const midX = startX + (endX - startX) / 2;
		const midY = startY + (endY - startY) / 2;
		
		await page.mouse.move(midX, midY);
		await page.waitForTimeout(200);
		
		// Move to final target position
		await page.mouse.move(endX, endY);
		await page.waitForTimeout(300);
		
		// Release mouse
		await page.mouse.up();

		// Wait for the drag operation to complete and state to update
		await page.waitForLoadState('networkidle');
		await page.waitForTimeout(1000);

		// Verify the items have been reordered
		const reorderedPackItemRows = page.locator('[data-testid="pack-item-row"]');
		const newFirstItemInput = reorderedPackItemRows
			.nth(0)
			.locator('input[name="packItemName"]');
		const newSecondItemInput = reorderedPackItemRows
			.nth(1)
			.locator('input[name="packItemName"]');

		const newFirstItemName = await newFirstItemInput.inputValue();
		const newSecondItemName = await newSecondItemInput.inputValue();

		// The original second item should now be first
		expect(newFirstItemName).toBe(initialSecondItemName);
		// The original first item should now be second
		expect(newSecondItemName).toBe(initialFirstItemName);
	});
});
