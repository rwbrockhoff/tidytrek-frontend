import { Table } from '@/components/alpine';
import { HeaderCell } from '@/components/table';
import { cn } from '@/styles/utils';
import styles from './gear-closet-header.module.css';

export const GearClosetHeader = () => {
	return (
		<Table.Header className={cn('withPrimaryBorder', styles.gearClosetHeader)}>
			<Table.Row>
				<HeaderCell paddingLeft="1.5em">Item</HeaderCell>

				<HeaderCell paddingLeft="1.5em">Description</HeaderCell>

				<Table.HeaderCell />
				<HeaderCell textAlign="center">Qty</HeaderCell>

				<HeaderCell textAlign="center">Weight</HeaderCell>

				<HeaderCell textAlign="center">Price</HeaderCell>

				{/* Empty Cell for where Action Buttons is visually for table rows */}
				<Table.HeaderCell></Table.HeaderCell>
			</Table.Row>
		</Table.Header>
	);
};
