import { useState } from 'react';
import { type PackItem, type PackListItem } from '@/types/pack-types';
import { PackItemRow } from '@/shared/components/pack-item-management/pack-item-row';
import { usePackItemOperations } from '../../hooks/use-pack-item-operations';
import { DeletePackItemModal } from '../delete-pack-item-modal/delete-pack-item-modal';

type DashboardPackItemRowProps = {
	item: PackItem;
	userView?: boolean;
	availablePacks?: PackListItem[];
};

export const DashboardPackItemRow = ({
	item,
	userView = false,
	availablePacks = [],
}: DashboardPackItemRowProps) => {
	const { navigateToEdit } = usePackItemOperations();
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
			
			<DeletePackItemModal
				item={item}
				isOpen={showDeleteModal}
				onCancel={() => setShowDeleteModal(false)}
			/>
		</>
	);
};