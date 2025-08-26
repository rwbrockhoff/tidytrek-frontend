import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
	title: 'Alpine/Alert',
	component: Alert,
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
	args: {
		children: 'This is a default alert message.',
	},
};

export const Examples: Story = {
	render: () => (
		<div
			style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px' }}>
			<Alert variant="success">Your changes have been saved successfully.</Alert>
			<Alert variant="error">An error occurred while processing your request.</Alert>
			<Alert variant="error" size="sm">
				Small error alert.
			</Alert>
		</div>
	),
};

export const Test: Story = {
	args: {
		children: 'This is a default alert message.',
		variant: 'success',
	},
};
