import '../src/styles/theme/index.css';
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
			return (
				<div data-theme={theme}>
					<Story />
				</div>
			);
		},
	],
};

export default preview;
