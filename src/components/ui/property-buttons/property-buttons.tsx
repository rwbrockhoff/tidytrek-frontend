import { Tooltip } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { cn } from '@/styles/utils';
import { type PackItemProperty } from '@/types/pack-types';
import { FavoriteIcon, WornIcon, ConsumableIcon } from '@/components/icons';
import styles from './property-buttons.module.css';
import hoverStyles from '@/shared/components/pack-item-management/table/hover-styles.module.css';

type ButtonTypes = {
	wornWeight?: boolean;
	consumable?: boolean;
	favorite?: boolean;
};

type PropertyButtonsProps = {
	wornWeight: boolean;
	consumable: boolean;
	favorite: boolean;
	isDisabled?: boolean;
	onClick: (property: PackItemProperty) => void;
	className?: string;
	ariaLabelledBy?: string;
};

export const PropertyButtons = ({
	wornWeight,
	consumable,
	favorite,
	isDisabled = false,
	onClick,
	className,
	ariaLabelledBy,
}: PropertyButtonsProps) => {
	const handleOnClick = (buttonToChange: ButtonTypes, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isDisabled) onClick(buttonToChange);
	};

	return (
		<Flex
			className={cn(styles.flexContainer, className)}
			role="group"
			aria-labelledby={ariaLabelledBy}>
			<Button
				variant="ghost"
				size="sm"
				onClick={(e) => handleOnClick({ favorite: !favorite }, e)}
				aria-label={`Toggle favorite ${favorite ? 'off' : 'on'}`}
				className={cn(favorite ? '' : hoverStyles.showOnHover)}
				iconLeft={
					<FavoriteIcon
						name="favorite"
						className={cn(
							favorite && styles.favoriteActive,
							isDisabled && styles.disabledIcon,
						)}
					/>
				}
			/>

			<Tooltip content="Consumable items like food or fuel.">
				<Button
					variant="ghost"
					size="sm"
					onClick={(e) => handleOnClick({ consumable: !consumable }, e)}
					aria-label={`Toggle consumables ${consumable ? 'off' : 'on'}`}
					className={cn(consumable ? '' : hoverStyles.showOnHover)}
					iconLeft={
						<ConsumableIcon
							name="food"
							className={cn(
								consumable && styles.consumableActive,
								isDisabled && styles.disabledIcon,
							)}
						/>
					}
				/>
			</Tooltip>

			<Tooltip content="Worn weight like shorts or trail runners.">
				<Button
					variant="ghost"
					size="sm"
					onClick={(e) => handleOnClick({ wornWeight: !wornWeight }, e)}
					aria-label={`Toggle worn weight ${wornWeight ? 'off' : 'on'}`}
					className={cn(wornWeight ? '' : hoverStyles.showOnHover)}
					iconLeft={
						<WornIcon
							name="wornWeight"
							className={cn(
								wornWeight && styles.wornWeightActive,
								isDisabled && styles.disabledIcon,
							)}
						/>
					}
				/>
			</Tooltip>
		</Flex>
	);
};
