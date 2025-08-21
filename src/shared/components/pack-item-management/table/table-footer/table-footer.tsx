import { useMemo } from 'react';
import { Badge } from '@radix-ui/themes';
import { Button, Table } from '@/components/alpine';
import { PlusIcon } from '@/components/icons';
import { useTableColumnWidths } from '../hooks/use-table-column-widths';
import tableStyles from '../table-main/table.module.css';
import { usePackContext } from '@/features/dashboard/hooks/use-pack-context';
import { cn } from '@/styles/utils';

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
	const { totalColumns, showPrices, isCreator } = useTableColumnWidths();
	const { weightUnit } = usePackContext();
	const hasItems = showTotals && itemQuantity > 0;

	// Calculate colSpan using same logic as our table
	const addButtonColSpan = useMemo(() => {
		const summaryColumns = hasItems ? 2 + (showPrices ? 1 : 0) : 0; // qty, weight, [price]
		const actionColumns = isCreator ? 1 : 0; // empty action cell always present when isCreator
		return totalColumns - summaryColumns - actionColumns;
	}, [hasItems, showPrices, isCreator, totalColumns]);

	return (
		<tfoot>
			<Table.Row>
				<Table.Cell colSpan={addButtonColSpan} className={tableStyles.footerAddItemCell}>
					{isCreator && (
						<Button
							variant="outline"
							color="tertiary"
							size="sm"
							className={tableStyles.footerAddItemButton}
							onClick={handleAddItem}
							iconLeft={<PlusIcon />}
							override
							aria-label="Add new item to list">
							Add Item
						</Button>
					)}
				</Table.Cell>

				{hasItems && (
					<>
						<Table.Cell className={cn(
							tableStyles.quantityColumn,
							!isCreator && tableStyles.quantityColumnGuestView
						)}>
							<Badge color="gray" highContrast>
								x{itemQuantity}
							</Badge>
						</Table.Cell>
						<Table.Cell
							className={cn(
								tableStyles.weightColumn,
								isCreator ? tableStyles.weightColumnText : tableStyles.weightColumnGuestView,
							)}>{`${weight} ${weightUnit.base}`}</Table.Cell>
						{showPrices && (
							<Table.Cell
								className={cn(
									tableStyles.priceColumn,
									isCreator ? tableStyles.priceColumnText : tableStyles.priceColumnGuestView
								)}>
								{price}
							</Table.Cell>
						)}
					</>
				)}
				{isCreator && <Table.Cell></Table.Cell>}
			</Table.Row>
		</tfoot>
	);
};
