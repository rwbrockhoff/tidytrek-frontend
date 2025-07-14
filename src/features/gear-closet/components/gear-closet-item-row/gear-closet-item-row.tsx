import { useState } from 'react';
import { type GearClosetItem, type PackListItem } from '@/types/pack-types';
import { PackItemRow } from '@/shared/components/pack-item-management/pack-item-row';
import { useGearClosetOperations } from '../../hooks/use-gear-closet-operations';
import { DeleteGearClosetItemModal } from '../delete-gear-closet-item-modal/delete-gear-closet-item-modal';

type GearClosetItemRowProps = {
	item: GearClosetItem;
	userView?: boolean;
	availablePacks?: PackListItem[];
};

export const GearClosetItemRow = ({
	item,
	userView = false,
	availablePacks = [],
}: GearClosetItemRowProps) => {
	const { navigateToEdit } = useGearClosetOperations();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleEdit = () => {
		navigateToEdit(item);
	};

	const handleDelete = () => {
		setShowDeleteModal(true);
	};

	return (
		<>
			<PackItemRow
				item={item}
				userView={userView}
				onEdit={handleEdit}
				onDelete={handleDelete}
				availablePacks={availablePacks}
			/>
			
			<DeleteGearClosetItemModal
				item={item}
				isOpen={showDeleteModal}
				onCancel={() => setShowDeleteModal(false)}
			/>
		</>
	);
};