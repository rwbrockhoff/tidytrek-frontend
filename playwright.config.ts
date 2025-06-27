import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const TEST_FRONTEND_URL = 'http://localhost:5174';

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: false, // run tests one at a time (shared database)
	// Fail for only() use in CI
	forbidOnly: !!process.env.CI,
	// Retry twice in CI
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	reporter: 'html',
	use: {
		baseURL: TEST_FRONTEND_URL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},

	projects: [
		{
			name: 'auth-setup',
			testDir: './tests/auth.setup.ts',
		},
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				storageState: 'tests/.auth/user.json',
			},
			dependencies: ['auth-setup'],
		},
	],

	webServer: {
		command: 'npm run dev:test',
		url: TEST_FRONTEND_URL,
		// Reuse dev server locally, fresh server in CI
		reuseExistingServer: !process.env.CI,
		// Longer timeout
		timeout: 120 * 1000,
	},
});
