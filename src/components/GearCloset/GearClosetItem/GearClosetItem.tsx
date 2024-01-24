import { Table } from 'semantic-ui-react';

type GearItem = {
	packItemName: string;
	packItemDescription: string;
	packItemWeight: number;
};

type GearClosetItemProps = {
	item: GearItem;
};

const GearClosetItem = (props: GearClosetItemProps) => {
	const { packItemName, packItemDescription, packItemWeight } = props.item;
	return (
		<Table.Row>
			<Table.Cell>{packItemName}</Table.Cell>
			<Table.Cell>{packItemDescription}</Table.Cell>
			<Table.Cell>{packItemWeight}</Table.Cell>
		</Table.Row>
	);
};

export default GearClosetItem;
