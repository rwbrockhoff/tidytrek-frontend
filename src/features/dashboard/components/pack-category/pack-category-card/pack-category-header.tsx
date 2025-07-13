import { Card, Button } from '@/components/alpine';
import { ThemeButton } from '@/components/table/table-buttons';
import { PlusIcon, MinusIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from './pack-category-card.module.css';

type PackCategoryHeaderProps = {
	packCategoryName: string;
	packCategoryColor: string;
	isMinimized: boolean;
	userView: boolean;
	itemQuantity: number;
	convertedCategoryWeight: string;
	formattedTotalPrice: string;
	onChangeColor: (color: string) => void;
	onMinimizeCategory: () => void;
};

export const PackCategoryHeader = ({
	packCategoryName,
	packCategoryColor,
	isMinimized,
	userView,
	itemQuantity,
	convertedCategoryWeight,
	formattedTotalPrice,
	onChangeColor,
	onMinimizeCategory,
}: PackCategoryHeaderProps) => {
	const bgColorCategory = {
		backgroundColor: packCategoryColor ? `var(--${packCategoryColor})` : 'inherit',
	};

	const showCategoryItems = !isMinimized;

	return (
		<Card.Header className={cn('aow', styles.categoryHeader)}>
			<div className={styles.categoryHeaderContent}>
				<ThemeButton
					paletteColor={packCategoryColor}
					disabled={!userView}
					onClick={onChangeColor}
				/>

				<h3 className={styles.categoryName}>{packCategoryName}</h3>
				<Button
					onClick={onMinimizeCategory}
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
	);
};