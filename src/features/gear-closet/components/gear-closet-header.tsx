import { Table } from '@radix-ui/themes';
import { HeaderCell } from '@/components/table';

export const GearClosetHeader = () => {
	return (
		<Table.Header className="withPrimaryBorder">
			<Table.Row>
				<HeaderCell $paddingLeft="25px">Item</HeaderCell>

				<HeaderCell $paddingLeft="25px">Description</HeaderCell>

				<Table.ColumnHeaderCell />
				<HeaderCell align="center">Qty</HeaderCell>

				<HeaderCell align="left">Weight</HeaderCell>

				<HeaderCell align="center">Price</HeaderCell>

				{/* Empty Cell for where Action Buttons is visually for table rows */}
				<Table.ColumnHeaderCell></Table.ColumnHeaderCell>
			</Table.Row>
		</Table.Header>
	);
};
