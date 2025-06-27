import { test, expect } from '@playwright/test';
import { MailSlurp } from 'mailslurp-client';

// Used for dev test environment
const apiKey = process.env.MAILSLURP_API_KEY;

test.describe('Authentication Flow', () => {
	test.use({ viewport: { width: 1400, height: 900 } });

	test.beforeEach(async ({ page, request }) => {
		// Reset database
		await request.post('http://localhost:4002/test/reset');

		// Ensure we're logged out
		await page.context().clearCookies();
		await page.context().clearPermissions();

		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test.describe('Registration Form', () => {
		test('should show registration form when toggled', async ({ page }) => {
			// Click to registration page
			const switchToRegister = page.getByText(/sign up/i);
			await expect(switchToRegister).toBeVisible();
			await switchToRegister.click();

			// Verify registration form is visible
			await expect(page.getByTestId('first-name-input')).toBeVisible();
			await expect(page.getByTestId('last-name-input')).toBeVisible();
			await expect(page.getByTestId('email-input')).toBeVisible();
			await expect(page.getByTestId('password-input')).toBeVisible();

			const createAccountButton = page.getByRole('button', { name: /create account/i });
			await expect(createAccountButton).toBeVisible();
			await expect(createAccountButton).toHaveText(/create account/i);
		});

		test('should require valid email format during registration', async ({ page }) => {
			// Click to registration page
			await page.getByText(/sign up/i).click();

			// Fill form with invalid email
			await page.getByTestId('first-name-input').fill('Josh');
			await page.getByTestId('last-name-input').fill('Collins');
			await page.getByTestId('email-input').fill('jcollins@gmail'); // Invalid email
			await page.getByTestId('password-input').fill('password123');

			// Submit
			await page.getByRole('button', { name: /create account/i }).click();

			// Check for error message
			await expect(page.getByTestId('auth-message-error')).toBeVisible();
		});

		test.skip('should successfully register with valid credentials', async ({ page }) => {
			// This test hits our Supabase and Mailslurp endpoint and should be ran sparingly

			// Switch to registration form
			await page.getByText(/sign up/i).click();

			// Create mailslurp email address or use fallback
			let testEmail = 'e2e_test@tidytrek.co';
			if (apiKey) {
				const mailslurp = new MailSlurp({ apiKey });
				const inbox = await mailslurp.createInbox();
				testEmail = inbox.emailAddress;
			}

			// Fill form with valid user info
			await page.getByTestId('first-name-input').fill('John');
			await page.getByTestId('last-name-input').fill('Doe');
			await page.getByTestId('email-input').fill(testEmail);
			await page.getByTestId('password-input').fill('SecurePass123!');

			// Submit registration
			await page.getByRole('button', { name: /create account/i }).click();

			await page.waitForLoadState('networkidle');

			// Check for success message
			await expect(page.getByTestId('auth-message-success')).toBeVisible({
				timeout: 1000,
			});
		});
	});

	test.describe('Login Form', () => {
		test('should show login form by default', async ({ page }) => {
			// Verify login form is visible
			await expect(page.getByTestId('email-input')).toBeVisible();
			await expect(page.getByTestId('password-input')).toBeVisible();

			const loginButton = page.getByRole('button', { name: /login/i });
			await expect(loginButton).toBeVisible();
			await expect(loginButton).toHaveText(/login/i);
		});

		test('should require valid credentials for login', async ({ page }) => {
			// Try to login with invalid credentials
			await page.getByTestId('email-input').fill('invalid@example.com');
			await page.getByTestId('password-input').fill('wrongpassword');

			await page.getByRole('button', { name: /login/i }).click();

			await page.waitForLoadState('networkidle');

			// Check for error message
			await expect(page.getByTestId('auth-message-error')).toBeVisible({ timeout: 1000 });
		});

		test('should successfully login with valid credentials', async ({ page }) => {
			// Use the same valid credentials from auth.setup.ts
			await page.getByTestId('email-input').fill('test@tidytrek.co');
			await page.getByTestId('password-input').fill('tidyHiker123');

			await page.getByRole('button', { name: /login/i }).click();

			// Wait for login success and redirect
			await page.waitForLoadState('networkidle');

			// Verify successful login by checking for dashboard content
			await expect(page.getByRole('heading', { name: 'Test Pack' })).toBeVisible({
				timeout: 5000,
			});
		});
	});

	test.describe('Form Navigation', () => {
		test('should switch between login and registration forms', async ({ page }) => {
			// Start on login form
			await expect(page.getByRole('button', { name: /login/i })).toBeVisible();

			// Switch to registration
			await page.getByText(/sign up/i).click();
			await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
			await expect(page.getByTestId('first-name-input')).toBeVisible();

			// Switch back to login
			await page.getByText(/log in/i).click();
			await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
			await expect(page.getByTestId('first-name-input')).not.toBeVisible();
		});

		test('should clear form data when switching between forms', async ({ page }) => {
			// Fill login form
			await page.getByTestId('email-input').fill('test@example.com');
			await page.getByTestId('password-input').fill('password123');

			// Switch to registration
			await page.getByText(/sign up/i).click();

			// Verify email field is cleared
			const emailValue = await page.getByTestId('email-input').inputValue();
			expect(emailValue).toBe('');
		});
	});

	test.describe('Password Reset Flow', () => {
		test('should navigate to reset password page', async ({ page }) => {
			await page.goto('/reset-password');
			await page.waitForLoadState('networkidle');

			// Verify reset password form elements
			await expect(page.getByRole('heading', { name: /reset password/i })).toBeVisible();
			await expect(page.getByPlaceholder('Email')).toBeVisible();
			await expect(page.getByRole('button', { name: /reset password/i })).toBeVisible();
		});

		test('should require valid email format for password reset', async ({ page }) => {
			await page.goto('/reset-password');

			// Try with invalid email
			await page.getByPlaceholder('Email').fill('invalid-email');
			await page.getByRole('button', { name: /reset password/i }).click();

			// Should show validation error
			await expect(page.getByTestId('email-error')).toBeVisible();
		});

		test.skip('should send reset email for valid email', async ({ page }) => {
			// This test hits Supabase endpoint and should be run sparingly
			await page.goto('/reset-password');

			// Use MailSlurp email or fallback
			let testEmail = 'reset_test@tidytrek.co';
			if (apiKey) {
				const mailslurp = new MailSlurp({ apiKey });
				const inbox = await mailslurp.createInbox();
				testEmail = inbox.emailAddress;
			}

			await page.getByPlaceholder('Email').fill(testEmail);
			await page.getByRole('button', { name: /reset password/i }).click();

			// Should show success message
			await expect(page.getByTestId('reset-password-message-success')).toBeVisible({
				timeout: 5000,
			});
		});

		test('should show password reset form when accessing confirm route', async ({
			page,
		}) => {
			// Simulate access to password reset confirm route (would normally come from email link)
			await page.goto('/reset-password/confirm');
			await page.waitForLoadState('networkidle');

			// Verify password reset confirmation form
			await expect(page.getByRole('heading', { name: /reset password/i })).toBeVisible();
			await expect(page.getByTestId('password-input')).toBeVisible();
			await expect(page.getByTestId('confirm-password-input')).toBeVisible();
			await expect(
				page.getByRole('button', { name: /confirm new password/i }),
			).toBeVisible();
		});

		test('should validate password confirmation fields', async ({ page }) => {
			await page.goto('/reset-password/confirm');

			// Fill passwords that don't match
			await page.getByTestId('password-input').fill('NewPass123!');
			await page.getByTestId('confirm-password-input').fill('DifferentPass123!');
			await page.getByRole('button', { name: /confirm new password/i }).click();

			// Should show validation error
			await expect(page.getByTestId('confirm-password-error')).toBeVisible();
		});

		test('should require valid password format', async ({ page }) => {
			await page.goto('/reset-password/confirm');

			// Fill with weak password
			await page.getByTestId('password-input').fill('weak');
			await page.getByTestId('confirm-password-input').fill('weak');
			await page.getByRole('button', { name: /confirm new password/i }).click();

			// Should show password validation error
			await expect(page.getByTestId('password-error')).toBeVisible();
		});
	});
});
