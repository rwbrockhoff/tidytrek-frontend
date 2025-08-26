import { Dialog } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { ClosetIcon, TrashIcon } from '@/components/icons';
import React from 'react';

type DeletePackItemModalProps = {
	children: React.ReactNode;
	id: number | null;
	itemName?: string;
	hasPackId: boolean;
	onClickDelete: (packItemId: number) => void;
	onClickMove: () => void | undefined;
	onClose?: () => void;
};

export const DeletePackItemModal = (props: DeletePackItemModalProps) => {
	const { children, id, itemName, hasPackId, onClickDelete, onClickMove, onClose } = props;

	const packMessage = 'This will permanently delete your item. You can also move it to your gear closet instead.';
	const gearClosetMessage = 'This will delete your item permanently.';
	const handleDelete = () => {
		if (id) onClickDelete(id);
	};

	return (
		<Dialog.Root onOpenChange={(open) => !open && onClose?.()}>
			<Dialog.Trigger>{children}</Dialog.Trigger>
			<Dialog.Content style={{ maxWidth: 400 }}>
				<Dialog.Title>Delete {itemName || 'item'}?</Dialog.Title>
				<Dialog.Description>
					{hasPackId ? packMessage : gearClosetMessage}
				</Dialog.Description>
				<Flex className="gap-3 mt-4 justify-end">
					{hasPackId && (
						<Button
							variant="outline"
							size="md"
							onClick={onClickMove}
							aria-label="Move pack item to gear closet">
							<ClosetIcon /> Move to Gear Closet
						</Button>
					)}

					<Button
						color="danger"
						size="md"
						onClick={handleDelete}
						aria-label="Delete pack item permanently">
						<TrashIcon /> Delete
					</Button>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};
