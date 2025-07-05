import type { Meta, StoryObj } from '@storybook/react';
import { TableRoot, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell, TableFooter } from './table';

const meta: Meta<typeof TableRoot> = {
	title: 'Alpine UI/Table',
	component: TableRoot,
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'surface', 'ghost'],
		},
		size: {
			control: 'select',
			options: ['1', '2', '3'],
		},
		compact: {
			control: 'boolean',
		},
		striped: {
			control: 'boolean',
		},
		rounded: {
			control: 'select',
			options: [false, true, 'sm', 'md', 'lg'],
		},
		shadow: {
			control: 'select',
			options: [false, true, 'classic', 'spread', 'paper'],
		},
		highlight: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof TableRoot>;

export const Default: Story = {
	args: {
		variant: 'default',
		size: '2',
	},
	render: (args) => (
		<TableRoot {...args}>
			<TableHeader>
				<TableRow>
					<TableHeaderCell>Item Name</TableHeaderCell>
					<TableHeaderCell>Description</TableHeaderCell>
					<TableHeaderCell justify="center">Quantity</TableHeaderCell>
					<TableHeaderCell justify="center">Weight</TableHeaderCell>
					<TableHeaderCell justify="end">Price</TableHeaderCell>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Ultralight Tent</TableCell>
					<TableCell>3-season backpacking tent</TableCell>
					<TableCell textAlign="center">1</TableCell>
					<TableCell textAlign="center">2.1 lbs</TableCell>
					<TableCell textAlign="end">$299.99</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Sleeping Bag</TableCell>
					<TableCell>Down insulation, 20°F rating</TableCell>
					<TableCell textAlign="center">1</TableCell>
					<TableCell textAlign="center">1.8 lbs</TableCell>
					<TableCell textAlign="end">$399.99</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Water Filter</TableCell>
					<TableCell>Portable filtration system</TableCell>
					<TableCell textAlign="center">1</TableCell>
					<TableCell textAlign="center">0.4 lbs</TableCell>
					<TableCell textAlign="end">$49.99</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell></TableCell>
					<TableCell textAlign="center">3</TableCell>
					<TableCell textAlign="center">4.3 lbs</TableCell>
					<TableCell textAlign="end">$749.97</TableCell>
				</TableRow>
			</TableFooter>
		</TableRoot>
	),
};

export const Surface: Story = {
	args: {
		variant: 'surface',
		size: '2',
	},
	render: (args) => (
		<TableRoot {...args}>
			<TableHeader>
				<TableRow>
					<TableHeaderCell>Item Name</TableHeaderCell>
					<TableHeaderCell>Description</TableHeaderCell>
					<TableHeaderCell justify="center">Quantity</TableHeaderCell>
					<TableHeaderCell justify="center">Weight</TableHeaderCell>
					<TableHeaderCell justify="end">Price</TableHeaderCell>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Ultralight Tent</TableCell>
					<TableCell>3-season backpacking tent</TableCell>
					<TableCell textAlign="center">1</TableCell>
					<TableCell textAlign="center">2.1 lbs</TableCell>
					<TableCell textAlign="end">$299.99</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Sleeping Bag</TableCell>
					<TableCell>Down insulation, 20°F rating</TableCell>
					<TableCell textAlign="center">1</TableCell>
					<TableCell textAlign="center">1.8 lbs</TableCell>
					<TableCell textAlign="end">$399.99</TableCell>
				</TableRow>
			</TableBody>
		</TableRoot>
	),
};

export const Ghost: Story = {
	args: {
		variant: 'ghost',
		size: '2',
	},
	render: (args) => (
		<TableRoot {...args}>
			<TableHeader>
				<TableRow>
					<TableHeaderCell>Item Name</TableHeaderCell>
					<TableHeaderCell>Description</TableHeaderCell>
					<TableHeaderCell justify="center">Quantity</TableHeaderCell>
					<TableHeaderCell justify="center">Weight</TableHeaderCell>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Ultralight Tent</TableCell>
					<TableCell>3-season backpacking tent</TableCell>
					<TableCell textAlign="center">1</TableCell>
					<TableCell textAlign="center">2.1 lbs</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Sleeping Bag</TableCell>
					<TableCell>Down insulation, 20°F rating</TableCell>
					<TableCell textAlign="center">1</TableCell>
					<TableCell textAlign="center">1.8 lbs</TableCell>
				</TableRow>
			</TableBody>
		</TableRoot>
	),
};
