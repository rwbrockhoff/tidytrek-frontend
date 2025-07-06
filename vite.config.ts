import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
	plugins: [react(), tsconfigPaths()],
	// Production app ran from s3-bucket in /app/ directory
	// Use pre-defined mode prop from Vite
	base: mode === 'production' ? '/app/' : '/',
	server: {
		hmr: {
			overlay: true,
		},
		watch: {
			usePolling: false,
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// React
					'vendor-react': ['react', 'react-dom', 'react-router-dom'],
					// UI
					'vendor-ui': ['@radix-ui/themes', '@radix-ui/react-form'],
					// Data fetching
					'vendor-query': ['@tanstack/react-query', '@tanstack/react-query-devtools'],
					// Charts
					'vendor-chart': ['chart.js', 'react-chartjs-2'],
					// Drag and drop
					'vendor-dnd': ['react-beautiful-dnd'],
					// Auth & API
					'vendor-auth': ['@supabase/supabase-js', 'axios'],
					// Utilities
					'vendor-utils': ['zod', 'hashids', 'react-icons'],
				},
			},
		},
	},
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
		coverage: {
			exclude: [
				'**/node_modules/**',
				'**/dist/**',
				'**/*.config.*',
				'**/coverage/**',
			],
		},
	},
}));
