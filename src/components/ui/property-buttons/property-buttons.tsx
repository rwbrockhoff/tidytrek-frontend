import { Flex, IconButton, Tooltip } from '@radix-ui/themes';
import { cn } from '@/styles/utils';
import { type PackItemProperty } from '@/types/pack-types';
import { FavoriteIcon, WornIcon, ConsumableIcon } from '@/components/ui';
import styles from './property-buttons.module.css';

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
	showAlways?: boolean; // forms vs table cells
	onClick: (property: PackItemProperty) => void;
	className?: string;
	ariaLabelledBy?: string;
};

export const PropertyButtons = ({
	wornWeight,
	consumable,
	favorite,
	isDisabled = false,
	showAlways = false,
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
			aria-labelledby={ariaLabelledBy}
		>
			<IconButton variant="ghost" size="2">
				<FavoriteIcon
					name="favorite"
					aria-label={`Toggle favorite ${favorite ? 'off' : 'on'}`}
					className={cn(
						favorite && styles.favoriteActive,
						isDisabled && styles.disabledIcon,
					)}
					style={{ opacity: showAlways || favorite ? 100 : 0 }}
					onClick={(e) => handleOnClick({ favorite: !favorite }, e)}
				/>
			</IconButton>

			<Tooltip content="Consumable items like food or fuel.">
				<IconButton variant="ghost" size="2">
					<ConsumableIcon
						name="food"
						aria-label={`Toggle consumables ${consumable ? 'off' : 'on'}`}
						className={cn(
							consumable && styles.consumableActive,
							isDisabled && styles.disabledIcon,
						)}
						style={{ opacity: showAlways || consumable ? 100 : 0 }}
						onClick={(e) => handleOnClick({ consumable: !consumable }, e)}
					/>
				</IconButton>
			</Tooltip>

			<Tooltip content="Worn weight like shorts or trail runners.">
				<IconButton variant="ghost" size="2">
					<WornIcon
						name="wornWeight"
						aria-label={`Toggle worn weight ${wornWeight ? 'off' : 'on'}`}
						className={cn(
							wornWeight && styles.wornWeightActive,
							isDisabled && styles.disabledIcon,
						)}
						style={{ opacity: showAlways || wornWeight ? 100 : 0 }}
						onClick={(e) => handleOnClick({ wornWeight: !wornWeight }, e)}
					/>
				</IconButton>
			</Tooltip>
		</Flex>
	);
};
