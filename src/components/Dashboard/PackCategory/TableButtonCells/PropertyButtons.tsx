import { Table, Popup, Icon } from 'semantic-ui-react';
import { type PackButtonSwitches } from '../../../../redux/packs/packTypes';
import './PropertyButton.css';

type ButtonProps = {
	size: number;
	wornWeight: boolean;
	consumable: boolean;
	favorite: boolean;
	display: boolean;
	onClick: (property: PackButtonSwitches) => void;
};

const PropertyButtons = (props: ButtonProps) => {
	const { size, wornWeight, consumable, favorite, display, onClick } = props;
	return (
		<Table.Cell className="property-table-button" textAlign="center" colSpan={size}>
			<Icon
				name="favorite"
				color={favorite ? 'yellow' : 'grey'}
				style={{ opacity: display || favorite ? 100 : 0 }}
				onClick={() => onClick({ favorite: !favorite })}
			/>

			<Popup
				content="Consumable items like food or fuel."
				mouseEnterDelay={700}
				on="hover"
				trigger={
					<Icon
						name="food"
						color={consumable ? 'olive' : 'grey'}
						style={{ opacity: display || consumable ? 100 : 0 }}
						onClick={() => onClick({ consumable: !consumable })}
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
						style={{ opacity: display || wornWeight ? 100 : 0 }}
						onClick={() => onClick({ wornWeight: !wornWeight })}
					/>
				}
			/>
		</Table.Cell>
	);
};

export default PropertyButtons;
