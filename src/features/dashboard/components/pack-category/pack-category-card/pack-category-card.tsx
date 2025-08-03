import { type PackListItem, type Category } from '@/types/pack-types';
import styles from './pack-category-card.module.css';
import { cn } from '@/styles/utils';
import { Card } from '@/components/alpine';
import { usePackOwner } from '@/hooks/auth/use-pack-owner';
import { usePackCategory } from '@/features/dashboard/hooks/use-pack-category';
import { usePackCategoryActions } from '@/features/dashboard/hooks/use-pack-category-actions';
import { EditableCategoryHeader } from './editable-category-header';
import { PackCategoryItems } from './pack-category-items';

type PackCategoryCardProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

export const PackCategoryCard = ({ category }: PackCategoryCardProps) => {
	const { isPackOwner } = usePackOwner();

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
	} = usePackCategoryActions({ packCategoryId, packId });

	return (
		<Card.Root
			variant="surface"
			rounded="md"
			shadow="paper"
			override
			className={cn(isMinimized && styles.minimized, 'w-full')}
			data-testid="pack-category-card">
			<EditableCategoryHeader
				packCategoryName={packCategoryName}
				packCategoryColor={packCategoryColor}
				packCategoryId={packCategoryId}
				isMinimized={isMinimized}
				isPackOwner={isPackOwner}
				itemQuantity={itemQuantity}
				convertedCategoryWeight={convertedCategoryWeight}
				formattedTotalPrice={formattedTotalPrice}
				onChangeColor={handleChangeColor}
				onMinimizeCategory={handleMinimizeCategory}
			/>
			<PackCategoryItems
				packItems={packItems}
				isPackOwner={isPackOwner}
				isMinimized={isMinimized}
				onAddItem={handleAddItem}
			/>
		</Card.Root>
	);
};
