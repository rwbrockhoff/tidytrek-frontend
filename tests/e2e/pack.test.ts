import { test, expect } from '@playwright/test';
import { performDragDrop } from './utils/drag-drop-helpers';

test.describe.serial('Pack Management Functionality', () => {
	// Set larger desktop viewport to ensure sidebar is in view
	test.use({ viewport: { width: 1400, height: 900 } });

	test.describe('Pack CRUD Operations', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/');
			await page.waitForLoadState('networkidle');
		});

		test('should create a new pack', async ({ page }) => {
			// Get initial pack count from sidebar
			const initialPackCount = await page
				.getByTestId('pack-list-row')
				.count();
			expect(initialPackCount).toBeGreaterThan(0);

			// Click "Create New Pack" button in sidebar (using aria-label text)
			// Playwright overrules name selection when aria-label present
			const createPackButton = page.getByRole('button', {
				name: /open pack creation menu/i,
			});
			await expect(createPackButton).toBeVisible();
			await createPackButton.click();

			// Wait for popover to appear
			const popover = page.locator('[role="dialog"]');
			await expect(popover).toBeVisible();

			// Click "Create New Pack" option in popover (using aria-label text)
			const createOption = popover.getByRole('button', {
				name: /create a new empty pack/i,
			});
			await expect(createOption).toBeVisible();
			await createOption.click();

			await page.waitForLoadState('networkidle');
			await page.waitForTimeout(1000);

			// Verify new pack appears in sidebar (count increased)
			const finalPackCount = await page
				.getByTestId('pack-list-row')
				.count();
			expect(finalPackCount).toBe(initialPackCount + 1);

			// Verify dashboard header shows "New Pack" (default name)
			const packHeader = page.getByTestId('pack-name-heading');
			await expect(packHeader).toHaveText(/new pack/i);
		});

		test('should navigate between packs', async ({ page }) => {
			// Get all pack items from sidebar
			const packItems = page.getByTestId('pack-list-row');
			const packCount = await packItems.count();
			expect(packCount).toBeGreaterThanOrEqual(2);

			// Get the name of the first pack
			const firstPackItem = packItems.first();
			const firstPackText = await firstPackItem.textContent();
			expect(firstPackText).toBeTruthy();

			// Click on the first pack
			await firstPackItem.click();
			await page.waitForLoadState('networkidle');

			// Verify dashboard header matches first pack name
			const packHeader = page.getByTestId('pack-name-heading');
			await expect(packHeader).toHaveText(firstPackText!.trim());

			// Get the name of the second pack
			const secondPackItem = packItems.nth(1);
			const secondPackText = await secondPackItem.textContent();
			expect(secondPackText).toBeTruthy();
			expect(secondPackText).not.toBe(firstPackText);

			// Click on the second pack
			await secondPackItem.click();
			await page.waitForLoadState('networkidle');

			// Verify dashboard header shows second pack name
			await expect(packHeader).toHaveText(secondPackText!.trim());
		});

		test('should edit pack name', async ({ page }) => {
			const newPackName = 'Test Adventure Pack';

			// Click on first pack to ensure we're on it
			const firstPackFromList = page.getByTestId('pack-list-row').first();
			await firstPackFromList.click();
			await page.waitForLoadState('networkidle');

			// Get current pack name from heading
			const currentHeader = page.getByTestId('pack-name-heading');
			const currentPackName = await currentHeader.textContent();
			expect(currentPackName).toBeTruthy();

			// Hover over pack info area to reveal edit icon
			const packInfoPanel = page.locator('[class*="userInfoPanel"]');
			await packInfoPanel.hover();

			// Click the edit button
			const editButton = page.getByTestId('pack-edit-button');
			await expect(editButton).toBeVisible();
			await editButton.click();

			// Wait for modal
			const modal = page.locator('[role="dialog"]');
			await expect(modal).toBeVisible();

			// Find and edit the pack name input in the modal
			const packNameInput = modal.locator('input[name="packName"]');
			await expect(packNameInput).toBeVisible();

			// Verify current pack name is loaded in input
			const inputValue = await packNameInput.inputValue();
			expect(inputValue).toBe(currentPackName);

			// Edit the pack name
			await packNameInput.clear();
			await packNameInput.fill(newPackName);

			// Click Save Pack button
			const saveButton = modal.getByRole('button', { name: /save pack/i });
			await expect(saveButton).toBeVisible();
			await saveButton.click();

			// Wait for modal to close
			await expect(modal).not.toBeVisible();
			await page.waitForLoadState('networkidle');

			// Verify dashboard header shows updated name
			const updatedHeader = page.getByTestId('pack-name-heading');
			await expect(updatedHeader).toHaveText(newPackName);

			// Verify sidebar shows updated pack name
			const updatedPackItem = page
				.getByTestId('pack-list-row')
				.filter({ hasText: newPackName });
			await expect(updatedPackItem).toBeVisible();
		});

		test('should delete a pack', async ({ page }) => {
			const initialPackCount = await page
				.getByTestId('pack-list-row')
				.count();
			expect(initialPackCount).toBeGreaterThan(1); // Need at least 2 packs to delete one

			// Click on first pack to select it
			const firstPackItem = page.getByTestId('pack-list-row').first();
			const packNameToDelete = await firstPackItem.textContent();
			expect(packNameToDelete).toBeTruthy();

			await firstPackItem.click();
			await page.waitForLoadState('networkidle');

			// Hover over pack info area to reveal edit button
			const packInfoPanel = page.locator('[class*="userInfoPanel"]');
			await packInfoPanel.hover();

			// Click the edit button to open pack modal
			const editButton = page.getByTestId('pack-edit-button');
			await expect(editButton).toBeVisible();
			await editButton.click();

			// Wait for pack modal
			const packModal = page.locator('[role="dialog"]');
			await expect(packModal).toBeVisible();

			// Click delete button within the pack modal
			const deleteButton = packModal.getByRole('button', { name: /delete/i });
			await expect(deleteButton).toBeVisible();
			await deleteButton.click();

			// Handle modal confirmation (second popup modal)
			const confirmModal = page.locator('[role="dialog"]').nth(1);
			await expect(confirmModal).toBeVisible();

			const confirmDeleteButton = confirmModal.getByRole('button', { name: /delete/i });
			await expect(confirmDeleteButton).toBeVisible();
			await confirmDeleteButton.click();

			await page.waitForLoadState('networkidle');
			await page.waitForTimeout(1000);

			// Verify pack count decreased
			const finalPackCount = await page
				.getByTestId('pack-list-row')
				.count();
			expect(finalPackCount).toBe(initialPackCount - 1);

			// Verify we're now on a different pack
			const currentHeader = page.getByTestId('pack-name-heading');
			await expect(currentHeader).toBeVisible();

			// Verify the current pack name is different from the deleted one
			const currentHeaderText = await currentHeader.textContent();
			expect(currentHeaderText).not.toBe(packNameToDelete!.trim());
		});
	});

	test.describe('Pack List Drag and Drop Functionality', () => {
		test.beforeEach(async ({ page, request }) => {
			// Reset pack data for drag and drop testing
			await request.post('http://localhost:4002/test/reset-packs');

			await page.goto('/');
			await page.waitForLoadState('networkidle');
		});

		test('should reorder packs by dragging pack 2 to position 1', async ({
			page,
		}) => {
			const packListItems = page.locator('[data-testid="pack-list-row"]');

			// Ensure we have at least 2 packs
			const packCount = await packListItems.count();
			expect(packCount).toBeGreaterThanOrEqual(2);

			const firstPackItem = packListItems.nth(0);
			const secondPackItem = packListItems.nth(1);

			const initialFirstPackText = await firstPackItem.textContent();
			const initialSecondPackText = await secondPackItem.textContent();

			// Verify both packs have names
			expect(initialFirstPackText).toBeTruthy();
			expect(initialSecondPackText).toBeTruthy();
			expect(initialFirstPackText).not.toBe(initialSecondPackText);

			// Drag drop pack from index 1 -> index 0
			const sourceIndex = 1;
			const targetIndex = 0;
			await performDragDrop(page, {
				sourceIndex,
				targetIndex,
				rowSelector: '[data-testid="pack-list-row"]',
				gripSelector: '[data-testid="pack-list-grip"]',
			});

			// Verify the source pack moved to the target position
			const reorderedPackListItems = page.locator('[data-testid="pack-list-row"]');
			const newFirstPackItem = reorderedPackListItems.nth(targetIndex);

			const newFirstPackText = await newFirstPackItem.textContent();

			// The source pack (originally 2nd) should now be in the first position
			expect(newFirstPackText).toBe(initialSecondPackText);
		});

		test('should reorder packs by dragging pack 1 to position 2', async ({
			page,
		}) => {
			// Ensure we have at least 2 packs
			const packListItems = page.locator('[data-testid="pack-list-row"]');
			const packCount = await packListItems.count();
			expect(packCount).toBeGreaterThanOrEqual(2);

			const firstPackItem = packListItems.nth(0);
			const secondPackItem = packListItems.nth(1);

			const initialFirstPackText = await firstPackItem.textContent();
			const initialSecondPackText = await secondPackItem.textContent();

			// Verify both packs have names
			expect(initialFirstPackText).toBeTruthy();
			expect(initialSecondPackText).toBeTruthy();
			expect(initialFirstPackText).not.toBe(initialSecondPackText);

			// Drag drop pack from index 0 -> index 1
			const sourceIndex = 0;
			const targetIndex = 1;

			await performDragDrop(page, {
				sourceIndex,
				targetIndex,
				rowSelector: '[data-testid="pack-list-row"]',
				gripSelector: '[data-testid="pack-list-grip"]',
			});

			// Verify the source pack moved to the target position
			const reorderedPackListItems = page.locator('[data-testid="pack-list-row"]');
			const newSecondPackItem = reorderedPackListItems.nth(targetIndex);

			const newSecondPackText = await newSecondPackItem.textContent();

			// The source pack (originally 1st) should now be in the second position
			expect(newSecondPackText).toBe(initialFirstPackText);
		});
	});
});
