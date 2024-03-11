import { Table, Popup, Icon } from 'semantic-ui-react';
import { type PackButtonSwitches } from '../../../../types/packTypes';
import { useUserContext } from '../../hooks/useViewerContext';
import styled from 'styled-components';

type ButtonProps = {
	size: number;
	wornWeight: boolean;
	consumable: boolean;
	favorite: boolean;
	display: boolean;
	onClick: (property: PackButtonSwitches) => void;
};

type ButtonTypes = {
	wornWeight?: boolean;
	consumable?: boolean;
	favorite?: boolean;
};

const PropertyButtons = (props: ButtonProps) => {
	const userView = useUserContext();
	const { size, wornWeight, consumable, favorite, display, onClick } = props;

	const handleOnClick = (buttonToChange: ButtonTypes) => {
		if (userView) onClick(buttonToChange);
	};

	const showOnHover = display && userView;

	return (
		<PropertyButtonsCell textAlign="center" colSpan={size}>
			<Icon
				name="favorite"
				color={favorite ? 'yellow' : 'grey'}
				style={{ opacity: showOnHover || favorite ? 100 : 0 }}
				onClick={() => handleOnClick({ favorite: !favorite })}
			/>

			<Popup
				content="Consumable items like food or fuel."
				mouseEnterDelay={700}
				on="hover"
				trigger={
					<Icon
						name="food"
						color={consumable ? 'olive' : 'grey'}
						style={{ opacity: showOnHover || consumable ? 100 : 0 }}
						onClick={() => handleOnClick({ consumable: !consumable })}
					/>
				}
			/>

			<Popup
				content="Worn weight like shorts or trail runners."
				mouseEnterDelay={700}
				on="hover"
				trigger={
					<i
						className={`fa-solid fa-shirt ${wornWeight && 'worn-weight-item'}`}
						style={{ opacity: showOnHover || wornWeight ? 100 : 0 }}
						onClick={() => handleOnClick({ wornWeight: !wornWeight })}
					/>
				}
			/>

			{/* <Popup
				content="Make item for sale"
				mouseEnterDelay={700}
				on="hover"
				trigger={
					<Icon
						name="money"
						color={consumable ? 'olive' : 'grey'}
						style={{ opacity: showOnHover || consumable ? 100 : 0 }}
						onClick={() => handleOnClick({ consumable: !consumable })}
					/>
				}
			/> */}
		</PropertyButtonsCell>
	);
};

export default PropertyButtons;

const PropertyButtonsCell = styled(Table.Cell)`
	&&& {
		i {
			margin: 0px 10px;
			padding: 5px;
			cursor: pointer;
			color: rgba(0, 0, 0, 0.5);
			&:hover {
				color: rgba(0, 0, 0, 0.7);
			}
		}
		.fa-solid.fa-shirt.worn-weight-item {
			${({ theme }) => theme.mx.themeColor('tidyBlue')}
		}
	}
`;
