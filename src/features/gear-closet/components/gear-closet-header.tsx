import { Table } from '@radix-ui/themes';
import { HeaderCell, TableText } from '@/components/table';

export const GearClosetHeader = () => {
	return (
		<Table.Header>
			<Table.Row>
				<HeaderCell colSpan={5} $paddingLeft="25px">
					Item
				</HeaderCell>

				<HeaderCell colSpan={5} $paddingLeft="25px">
					Description
				</HeaderCell>

				<Table.ColumnHeaderCell colSpan={4} />
				<HeaderCell align="left" colSpan={2} $paddingLeft="15px">
					Qty
				</HeaderCell>

				<HeaderCell align="center" colSpan={3}>
					<TableText $width="100px" $paddingRight="13px">
						Weight
					</TableText>
				</HeaderCell>

				<HeaderCell align="left" colSpan={3} $paddingLeft="25px">
					<TableText $width="75px" $paddingLeft="13px">
						Price
					</TableText>
				</HeaderCell>

				<Table.ColumnHeaderCell colSpan={2}></Table.ColumnHeaderCell>
			</Table.Row>
		</Table.Header>
	);
};
