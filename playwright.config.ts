import { defineConfig, devices } from '@playwright/test';

const TEST_FRONTEND_URL = 'http://localhost:5174';

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: TEST_FRONTEND_URL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},

	projects: [
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/,
		},
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				storageState: 'tests/.auth/user.json',
			},
			dependencies: ['setup'],
		},
	],

	webServer: {
		command: 'npm run dev:test',
		url: TEST_FRONTEND_URL,
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});
