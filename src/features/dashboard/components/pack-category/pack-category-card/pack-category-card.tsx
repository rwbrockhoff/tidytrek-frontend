import { type PackListItem, type Category, type PackItem } from '@/types/pack-types';
import styles from './pack-category-card.module.css';
import { cn } from '@/styles/utils';
import { Card, Button } from '@/components/alpine';
import { useUserContext } from '@/hooks/auth/use-user-context';
import {
	useEditPackCategoryMutation,
	useAddNewPackItemMutation,
	useMoveItemToClosetMutation,
	useEditPackItemMutation,
	useDeletePackItemMutation,
} from '@/queries/pack-queries';
import { normalizeURL } from '@/utils/link-utils';
import { type BaseTableRowItem, isPackItem } from '@/types/pack-types';
import { usePackCategory } from '@/features/dashboard/hooks/use-pack-category';
import { PackItemRow } from '../../pack-item-row/pack-item-row';
import { PlusIcon, MinusIcon } from '@/components/icons';
import { ThemeButton } from '@/components/table/table-buttons';

type PackCategoryCardProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

export const PackCategoryCard = ({ category }: PackCategoryCardProps) => {
	const userView = useUserContext();
	const { mutate: editPackCategory } = useEditPackCategoryMutation();

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

	const { mutate: addPackItem } = useAddNewPackItemMutation();
	const { mutate: moveItemToCloset } = useMoveItemToClosetMutation();
	const { mutate: editPackItem } = useEditPackItemMutation();
	const { mutate: deletePackItem } = useDeletePackItemMutation();

	const handleChangeColor = (packCategoryColor: string) =>
		editPackCategory({ packCategoryColor, packCategoryId });

	const handleAddItem = () => {
		addPackItem({ packId, packCategoryId });
	};

	const handleEditPackItem = (packItem: BaseTableRowItem) => {
		const { packItemId, packItemUrl } = packItem;
		const cleanUrl = normalizeURL(packItemUrl);

		if (isPackItem(packItem)) {
			editPackItem({
				packItemId,
				packItem: { ...packItem, packItemUrl: cleanUrl },
			});
		}
	};

	const handleMoveItemToCloset = (packItemId: number) => {
		moveItemToCloset(packItemId);
	};

	const handleDeleteItem = (packItemId: number) => {
		deletePackItem(packItemId);
	};

	// Use pack category color
	const bgColorCategory = {
		backgroundColor: packCategoryColor ? `var(--${packCategoryColor})` : 'inherit',
	};

	const showCategoryItems = !isMinimized;

	return (
		<Card.Root
			variant="surface"
			rounded="md"
			shadow="paper"
			override
			className={cn(styles.categoryCard, isMinimized && styles.minimized)}
			data-testid="pack-category-card">
			<Card.Header className={cn('aow', styles.categoryHeader)}>
				<div className={styles.categoryHeaderContent}>
					<ThemeButton
						paletteColor={packCategoryColor}
						disabled={!userView}
						onClick={handleChangeColor}
					/>

					<h3 className={styles.categoryName}>{packCategoryName}</h3>
					<Button
						onClick={handleMinimizeCategory}
						variant="ghost"
						data-testid="minimize-category-button"
						aria-label={isMinimized ? 'Expand category' : 'Minimize category'}
						iconLeft={isMinimized ? <PlusIcon size={20} /> : <MinusIcon size={20} />}
					/>
				</div>
				{showCategoryItems && (
					<div className={styles.categoryTotals} style={bgColorCategory}>
						<span className={styles.totalItem}>
							{itemQuantity} {itemQuantity === 1 ? 'item' : 'items'}
						</span>

						<span className={styles.totalWeight}>{`${convertedCategoryWeight} lbs`}</span>
						<span className={styles.totalPrice}>{formattedTotalPrice}</span>
					</div>
				)}
			</Card.Header>

			{showCategoryItems && (
				<Card.Body className={styles.itemsContainer}>
					{packItems.map((item: PackItem, index) => (
						<PackItemRow
							key={item.packItemId || index}
							item={item}
							userView={userView}
							onEdit={handleEditPackItem}
							onMoveToCloset={handleMoveItemToCloset}
							onDelete={handleDeleteItem}
						/>
					))}
				</Card.Body>
			)}
			{!isMinimized && userView && (
				<Card.Footer className={cn('aow', styles.categoryFooter)}>
					<Button
						variant="outline"
						size="sm"
						onClick={handleAddItem}
						aria-label="Add new item to list"
						iconLeft={<PlusIcon />}>
						Add Item
					</Button>
				</Card.Footer>
			)}
		</Card.Root>
	);
};
