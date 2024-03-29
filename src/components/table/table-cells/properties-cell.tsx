import styled from 'styled-components';
import { Flex, IconButton, Table, Tooltip } from '@radix-ui/themes';
import { FavoriteIcon, WornIcon, ConsumableIcon } from '@/components/ui';
import { type PackButtonSwitches } from '@/types/pack-types';
import { useUserContext } from '@/hooks/use-viewer-context';
import { useContext } from 'react';
import { TableRowContext } from '../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type ButtonProps = {
	display: boolean;
	onClick: (property: PackButtonSwitches) => void;
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
		<PropertiesButtonCell align="center" justify="center" ref={ref} style={{ width }}>
			<StyledFlex>
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
			</StyledFlex>
		</PropertiesButtonCell>
	);
};

const PropertiesButtonCell = styled(Table.Cell)`
	svg {
		padding: 5px;
		${({ theme: t }) => t.mx.wh('15px')}
		cursor: pointer;
		color: rgba(0, 0, 0, 0.5);
		&:hover {
			filter: brightness(80%);
		}
	}
	.favorite-active {
		color: var(--amber-9);
	}
	.worn-weight-active {
		color: var(--cyan-9);
	}
	.consumable-active {
		color: var(--indigo-9);
	}
`;

const StyledFlex = styled(Flex)`
	justify-content: space-evenly;
	button {
		background: transparent;
	}
`;
