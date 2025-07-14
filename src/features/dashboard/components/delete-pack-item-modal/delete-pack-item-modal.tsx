import { Dialog } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { type PackItem } from '@/types/pack-types';
import { useDeletePackItem } from '../../hooks/use-delete-pack-item';

type DeletePackItemModalProps = {
	item: PackItem;
	isOpen: boolean;
	onCancel: () => void;
};

export const DeletePackItemModal = ({
	item,
	isOpen,
	onCancel,
}: DeletePackItemModalProps) => {
	const { deleteItem, moveToCloset, isDeleting, isMoving } = useDeletePackItem();

	const handleDelete = () => {
		deleteItem(item);
		onCancel();
	};

	const handleMoveToCloset = () => {
		moveToCloset(item);
		onCancel();
	};
	return (
		<Dialog.Root open={isOpen} onOpenChange={onCancel}>
			<Dialog.Content style={{ maxWidth: '450px' }}>
				<Dialog.Title>Remove {item.packItemName}?</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					You can move this item to your gear closet or delete it permanently.
				</Dialog.Description>

				<div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
					<Button variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button 
						variant="secondary" 
						onClick={handleMoveToCloset}
						loading={isMoving}
					>
						Move to Closet
					</Button>
					<Button 
						variant="danger" 
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