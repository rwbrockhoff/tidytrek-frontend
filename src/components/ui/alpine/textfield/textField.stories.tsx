import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './textfield';
import { SearchIcon } from '../../icons';
import { Form } from 'radix-ui';

const meta = {
	title: 'UI/TextField',
	component: TextField.Standalone,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
Custom TextField built with Radix primitives and design tokens.

**Variants:**
- Default: Standard input styling
- Minimal: Transparent for tables/inline editing  
- Icon: With left or right icons

Uses Radix Form primitives for accessibility and validation.
        `,
			},
		},
	},
	tags: ['autodocs'],
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
	parameters: {
		docs: {
			description: {
				story: 'Good for tables - transparent until hover/focus.',
			},
		},
	},
};

export const WithIcon: Story = {
	args: {
		placeholder: 'Search...',
		variant: 'icon',
		icon: <SearchIcon />,
		iconPosition: 'left',
	},
	parameters: {
		docs: {
			description: {
				story: 'Icons can go left or right.',
			},
		},
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
				icon={<SearchIcon />}
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Shows all states and variants.',
			},
		},
	},
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
	parameters: {
		docs: {
			description: {
				story: 'Using with Radix Form for validation.',
			},
		},
	},
};

// Interactive playground
export const Playground: Story = {
	args: {
		placeholder: 'Type here...',
		variant: 'default',
		type: 'text',
		disabled: false,
		error: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Try different props.',
			},
		},
	},
};
