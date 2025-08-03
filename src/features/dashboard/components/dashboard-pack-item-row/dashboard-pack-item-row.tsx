import { useState } from 'react';
import { type PackItem, type PackListItem } from '@/types/pack-types';
import { PackItemRow } from '@/shared/components/pack-item-management/pack-item-row';
import { usePackItemNavigation } from '../../hooks/use-pack-item-navigation';
import { DeletePackItemModal } from '../delete-pack-item-modal/delete-pack-item-modal';

type DashboardPackItemRowProps = {
	item: PackItem;
	isPackOwner?: boolean;
	availablePacks?: PackListItem[];
};

export const DashboardPackItemRow = ({
	item,
	isPackOwner = false,
	availablePacks = [],
}: DashboardPackItemRowProps) => {
	const { navigateToEdit } = usePackItemNavigation();
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
				isPackOwner={isPackOwner}
				onEdit={handleEdit}
				onDelete={handleDelete}
				availablePacks={availablePacks}
			/>
			
			<DeletePackItemModal
				item={item}
				isOpen={showDeleteModal}
				onCancel={() => setShowDeleteModal(false)}
			/>
		</>
	);
};