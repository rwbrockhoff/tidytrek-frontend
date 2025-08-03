import type { Meta, StoryObj } from '@storybook/react';
import * as Modal from './modal';
import { Button } from '@/components/alpine';

const meta: Meta<typeof Modal.Root> = {
	title: 'Alpine/Modal',
	component: Modal.Root,
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Modal.Root>;

export const Open: Story = {
	render: () => (
		<Modal.Root open={true} onOpenChange={() => {}}>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.Header>
					<Modal.Title>Example Modal</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Modal.Description>This is a basic modal example.</Modal.Description>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="ghost">Cancel</Button>
					<Button>Confirm</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	),
};

export const Closed: Story = {
	render: () => (
		<>
			<Button>Open Modal</Button>
			<Modal.Root open={false} onOpenChange={() => {}}>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.Header>
						<Modal.Title>Example Modal</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Modal.Description>This is a basic modal example.</Modal.Description>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="ghost">Cancel</Button>
						<Button>Confirm</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal.Root>
		</>
	),
};
