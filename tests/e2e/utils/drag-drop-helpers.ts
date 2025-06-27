import { Page, expect } from '@playwright/test';

export interface DragDropOptions {
	sourceIndex: number;
	targetIndex: number;
	/** CSS selector for the row container */
	rowSelector: string;
	gripSelector: string;
	dropOffset?: number;
	waitAfterDrop?: number;
}

// Performs drag-and-drop between two items with flexible positioning
export async function performDragDrop(
	page: Page,
	options: DragDropOptions,
): Promise<void> {
	const {
		sourceIndex,
		targetIndex,
		rowSelector,
		gripSelector,
		dropOffset = 20,
		waitAfterDrop = 1000,
	} = options;

	const rows = page.locator(rowSelector);
	const rowCount = await rows.count();

	// Ensure we target existing rows
	if (sourceIndex >= rowCount || targetIndex >= rowCount) {
		throw new Error(
			`Invalid: source=${sourceIndex}, target=${targetIndex}, available=${rowCount}`,
		);
	}

	// Ensure we don't target the same item
	if (sourceIndex === targetIndex) {
		throw new Error('Source and target should not be the same');
	}

	const sourceRow = rows.nth(sourceIndex);
	const targetRow = rows.nth(targetIndex);

	await sourceRow.hover();

	// Get all grip buttons and select the one for our source item
	const gripButtons = page.locator(gripSelector);
	await expect(gripButtons).toHaveCount(rowCount);

	const sourceGrip = gripButtons.nth(sourceIndex);
	await expect(sourceGrip).toBeVisible();

	// Get bounding boxes for positioning
	const gripBox = await sourceGrip.boundingBox();
	const sourceBox = await sourceRow.boundingBox();
	const targetBox = await targetRow.boundingBox();

	if (!gripBox || !targetBox) {
		throw new Error('Could not get bounding boxes for drag operation');
	}

	// Determine starting and ending position
	const startX = gripBox.x + gripBox.width / 2;
	const startY = gripBox.y + gripBox.height / 2;
	const endX = targetBox.x + targetBox.width / 2;

	const isMovingDown = sourceIndex < targetIndex;

	// Calculate height
	const targetBoxHeight = targetBox?.height || 0;

	// For dragging item downward, add height of source item
	// When isDragging, will remove item from flow and shift items up
	const targetHeightAdjustment = isMovingDown ? targetBoxHeight : 0;

	const endY = isMovingDown
		? targetBox.y + targetHeightAdjustment + targetBox.height // Moving down
		: targetBox.y - targetBox.height; // Moving up

	// Perform the drag operation with gradual movement
	await page.mouse.move(startX, startY);
	await page.mouse.down();

	// Brief wait for drag to initiate
	await page.waitForTimeout(100);

	// Move gradually to ensure drag preview appears
	const midX = startX + (endX - startX) / 2;
	const midY = startY + (endY - startY) / 2;

	await page.mouse.move(midX, midY);
	await page.waitForTimeout(100);

	// Move to final position
	await page.mouse.move(endX, endY);
	await page.waitForTimeout(100);

	await page.mouse.up();

	// Wait for the drag operation to complete and React Query to update state
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(waitAfterDrop);
}
