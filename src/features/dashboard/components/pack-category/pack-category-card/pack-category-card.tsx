import { type PackListItem, type Category } from '@/types/pack-types';
import styles from './pack-category-card.module.css';
import { cn } from '@/styles/utils';
import { Card } from '@/components/alpine';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { usePackCategory } from '@/features/dashboard/hooks/use-pack-category';
import { usePackCategoryActions } from '@/features/dashboard/hooks/use-pack-category-actions';
import { PackCategoryHeader } from './pack-category-header';
import { PackCategoryItems } from './pack-category-items';

type PackCategoryCardProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

export const PackCategoryCard = ({ category }: PackCategoryCardProps) => {
	const userView = useUserContext();

	const {
		packCategoryName,
		packCategoryColor,
		packCategoryId,
		packId,
		packItems,
		isMinimized,
		handleMinimizeCategory,
		convertedCategoryWeight,
		formattedTotalPrice,
		itemQuantity,
	} = usePackCategory(category);

	const {
		handleChangeColor,
		handleAddItem,
		handleEditPackItem,
		handleMoveItemToCloset,
		handleDeleteItem,
	} = usePackCategoryActions({ packCategoryId, packId });

	return (
		<Card.Root
			variant="surface"
			rounded="md"
			shadow="paper"
			override
			className={cn(styles.categoryCard, isMinimized && styles.minimized)}
			data-testid="pack-category-card">
			<PackCategoryHeader
				packCategoryName={packCategoryName}
				packCategoryColor={packCategoryColor}
				isMinimized={isMinimized}
				userView={userView}
				itemQuantity={itemQuantity}
				convertedCategoryWeight={convertedCategoryWeight}
				formattedTotalPrice={formattedTotalPrice}
				onChangeColor={handleChangeColor}
				onMinimizeCategory={handleMinimizeCategory}
			/>
			<PackCategoryItems
				packItems={packItems}
				userView={userView}
				isMinimized={isMinimized}
				onEdit={handleEditPackItem}
				onMoveToCloset={handleMoveItemToCloset}
				onDelete={handleDeleteItem}
				onAddItem={handleAddItem}
			/>
		</Card.Root>
	);
};
