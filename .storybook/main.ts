/** @type { import('@storybook/react-vite').StorybookConfig } */

const config = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-docs'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	viteFinal: async (config) => {
		// Need this for @ imports to work
		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...config.resolve.alias,
			'@': '/src',
		};
		return config;
	},
};
export default config;
