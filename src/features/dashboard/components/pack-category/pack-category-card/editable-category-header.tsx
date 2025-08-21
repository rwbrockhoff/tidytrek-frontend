import { useState } from 'react';
import { Card, Button, TextField } from '@/components/alpine';
import { ThemeButton } from '../../table';
import { PlusIcon, MinusIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from './pack-category-card.module.css';
import { useEditPackCategoryMutation } from '@/queries/pack-queries';
import { type InputEvent } from '@/types/form-types';
import { usePackContext } from '../../../hooks/use-pack-context';

type EditableCategoryHeaderProps = {
	packCategoryName: string;
	packCategoryColor: string;
	packCategoryId: number;
	isMinimized: boolean;
	canEdit: boolean;
	itemQuantity: number;
	convertedCategoryWeight: number;
	formattedTotalPrice: string | number;
	onChangeColor: (color: string) => void;
	onMinimizeCategory: () => void;
};

export const EditableCategoryHeader = ({
	packCategoryName: initialName,
	packCategoryColor,
	packCategoryId,
	isMinimized,
	canEdit,
	itemQuantity,
	convertedCategoryWeight,
	formattedTotalPrice,
	onChangeColor,
	onMinimizeCategory,
}: EditableCategoryHeaderProps) => {
	const { weightUnit } = usePackContext();
	const { mutate: editPackCategory } = useEditPackCategoryMutation();
	
	const [packCategoryName, setPackCategoryName] = useState(initialName);

	const bgColorCategory = {
		backgroundColor: packCategoryColor ? `var(--${packCategoryColor})` : 'inherit',
	};

	const showCategoryItems = !isMinimized;

	const handleBlur = () => {
		if (initialName !== packCategoryName) {
			editPackCategory({ packCategoryName, packCategoryId });
		}
	};

	const handleChangeColor = (newColor: string) => {
		editPackCategory({ packCategoryColor: newColor, packCategoryId });
		onChangeColor(newColor);
	};

	const handleInput = (e: InputEvent) => setPackCategoryName(e.target.value);

	return (
		<Card.Header className={cn('aow', styles.categoryHeader)}>
			<div className={styles.categoryHeaderContent}>
				<ThemeButton
					paletteColor={packCategoryColor}
					disabled={!canEdit}
					onClick={handleChangeColor}
				/>

				{canEdit ? (
					<TextField.Standalone
						className={styles.categoryName}
						value={packCategoryName}
						name="packCategoryName"
						placeholder="Category"
						variant="minimal"
						onChange={handleInput}
						onBlur={handleBlur}
					/>
				) : (
					<span className={styles.categoryName}>
						{packCategoryName || 'Category'}
					</span>
				)}
				
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

					<span
						className={
							styles.totalWeight
						}>{`${convertedCategoryWeight} ${weightUnit.base}`}</span>
					<span className={styles.totalPrice}>{formattedTotalPrice}</span>
				</div>
			)}
		</Card.Header>
	);
};