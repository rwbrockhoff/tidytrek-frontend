import React from 'react';
import '../src/styles/index.css';
import '../src/index.css';

const preview = {
	parameters: {
		layout: 'centered',
	},
	globalTypes: {
		theme: {
			defaultValue: 'light',
			toolbar: {
				title: 'Theme',
				items: ['light', 'dark'],
			},
		},
	},
	decorators: [
		(Story, context) => {
			const theme = context.globals.theme || 'light';

			// Apply theme to body for Radix portal content
			React.useEffect(() => {
				document.body.setAttribute('data-theme', theme);
				return () => {
					document.body.removeAttribute('data-theme');
				};
			}, [theme]);

			return (
				<div data-theme={theme}>
					<Story />
				</div>
			);
		},
	],
};

export default preview;
