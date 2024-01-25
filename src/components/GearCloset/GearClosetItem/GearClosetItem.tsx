import { Select, Table, Button, Icon } from 'semantic-ui-react';
import { type Pack, type PackItem } from '../../../redux/packs/packTypes';

type GearClosetItemProps = {
	item: PackItem;
	availablePacks: Pack[];
};

const GearClosetItem = (props: GearClosetItemProps) => {
	const { packItemName, packItemDescription, packItemWeight, packItemUnit } = props.item;
	const packList = props.availablePacks.map((item) => ({
		key: item.packId,
		value: item.packId,
		text: item.packName,
	}));

	return (
		<Table.Row>
			<Table.Cell colSpan="2">{packItemName}</Table.Cell>
			<Table.Cell colSpan="2">{packItemDescription}</Table.Cell>
			<Table.Cell colSpan="2">
				{packItemWeight} {packItemUnit}
			</Table.Cell>
			<Table.Cell colSpan="2" collapsing>
				<Select
					placeholder="Pack"
					search
					clearable
					fluid
					labeled
					options={packList}></Select>
			</Table.Cell>
			<Table.Cell colSpan="2" collapsing>
				<Select
					placeholder="Category"
					search
					clearable
					fluid
					labeled
					disabled
					options={packList}></Select>
			</Table.Cell>
			<Table.Cell colSpan="1" textAlign="right">
				<Button size="small" disabled>
					<Icon name="share" />
					Move
				</Button>
			</Table.Cell>
		</Table.Row>
	);
};

export default GearClosetItem;
