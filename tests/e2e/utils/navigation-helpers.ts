import { Page, expect } from '@playwright/test';

// Navigates to a specific pack for e2e testing

export async function navigateToPack(page: Page, packName: string) {
	await page.goto('/');
	await page.waitForLoadState('networkidle');

	// Check if we're already on the correct pack
	const packHeading = page.getByTestId('pack-name-heading');
	const currentPackName = await packHeading.textContent();
	const isAlreadyOnPack = currentPackName?.trim() === packName;

	if (!isAlreadyOnPack) {
		// Find and click the pack list item with exact text
		const targetPackItem = page
			.getByTestId('pack-list-row')
			.filter({ hasText: new RegExp(`^${packName}$`) });
		await targetPackItem.click();
		await page.waitForLoadState('networkidle');
	}

	// Verify we're on the correct pack
	await expect(packHeading).toBeVisible();
	await expect(packHeading).toHaveText(packName);
}
