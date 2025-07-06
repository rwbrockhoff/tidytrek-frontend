import { type PackListItem, type Category, type PackItem } from '@/types/pack-types';
import { useState, useCallback, useMemo } from 'react';
import styles from './pack-category-card.module.css';
import { cn } from '@/styles/utils';
import { Card } from '@/components/ui/alpine';
import { useUserContext } from '@/hooks/use-viewer-context';
import { usePackItemActions } from '../hooks/use-pack-item-actions';
import { usePackCategoryActions } from '../hooks/use-pack-category-actions';
import { convertCurrency, convertWeight, convertQuantity } from '@/utils';
import {
	EditPencilIcon,
	ShareIcon,
	TrashIcon,
	PlusIcon,
	MinusIcon,
} from '@/components/ui/icons';
import { DeleteItemModal } from '@/components/ui/Modals';
import { isPackItem } from '@/types/pack-types';
import { ThemeButton } from '@/components/table/table-buttons';
import { Button, Badge } from '@radix-ui/themes';

type PackCategoryCardProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

export const PackCategoryCard = ({ category }: PackCategoryCardProps) => {
	const userView = useUserContext();

	const { addPackItem, moveItemToCloset, editPackItem, deletePackItem } =
		usePackItemActions();

	const { editPackCategory } = usePackCategoryActions();

	const { packCategoryName, packCategoryColor, packCategoryId, packId, packItems } =
		category;

	const [isMinimized, setMinimized] = useState(false);

	const handleAddItem = useCallback(
		() => addPackItem({ packId, packCategoryId }),
		[addPackItem, packId, packCategoryId],
	);

	const handleMinimizeCategory = useCallback(
		() => setMinimized(!isMinimized),
		[isMinimized],
	);

	const handleChangeColor = useCallback(
		(packCategoryColor: string) =>
			editPackCategory({ packCategoryColor, packCategoryId }),
		[editPackCategory, packCategoryId],
	);

	const { totalWeight: convertedCategoryWeight, totalPrice } = useMemo(
		() => convertWeight(packItems, 'lb'),
		[packItems],
	);

	const formattedTotalPrice = useMemo(
		() => convertCurrency(totalPrice, 'USD'),
		[totalPrice],
	);

	const itemQuantity = useMemo(
		() => (packItems[0] ? convertQuantity(packItems) : 0),
		[packItems],
	);

	const showCategoryItems = packItems[0] && !isMinimized;

	// Hide empty categories on guest view
	if (!userView && !showCategoryItems) return null;

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
					{userView ? (
						<ThemeButton color={packCategoryColor} onClick={handleChangeColor} />
					) : (
						<div
							className={styles.categoryColor}
							style={{ backgroundColor: packCategoryColor }}
						/>
					)}
					<h3 className={styles.categoryName}>{packCategoryName}</h3>
					<Button
						onClick={handleMinimizeCategory}
						variant="ghost"
						data-testid="minimize-category-button"
						aria-label={isMinimized ? 'Expand category' : 'Minimize category'}>
						{isMinimized ? <PlusIcon /> : <MinusIcon />}
					</Button>
				</div>

				{showCategoryItems && (
					<div
						className={styles.categoryTotals}
						style={{
							backgroundColor: packCategoryColor
								? `var(--${packCategoryColor})`
								: 'inherit',
						}}>
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
						<div key={item.packItemId || index} className={styles.itemCard}>
							<div className={styles.itemHeader}>
								<h4 className={styles.itemName}>{item.packItemName || 'Name'}</h4>
								{item.packItemPrice && (
									<span className={styles.itemPrice}>
										{convertCurrency(item.packItemPrice, 'USD')}
									</span>
								)}
							</div>

							<div className={styles.itemDetails}>
								{item.packItemDescription && (
									<p className={styles.itemDescription}>{item.packItemDescription}</p>
								)}

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
										<div className={styles.itemActions}>
											<Button
												variant="ghost"
												color="gray"
												onClick={() => editPackItem(item)}
												aria-label="Edit item">
												<EditPencilIcon />
											</Button>

											<DeleteItemModal
												id={item.packItemId}
												hasPackId={isPackItem(item)}
												onClickMove={() => moveItemToCloset(item.packItemId)}
												onClickDelete={() => deletePackItem(item.packItemId)}>
												<Button variant="ghost" color="gray" aria-label="Move to closet">
													<ShareIcon />
												</Button>
											</DeleteItemModal>

											<DeleteItemModal
												id={item.packItemId}
												hasPackId={isPackItem(item)}
												onClickMove={() => moveItemToCloset(item.packItemId)}
												onClickDelete={() => deletePackItem(item.packItemId)}>
												<Button variant="ghost" color="gray" aria-label="Delete item">
													<TrashIcon />
												</Button>
											</DeleteItemModal>
										</div>
									)}
								</div>

								{item.packItemUrl && (
									<a
										href={item.packItemUrl}
										className={styles.itemLink}
										target="_blank"
										rel="noopener noreferrer">
										View Product
									</a>
								)}
							</div>
						</div>
					))}
				</Card.Body>
			)}

			{!isMinimized && userView && (
				<Card.Footer className={cn('aow', styles.categoryFooter)}>
					<Button
						variant="outline"
						color="gray"
						size="1"
						onClick={handleAddItem}
						aria-label="Add new item to list">
						<PlusIcon />
						Add Item
					</Button>
				</Card.Footer>
			)}
		</Card.Root>
	);
};
