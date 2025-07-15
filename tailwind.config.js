/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				sage: {
					100: 'var(--sage-100)',
					200: 'var(--sage-200)',
					300: 'var(--sage-300)',
					400: 'var(--sage-400)',
					500: 'var(--sage-500)',
					600: 'var(--sage-600)',
					700: 'var(--sage-700)',
					800: 'var(--sage-800)',
					900: 'var(--sage-900)',
				},
			},
		},
	},
	// restrict to layout
	corePlugins: {
		// layout
		display: true,
		flexbox: true,
		spacing: true,
		position: true,
		alignContent: true,
		alignItems: true,
		alignSelf: true,
		justifyContent: true,
		justifyItems: true,
		justifySelf: true,
		gap: true,
		// other styles currently disabled
		backgroundColor: false,
		textColor: false,
		borderColor: false,
		borderRadius: false,
		boxShadow: false,
		opacity: false,
	},
	plugins: [],
};
