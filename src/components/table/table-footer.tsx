import { Badge, Button } from '@radix-ui/themes';
import { TableRow, TableCell } from '@/components/ui/alpine';
import { PlusIcon } from '../ui';
import { useTableColumnWidths } from './hooks/use-table-column-widths';
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
			<TableRow>
				<TableCell colSpan={addButtonColSpan}>
					{userView && (
						<Button
							variant="outline"
							color="gray"
							size="1"
							ml="2"
							onClick={handleAddItem}
							aria-label="Add new item to list">
							<PlusIcon />
							Add Item
						</Button>
					)}
				</TableCell>

				{hasItems && (
					<>
						<TableCell className={styles.summaryCell}>
							<Badge color="gray" highContrast>
								x{itemQuantity}
							</Badge>
						</TableCell>
						<TableCell className={styles.summaryCell}>{`${weight} lbs`}</TableCell>
						{showPrices && <TableCell className={styles.summaryCell}>{price}</TableCell>}
					</>
				)}
				{userView && <TableCell></TableCell>}
			</TableRow>
		</tfoot>
	);
};
