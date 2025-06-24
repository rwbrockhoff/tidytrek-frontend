import { test as setup, expect } from '@playwright/test';

const authFile = 'tests/.auth/user.json';

setup('authenticate', async ({ page, request }) => {
	// First, reset the test database to ensure clean state
	await request.post('http://localhost:4002/test/reset');

	// Clear any existing auth state
	await page.context().clearCookies();
	await page.context().clearPermissions();

	// Navigate to login page
	await page.goto('/');

	// Wait for the login form to load
	await page.waitForSelector('[data-testid="email-input"]');

	// Fill login credentials
	await page.getByTestId('email-input').fill('test@tidytrek.co');
	await page.locator('input[type="password"]').fill('tidyHiker123');

	// Click login button
	await page.getByRole('button', { name: 'Login' }).click();

	// Wait for login to complete and page to load
	await page.waitForLoadState('networkidle');
	
	// Give React time to render components
	await page.waitForTimeout(2000);

	// Verify we're logged in by checking for pack content
	await expect(page.getByRole('button', { name: 'Test Pack' })).toBeVisible({ timeout: 10000 });

	// Save signed-in state to file
	await page.context().storageState({ path: authFile });
});
