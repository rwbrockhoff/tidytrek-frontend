import { Table } from 'semantic-ui-react';
import { type PackItem, type Pack } from '../../../redux/packs/packTypes';
import GearClosetItem from '../GearClosetItem/GearClosetItem';

type GearClosetListProps = {
	availablePacks: Pack[];
	gearClosetList: PackItem[];
};

const GearClosetList = (props: GearClosetListProps) => {
	const { gearClosetList, availablePacks } = props;

	return (
		<Table fixed striped columns="16" color="olive" size="small">
			<Table.Body>
				{gearClosetList.map((item, index) => (
					<GearClosetItem key={index} item={item} />
				))}
			</Table.Body>
		</Table>
	);
};

export default GearClosetList;
