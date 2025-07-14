import { useState } from 'react';
import { Badge } from '@radix-ui/themes';
import { type BaseTableRowItem, type PackListItem } from '@/types/pack-types';
import { PackItemDisplay } from './pack-item-display';
import { PackItemActions } from './pack-item-actions';
import { MoveItemDropdown } from '../move-item-dropdown';
import styles from './pack-item-row.module.css';

type PackItemRowProps = {
	item: BaseTableRowItem;
	userView?: boolean;
	onEdit?: () => void;
	onDelete?: () => void;
	availablePacks?: PackListItem[];
	className?: string;
};

export const PackItemRow = ({
	item,
	userView = false,
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
			<PackItemDisplay item={item} />
			<div className={styles.itemPropertiesRow}>
				<div className={styles.itemProperties}>
					<Badge color="gray" size="1">
						{item.packItemWeight} {item.packItemUnit}
					</Badge>
					{item.packItemQuantity > 1 && (
						<span className={styles.property}>x{item.packItemQuantity}</span>
					)}
				</div>
				{userView && (
					<PackItemActions
						onEdit={onEdit}
						onMove={availablePacks.length > 0 ? handleToggleMove : undefined}
						onDelete={onDelete}
						showMoveButton={availablePacks.length > 0}
					/>
				)}
			</div>
			
			{showMoveDropdown && userView && availablePacks.length > 0 && (
				<div className={styles.moveDropdownContainer}>
					<MoveItemDropdown 
						packItem={item} 
						availablePacks={availablePacks} 
					/>
				</div>
			)}
		</div>
	);
};