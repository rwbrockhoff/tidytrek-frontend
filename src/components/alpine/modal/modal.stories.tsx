import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Modal</Button>
				<Modal.Root open={open} onOpenChange={setOpen}>
					<Modal.Overlay />
					<Modal.Content>
						<Modal.Header>
							<Modal.Title>Example Modal</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Modal.Description>This is a basic modal example.</Modal.Description>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="ghost" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button onClick={() => setOpen(false)}>Confirm</Button>
						</Modal.Footer>
					</Modal.Content>
				</Modal.Root>
			</>
		);
	},
};
