import styles from './properties-cell.module.css';
import { type PackItemProperty } from '@/types/pack-types';
import { Flex, IconButton, Table, Tooltip } from '@radix-ui/themes';
import { FavoriteIcon, WornIcon, ConsumableIcon } from '@/components/ui';
import { useUserContext } from '@/hooks/use-viewer-context';
import { useContext } from 'react';
import { TableRowContext } from '../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type ButtonProps = {
	display: boolean;
	onClick: (property: PackItemProperty) => void;
};

type ButtonTypes = {
	wornWeight?: boolean;
	consumable?: boolean;
	favorite?: boolean;
};

export const PropertiesCell = (props: ButtonProps) => {
	const { display, onClick } = props;

	const userView = useUserContext();
	const { packItem, isDragging } = useContext(TableRowContext);
	const { wornWeight, consumable, favorite } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const handleOnClick = (buttonToChange: ButtonTypes) => {
		if (userView) onClick(buttonToChange);
	};

	const showOnHover = (display && userView) || isDragging;

	return (
		<Table.Cell className={styles.propertiesCell} align="center" justify="center" ref={ref} style={{ width }}>
			<Flex className={styles.flexContainer}>
				<IconButton variant="ghost" size="2">
					<FavoriteIcon
						name="favorite"
						className={`favorite${favorite ? '-active' : ''}`}
						style={{ opacity: showOnHover || favorite ? 100 : 0 }}
						onClick={() => handleOnClick({ favorite: !favorite })}
					/>
				</IconButton>

				<Tooltip content="Consumable items like food or fuel.">
					<IconButton variant="ghost" size="2">
						<ConsumableIcon
							name="food"
							className={`consumable${consumable ? '-active' : ''}`}
							style={{ opacity: showOnHover || consumable ? 100 : 0 }}
							onClick={() => handleOnClick({ consumable: !consumable })}
						/>
					</IconButton>
				</Tooltip>
				<Tooltip content="Worn weight like shorts or trail runners.">
					<IconButton variant="ghost" size="2">
						<WornIcon
							name="wornWeight"
							className={`worn-weight${wornWeight ? '-active' : ''}`}
							style={{ opacity: showOnHover || wornWeight ? 100 : 0 }}
							onClick={() => handleOnClick({ wornWeight: !wornWeight })}
						/>
					</IconButton>
				</Tooltip>
			</Flex>
		</Table.Cell>
	);
};

