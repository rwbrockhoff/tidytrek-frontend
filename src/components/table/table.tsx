import { TableRoot } from '@/components/ui/alpine/table/table';
import { useTableColumnWidths } from './hooks/use-table-column-widths';
import styles from './table.module.css';

export const Table = ({ children }: { children: React.ReactNode }) => {
	const { widths, showPrices, isUser } = useTableColumnWidths();

	return (
		<TableRoot variant="surface" compact size="1" className={styles.table}>
			<colgroup>
				<col width={widths.itemName} />
				<col width={widths.description} />
				<col width={widths.properties} />
				<col width={widths.qty} />
				<col width={widths.weight} />
				{showPrices && <col width={widths.price} />}
				{isUser && <col width={widths.actions} />}
			</colgroup>
			{children}
		</TableRoot>
	);
};
