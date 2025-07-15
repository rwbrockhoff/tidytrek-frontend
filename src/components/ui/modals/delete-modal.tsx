import { Dialog } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { TrashIcon } from '@/components/icons';
import React from 'react';

type SecondaryAction = {
	text: string;
	onClick: () => void;
	icon?: React.ReactNode;
};

type DeleteModalProps = {
	children?: React.ReactNode;
	title?: string;
	description?: string;
	open?: boolean;
	onOpenChange?: () => void;
	onDelete: () => void;
	secondaryAction?: SecondaryAction;
};

export const DeleteModal = (props: DeleteModalProps) => {
	const {
		children,
		title = 'Are you sure?',
		description = 'This action cannot be undone.',
		open = false,
		onOpenChange,
		onDelete,
		secondaryAction,
	} = props;
	
	const hasChildren = children !== undefined;
	// modal can be controlled within children or uncontrolled by default (radix modal primitive)
	const controlledProps = hasChildren ? {} : { open, onOpenChange };
	
	return (
		<Dialog.Root {...controlledProps}>
			{hasChildren && <Dialog.Trigger>{children}</Dialog.Trigger>}
			<Dialog.Content style={{ maxWidth: 400 }}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Description>{description}</Dialog.Description>

				<Flex className="gap-3 mt-4 justify-end">
					<Dialog.Close>
						<Button variant="danger" onClick={onDelete} iconLeft={<TrashIcon />}>
							Delete
						</Button>
					</Dialog.Close>

					{secondaryAction && (
						<Dialog.Close>
							<Button onClick={secondaryAction.onClick} iconLeft={secondaryAction.icon}>
								{secondaryAction.text}
							</Button>
						</Dialog.Close>
					)}
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};

