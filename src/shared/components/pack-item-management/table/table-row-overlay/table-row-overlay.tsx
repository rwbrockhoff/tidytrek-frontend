import { Table as AlpineTable } from '@/components/alpine';
import { useTableColumnWidths } from '../hooks/use-table-column-widths';
import { usePackPricing } from '@/hooks/pack/use-pack-pricing';
import { cn } from '@/styles/utils';
import tableStyles from '../table-main/table.module.css';
import styles from './table-row-overlay.module.css';
import { type BaseTableRowItem } from '@/types/pack-types';

interface TableRowOverlayProps {
	item: BaseTableRowItem;
}

export const TableRowOverlay = ({ item }: TableRowOverlayProps) => {
	const { widths, isCreator } = useTableColumnWidths();
	const showPackPrices = usePackPricing();

	return (
		<AlpineTable.Root
			variant="surface"
			compact
			size="1"
			className={cn(
				tableStyles.table,
				!isCreator && tableStyles.tableGuestView,
				styles.overlayTable,
			)}>
			<colgroup>
				<col width={widths.itemName} />
				<col width={widths.description} />
				<col width={widths.properties} />
				<col width={widths.qty} />
				<col width={widths.weight} />
				{showPackPrices && <col width={widths.price} />}
				{isCreator && <col width={widths.actions} />}
			</colgroup>
			<AlpineTable.Body>
				<AlpineTable.Row className={styles.overlayRow}>
					<AlpineTable.Cell>{item.packItemName || 'Pack Item'}</AlpineTable.Cell>
					<AlpineTable.Cell>{item.packItemDescription || ''}</AlpineTable.Cell>
					<AlpineTable.Cell>{/* Properties placeholder */}</AlpineTable.Cell>
					<AlpineTable.Cell>{item.packItemQuantity || 1}</AlpineTable.Cell>
					<AlpineTable.Cell>{item.packItemWeight}g</AlpineTable.Cell>
					{showPackPrices && (
						<AlpineTable.Cell>
							{item.packItemPrice ? `$${item.packItemPrice}` : ''}
						</AlpineTable.Cell>
					)}
					{isCreator && <AlpineTable.Cell></AlpineTable.Cell>}
				</AlpineTable.Row>
			</AlpineTable.Body>
		</AlpineTable.Root>
	);
};
