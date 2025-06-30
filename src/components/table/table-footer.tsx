import { Badge, Button, Table } from '@radix-ui/themes';
import { PlusIcon } from '../ui';
import { usePricingContext, useUserContext } from '@/hooks/use-viewer-context';
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
	const userView = useUserContext();
	const showPrices = usePricingContext();
	const hasItems = showTotals && itemQuantity > 0;

	return (
		<tfoot className={styles.footer}>
			<Table.Row>
				<Table.Cell colSpan={hasItems ? 3 : 6}>
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
