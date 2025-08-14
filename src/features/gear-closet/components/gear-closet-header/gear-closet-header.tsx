import { Table } from '@/components/alpine';
import { HeaderCell } from '@/shared/components/pack-item-management/table';
import { cn } from '@/styles/utils';
import styles from './gear-closet-header.module.css';
import tableStyles from '@/shared/components/pack-item-management/table/table-main/table.module.css';

export const GearClosetHeader = () => {
	return (
		<Table.Header className={cn('withPrimaryBorder', styles.gearClosetHeader)}>
			<Table.Row>
				<HeaderCell>Item</HeaderCell>

				<HeaderCell>Description</HeaderCell>

				<HeaderCell></HeaderCell>

				<HeaderCell className={tableStyles.quantityColumn}>Qty</HeaderCell>

				<HeaderCell
					className={cn(tableStyles.weightColumn, tableStyles.weightColumnText)}>
					Weight
				</HeaderCell>

				<HeaderCell className={cn(tableStyles.priceColumn, tableStyles.priceColumnText)}>
					Price
				</HeaderCell>

				{/* Empty Cell for where Action Buttons is visually for table rows */}
				<HeaderCell className={tableStyles.actionButtons}></HeaderCell>
			</Table.Row>
		</Table.Header>
	);
};
