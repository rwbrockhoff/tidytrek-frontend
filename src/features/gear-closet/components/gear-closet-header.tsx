import { Table } from 'semantic-ui-react';
import { HeaderCell, TableText } from '@/components/table';

export const GearClosetHeader = () => {
	return (
		<Table.Header>
			<Table.Row>
				<HeaderCell colSpan="5" $paddingLeft="25px">
					Item
				</HeaderCell>

				<HeaderCell colSpan="5" $paddingLeft="25px">
					Description
				</HeaderCell>

				<Table.HeaderCell colSpan="4" />
				<HeaderCell textAlign="left" colSpan="2" $paddingLeft="15px">
					Qty
				</HeaderCell>

				<HeaderCell textAlign="center" colSpan="3">
					<TableText $width="100px" $paddingRight="13px">
						Weight
					</TableText>
				</HeaderCell>

				<HeaderCell textAlign="left" colSpan="3" $paddingLeft="25px">
					<TableText $width="75px" $paddingLeft="13px">
						Price
					</TableText>
				</HeaderCell>

				<Table.HeaderCell colSpan="2"></Table.HeaderCell>
			</Table.Row>
		</Table.Header>
	);
};
