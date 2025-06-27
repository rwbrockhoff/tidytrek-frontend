import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/setup.ts',
		css: true,
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/tests/e2e/**', // Exclude E2E tests
			'**/playwright-report/**',
		],
		include: ['**/src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
	},
});
