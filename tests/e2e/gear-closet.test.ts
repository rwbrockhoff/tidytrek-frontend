import { test, expect } from '@playwright/test';
import { performDragDrop } from './utils/drag-drop-helpers';

test.describe('Gear Closet Operations', () => {
	test.beforeEach(async ({ page }) => {
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
