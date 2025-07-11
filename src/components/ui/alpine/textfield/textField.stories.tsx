import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../';
import { SearchIcon } from '../../icons';
import { Form } from 'radix-ui';

const meta = {
	title: 'Alpine/TextField',
	component: TextField.Standalone,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof TextField.Standalone>;

export default meta;
type Story = StoryObj;

// Basic variants
export const Default: Story = {
	args: {
		placeholder: 'Enter your text...',
		variant: 'default',
	},
};

export const Minimal: Story = {
	args: {
		placeholder: 'Table input',
		variant: 'minimal',
	},
};

export const WithIcon: Story = {
	args: {
		placeholder: 'Search...',
		variant: 'icon',
		icon: <SearchIcon size={16} />,
		iconPosition: 'left',
	},
};

// States showcase
export const AllStates: Story = {
	render: () => (
		<div
			style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
			<TextField.Standalone placeholder="Normal state" variant="default" />
			<TextField.Standalone placeholder="Error state" variant="default" error />
			<TextField.Standalone placeholder="Disabled state" variant="default" disabled />
			<TextField.Standalone placeholder="Minimal normal" variant="minimal" />
			<TextField.Standalone placeholder="Minimal error" variant="minimal" error />
			<TextField.Standalone
				placeholder="With icon"
				variant="icon"
				icon={<SearchIcon size={16} />}
			/>
		</div>
	),
};

// Form context example
export const FormIntegration: Story = {
	render: () => (
		<Form.Root
			style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<TextField.Input
				name="email"
				label="Email Address"
				placeholder="Enter your email"
				type="email"
				variant="default"
			/>
			<TextField.Input
				name="password"
				label="Password"
				placeholder="Enter your password"
				type="password"
				variant="default"
				message="Password must be at least 8 characters"
			/>
		</Form.Root>
	),
};
