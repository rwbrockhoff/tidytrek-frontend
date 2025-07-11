import { Dialog, Flex, Button } from '@radix-ui/themes';
import React from 'react';
import { ShareIcon, TrashIcon } from '../icons';

type DeleteModalProps = {
	children?: React.ReactNode;
	simple?: boolean;
	header?: string;
	message?: string;
	open?: boolean;
	toggleOpen?: () => void;
	onClickMove?: () => void;
	onClickDelete: () => void;
};

export const DeleteModal = (props: DeleteModalProps) => {
	const {
		children,
		simple,
		header,
		message,
		open = false,
		toggleOpen,
		onClickDelete,
		onClickMove,
	} = props;
	const hasChildren = children !== undefined;
	// modal can be controlled within children or uncontrolled by default (radix modal primitive)
	const controlledProps = hasChildren ? {} : { open, onOpenChange: toggleOpen };
	return (
		<Dialog.Root {...controlledProps}>
			{hasChildren && <Dialog.Trigger>{children}</Dialog.Trigger>}
			<Dialog.Content style={{ maxWidth: 400 }}>
				<Dialog.Title>{header}</Dialog.Title>

				<Dialog.Description>{message}</Dialog.Description>

				<Flex gap="3" mt="4" justify="end">
					<Dialog.Close>
						<Button
							// variant="soft"
							color="tomato"
							size="3"
							onClick={onClickDelete}>
							<TrashIcon size={16} /> Delete
						</Button>
					</Dialog.Close>

					{!simple && (
						<Dialog.Close>
							<Button size="3" onClick={onClickMove}>
								<ShareIcon size={16} /> Move to Gear Closet
							</Button>
						</Dialog.Close>
					)}
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};

type DeleteItemModalProps = {
	children: React.ReactNode;
	id: number | null;
	hasPackId: boolean;
	onClickDelete: (packItemId: number) => void;
	onClickMove: () => void | undefined;
};

export const DeleteItemModal = (props: DeleteItemModalProps) => {
	const { children, id, hasPackId, onClickDelete, onClickMove } = props;

	const packMessage = 'Do you want to delete or move your item to your gear closet?';
	const gearClosetMessage = 'This will delete your item permanently.';
	const handleDelete = () => {
		if (id) onClickDelete(id);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger>{children}</Dialog.Trigger>
			<Dialog.Content style={{ maxWidth: 400 }}>
				<Dialog.Title>Are you sure?</Dialog.Title>
				<Dialog.Description>
					{hasPackId ? packMessage : gearClosetMessage}
				</Dialog.Description>
				<Flex gap="3" mt="4" justify="end">
					<Dialog.Close>
						<Button
							color="tomato"
							size="3"
							onClick={handleDelete}
							aria-label="Delete pack item permanently">
							<TrashIcon size={16} /> Delete
						</Button>
					</Dialog.Close>

					{hasPackId && (
						<Dialog.Close>
							<Button
								size="3"
								onClick={onClickMove}
								aria-label="Move pack item to gear closet">
								<ShareIcon size={16} /> Move to Gear Closet
							</Button>
						</Dialog.Close>
					)}
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};
