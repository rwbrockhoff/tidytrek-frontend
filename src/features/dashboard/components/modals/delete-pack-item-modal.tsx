import { Dialog } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { ShareIcon, TrashIcon } from '@/components/icons';
import React from 'react';

type DeletePackItemModalProps = {
	children: React.ReactNode;
	id: number | null;
	hasPackId: boolean;
	onClickDelete: (packItemId: number) => void;
	onClickMove: () => void | undefined;
};

export const DeletePackItemModal = (props: DeletePackItemModalProps) => {
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
				<Flex className="gap-3 mt-4 justify-end">
					<Dialog.Close>
						<Button
							color="danger"
							size="md"
							onClick={handleDelete}
							aria-label="Delete pack item permanently">
							<TrashIcon /> Delete
						</Button>
					</Dialog.Close>

					{hasPackId && (
						<Dialog.Close>
							<Button
								size="md"
								onClick={onClickMove}
								aria-label="Move pack item to gear closet">
								<ShareIcon /> Move to Gear Closet
							</Button>
						</Dialog.Close>
					)}
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};