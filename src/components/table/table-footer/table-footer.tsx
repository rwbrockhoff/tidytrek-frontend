import { Badge } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { Table } from '@/components/ui/alpine';
import { PlusIcon } from '../../ui';
import { useTableColumnWidths } from '../hooks/use-table-column-widths';
import styles from './table-footer.module.css';

type TableFooterProps = {
	handleAddItem: () => void;
	showTotals?: boolean;
	itemQuantity?: number;
	weight?: number;
	price?: string | number;
};

export const TableFooter = ({
	handleAddItem,
	showTotals = false,
	itemQuantity = 0,
	weight = 0,
	price = 0,
}: TableFooterProps) => {
	const { totalColumns, showPrices, isUser: userView } = useTableColumnWidths();
	const hasItems = showTotals && itemQuantity > 0;

	// Calculate colSpan using same logic as our table
	const summaryColumns = hasItems ? 2 + (showPrices ? 1 : 0) : 0; // qty, weight, [price]
	const actionColumns = userView ? 1 : 0; // empty action cell always present when userView
	const addButtonColSpan = totalColumns - summaryColumns - actionColumns;

	return (
		<tfoot className={styles.footer}>
			<Table.Row>
				<Table.Cell colSpan={addButtonColSpan}>
					{userView && (
						<Button
							variant="outline"
							size="sm"
							onClick={handleAddItem}
							iconLeft={<PlusIcon size={16} />}
							aria-label="Add new item to list">
							Add Item
						</Button>
					)}
				</Table.Cell>

				{hasItems && (
					<>
						<Table.Cell className={styles.summaryCell}>
							<Badge color="gray" highContrast>
								x{itemQuantity}
							</Badge>
						</Table.Cell>
						<Table.Cell className={styles.summaryCell}>{`${weight} lbs`}</Table.Cell>
						{showPrices && (
							<Table.Cell className={styles.summaryCell}>{price}</Table.Cell>
						)}
					</>
				)}
				{userView && <Table.Cell></Table.Cell>}
			</Table.Row>
		</tfoot>
	);
};
