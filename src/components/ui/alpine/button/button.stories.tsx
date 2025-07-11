import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
	title: 'Alpine/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: 'Button',
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
			<Button variant="default">Default</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};

export const Loading: Story = {
	args: {
		loading: true,
		children: 'Loading...',
	},
};

export const WithIcons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
			<Button iconLeft="📁">Open File</Button>
			<Button iconRight="→">Continue</Button>
			<Button iconLeft="🔗" iconRight="↗">External Link</Button>
			<Button variant="outline" iconLeft="❌">Cancel</Button>
		</div>
	),
};