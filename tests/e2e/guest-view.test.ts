import { test, expect } from '@playwright/test';

test.describe('Guest View Functionality', () => {
	// Set larger desktop viewport to ensure components are visible
	test.use({ viewport: { width: 1400, height: 900 } });

	test.beforeEach(async ({ page, request }) => {
		// Reset db
		await request.post('http://localhost:4002/test/reset');

		// Log out/clear session
		await page.context().clearCookies();
		await page.context().clearPermissions();

		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('should view guest profile and navigate to public pack', async ({ page }) => {
		// Navigate to the test user's profile page
		await page.goto('/user/testUser123');
		await page.waitForLoadState('networkidle');

		// Verify we're on the profile page
		const profilePage = page.locator('main');
		await expect(profilePage).toBeVisible();

		// Check username is displayed in profile header
		const usernameHeading = page.getByRole('heading', { name: /testUser123/i });
		await expect(usernameHeading).toBeVisible();

		// Check for at least one pack card visible (one seeded pack is public: true)
		const packCards = page.locator('.profilePackLink');
		await expect(packCards).toHaveCount(1);

		// Verify pack card contains the test pack name
		const testPackName = page.getByText('Test Pack');
		await expect(testPackName).toBeVisible();

		// Verify pack is "public"
		const publicLabel = page.getByText('Public');
		await expect(publicLabel).toBeVisible();

		// Click pack to navigate to pack view
		const packCard = packCards.first();
		await packCard.click();
		await page.waitForLoadState('networkidle');

		// Check that we can see the pack name heading
		const packNameHeading = page.getByTestId('pack-name-heading');
		await expect(packNameHeading).toBeVisible();
		await expect(packNameHeading).toHaveText('Test Pack');

		// Verify we can see the username in the pack view
		const usernameInPackView = page.getByText('testUser123');
		await expect(usernameInPackView).toBeVisible();

		// Verify we can see pack items in the table
		const gearItems = page.locator('table tr');
		const itemCount = await gearItems.count();
		expect(itemCount).toBeGreaterThan(1); // More than header row

		// Verify we can see a specific pack item (in an input field)
		const testItem = page.locator('input[value*="Hyperlite Mountain Gear SW 2400"]');
		await expect(testItem).toBeVisible();

		// Verify the URL is correct for guest pack view (should use /pk/ prefix)
		expect(page.url()).toMatch(/\/pk\/\w+/);
	});

	test('should handle private profile correctly', async ({ page }) => {
		// go to non-existent user profile
		await page.goto('/user/nonexistentuser');
		await page.waitForLoadState('networkidle');

		// Should show "User not found" message
		const notFoundMessage = page.getByText('User not found');
		await expect(notFoundMessage).toBeVisible();

		const subtitleMessage = page.getByText(
			"This user doesn't exist or the link is incorrect.",
		);
		await expect(subtitleMessage).toBeVisible();
	});

	test('should show profile banner for non-authenticated users', async ({ page }) => {
		// Navigate to guest profile
		await page.goto('/user/testUser123');
		await page.waitForLoadState('networkidle');

		// Verify promotional banner is shown for non-auth users
		const profileBanner = page
			.locator('[data-testid="profile-banner"]')
			.or(page.getByText(/sign up/i).or(page.getByText(/create account/i)));

		// Verify signup button is visible
		const signupText = page
			.getByText(/sign up/i)
			.or(page.getByText(/join/i))
			.or(page.getByText(/create/i));
		await expect(signupText.first()).toBeVisible();
	});
});
