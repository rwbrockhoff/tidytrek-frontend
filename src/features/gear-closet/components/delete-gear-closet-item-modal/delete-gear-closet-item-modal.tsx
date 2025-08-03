import { Dialog } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { type GearClosetItem } from '@/types/pack-types';
import { useDeleteGearClosetItem } from '../../hooks/use-delete-gear-closet-item';

type DeleteGearClosetItemModalProps = {
	item: GearClosetItem;
	isOpen: boolean;
	onCancel: () => void;
};

export const DeleteGearClosetItemModal = ({
	item,
	isOpen,
	onCancel,
}: DeleteGearClosetItemModalProps) => {
	const { deleteItem, isDeleting } = useDeleteGearClosetItem();

	const handleDelete = () => {
		deleteItem(item);
		onCancel();
	};
	return (
		<Dialog.Root open={isOpen} onOpenChange={onCancel}>
			<Dialog.Content style={{ maxWidth: '450px' }}>
				<Dialog.Title>Delete {item.packItemName}?</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					This will permanently delete this item from your gear closet. This action cannot be undone.
				</Dialog.Description>

				<div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
					<Button variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button 
						color="danger" 
						onClick={handleDelete}
						loading={isDeleting}
					>
						Delete Forever
					</Button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	);
};