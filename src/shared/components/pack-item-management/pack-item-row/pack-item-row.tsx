import { useState } from 'react';
import { Badge } from '@radix-ui/themes';
import { type BaseTableRowItem, type PackListItem } from '@/types/pack-types';
import { PackItemDisplay } from './pack-item-display';
import { PackItemActions } from './pack-item-actions';
import { MoveItemModal } from '../move-item-modal';
import { Stack } from '@/components/layout';
import styles from './pack-item-row.module.css';

type PackItemRowProps = {
	item: BaseTableRowItem;
	canEdit?: boolean;
	onEdit?: () => void;
	onDelete?: () => void;
	availablePacks?: PackListItem[];
	className?: string;
};

export const PackItemRow = ({
	item,
	canEdit = false,
	onEdit,
	onDelete,
	availablePacks = [],
	className,
}: PackItemRowProps) => {
	const [showMoveDropdown, setShowMoveDropdown] = useState(false);

	const handleToggleMove = () => {
		setShowMoveDropdown(!showMoveDropdown);
	};

	return (
		<div className={`${styles.itemCard} ${className || ''}`}>
			<Stack className="gap-4">
				<PackItemDisplay item={item} />
				<div className={styles.itemPropertiesRow}>
					<div className={styles.itemProperties}>
						<Badge color="gray" size="1">
							{item.packItemWeight} {item.packItemWeightUnit}
						</Badge>
						{item.packItemQuantity > 1 && (
							<span className={styles.property}>x{item.packItemQuantity}</span>
						)}
					</div>
					{canEdit && (
						<PackItemActions
							onEdit={onEdit}
							onMove={availablePacks.length > 0 ? handleToggleMove : undefined}
							onDelete={onDelete}
							showMoveButton={availablePacks.length > 0}
						/>
					)}
				</div>
			</Stack>
			
			{canEdit && availablePacks.length > 0 && (
				<MoveItemModal 
					packItem={item} 
					availablePacks={availablePacks}
					open={showMoveDropdown}
					onOpenChange={setShowMoveDropdown}
				/>
			)}
		</div>
	);
};