import { TableHeader, TableRow, TableHeaderCell } from '@/components/ui/alpine';
import { HeaderCell } from '@/components/table';
import { cn } from '@/styles/utils';
import styles from './gear-closet-header.module.css';

export const GearClosetHeader = () => {
	return (
		<TableHeader className={cn('withPrimaryBorder', styles.gearClosetHeader)}>
			<TableRow>
				<HeaderCell paddingLeft="1.5em">Item</HeaderCell>

				<HeaderCell paddingLeft="1.5em">Description</HeaderCell>

				<TableHeaderCell />
				<HeaderCell textAlign="center">Qty</HeaderCell>

				<HeaderCell textAlign="center">Weight</HeaderCell>

				<HeaderCell textAlign="center">Price</HeaderCell>

				{/* Empty Cell for where Action Buttons is visually for table rows */}
				<TableHeaderCell></TableHeaderCell>
			</TableRow>
		</TableHeader>
	);
};
