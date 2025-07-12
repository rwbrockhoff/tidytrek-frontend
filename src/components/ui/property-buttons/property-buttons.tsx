import { Flex, Tooltip } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { cn } from '@/styles/utils';
import { type PackItemProperty } from '@/types/pack-types';
import { FavoriteIcon, WornIcon, ConsumableIcon } from '@/components/icons';
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
			aria-labelledby={ariaLabelledBy}>
			<Button
				variant="ghost"
				size="sm"
				onClick={(e) => handleOnClick({ favorite: !favorite }, e)}
				aria-label={`Toggle favorite ${favorite ? 'off' : 'on'}`}
				iconLeft={
					<FavoriteIcon
						name="favorite"
						className={cn(
							favorite && styles.favoriteActive,
							isDisabled && styles.disabledIcon,
						)}
						style={{ opacity: showAlways || favorite ? 1 : 0 }}
					/>
				}
			/>

			<Tooltip content="Consumable items like food or fuel.">
				<Button
					variant="ghost"
					size="sm"
					onClick={(e) => handleOnClick({ consumable: !consumable }, e)}
					aria-label={`Toggle consumables ${consumable ? 'off' : 'on'}`}
					iconLeft={
						<ConsumableIcon
							name="food"
							className={cn(
								consumable && styles.consumableActive,
								isDisabled && styles.disabledIcon,
							)}
							style={{ opacity: showAlways || consumable ? 1 : 0 }}
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
					iconLeft={
						<WornIcon
							name="wornWeight"
							className={cn(
								wornWeight && styles.wornWeightActive,
								isDisabled && styles.disabledIcon,
							)}
							style={{ opacity: showAlways || wornWeight ? 1 : 0 }}
						/>
					}
				/>
			</Tooltip>
		</Flex>
	);
};
