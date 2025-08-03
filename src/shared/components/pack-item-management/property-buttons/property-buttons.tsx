import { Tooltip } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { cn } from '@/styles/utils';
import { type PackItemProperty } from '@/types/pack-types';
import { FavoriteIcon, WornIcon, ConsumableIcon } from '@/components/icons';
import styles from './property-buttons.module.css';
import hoverStyles from '../table/hover-styles.module.css';

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
	disableHoverBehavior?: boolean;
	disableInternalLayout?: boolean;
	size?: 'sm' | 'md';
};

export const PropertyButtons = ({
	wornWeight,
	consumable,
	favorite,
	isDisabled = false,
	onClick,
	className,
	ariaLabelledBy,
	disableHoverBehavior = false,
	disableInternalLayout = false,
	size = 'sm',
}: PropertyButtonsProps) => {
	const handleOnClick = (buttonToChange: ButtonTypes, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isDisabled) onClick(buttonToChange);
	};

	const buttonElements = (
		<>
			<Button
				variant="ghost"
				size={size}
				override={true}
				onClick={(e) => handleOnClick({ favorite: !favorite }, e)}
				aria-label={`Toggle favorite ${favorite ? 'off' : 'on'}`}
				className={cn(
					favorite ? '' : !isDisabled && !disableHoverBehavior ? hoverStyles.showOnHover : '',
					isDisabled && !favorite && 'invisible'
				)}
				iconLeft={
					<FavoriteIcon
						name="favorite"
						className={cn(
							'lucide',
							favorite && styles.favoriteActive,
							isDisabled && styles.disabledIcon,
						)}
					/>
				}
			/>

			<Tooltip content="Consumable items like food or fuel.">
				<Button
					variant="ghost"
					size={size}
					override={true}
					onClick={(e) => handleOnClick({ consumable: !consumable }, e)}
					aria-label={`Toggle consumables ${consumable ? 'off' : 'on'}`}
					className={cn(
						consumable ? '' : !isDisabled && !disableHoverBehavior ? hoverStyles.showOnHover : '',
						isDisabled && !consumable && 'invisible'
					)}
					iconLeft={
						<ConsumableIcon
							name="food"
							className={cn(
								'lucide',
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
					size={size}
					override={true}
					onClick={(e) => handleOnClick({ wornWeight: !wornWeight }, e)}
					aria-label={`Toggle worn weight ${wornWeight ? 'off' : 'on'}`}
					className={cn(
						wornWeight ? '' : !isDisabled && !disableHoverBehavior ? hoverStyles.showOnHover : '',
						isDisabled && !wornWeight && 'invisible'
					)}
					iconLeft={
						<WornIcon
							name="wornWeight"
							className={cn(
								'lucide',
								wornWeight && styles.wornWeightActive,
								isDisabled && styles.disabledIcon,
							)}
						/>
					}
				/>
			</Tooltip>
		</>
	);

	if (disableInternalLayout) {
		return (
			<div role="group" aria-labelledby={ariaLabelledBy} className={cn(styles.propertyButtonsContainer, className)}>
				{buttonElements}
			</div>
		);
	}

	return (
		<Flex
			className={cn(styles.flexContainer, className)}
			role="group"
			aria-labelledby={ariaLabelledBy}>
			{buttonElements}
		</Flex>
	);
};
