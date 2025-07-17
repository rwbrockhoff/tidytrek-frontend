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
				manualChunks: (id) => {
					// Keep components together to avoid circular deps
					if (id.includes('src/components')) return 'components';

					// Libraries
					if (
						id.includes('react') ||
						id.includes('react-dom') ||
						id.includes('react-router-dom')
					)
						return 'react';
					if (id.includes('@radix-ui/themes') || id.includes('@radix-ui/react-form'))
						return 'radix';
					if (id.includes('@tanstack/react-query')) return 'query';
					if (id.includes('chart.js') || id.includes('react-chartjs-2')) return 'charts';
					if (id.includes('react-beautiful-dnd')) return 'dnd';
					if (id.includes('@supabase/supabase-js') || id.includes('axios'))
						return 'supabase';
					if (id.includes('zod') || id.includes('hashids') || id.includes('lucide-react'))
						return 'utils';
				},
			},
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/setup.ts',
		css: true,
		testTimeout: 10000, // increase global test timeout to 10s
		maxConcurrency: 4, // Reduce parallel test runs
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/tests/e2e/**', // Exclude E2E tests
			'**/playwright-report/**',
		],
		include: ['**/src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
		coverage: {
			exclude: ['**/node_modules/**', '**/dist/**', '**/*.config.*', '**/coverage/**'],
		},
	},
}));
