import { Table, Popup, Icon } from 'semantic-ui-react';
import { type PackButtonSwitches } from '../../../../types/packTypes';
import './PropertyButton.css';
import { useUserContext } from '../../../../views/Dashboard/hooks/useUserContext';

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
		<Table.Cell className="property-table-button" textAlign="center" colSpan={size}>
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
		</Table.Cell>
	);
};

export default PropertyButtons;
