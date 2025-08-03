import { Table as AlpineTable } from '@/components/alpine/';
import { useTableColumnWidths } from '../hooks/use-table-column-widths';
import styles from './table.module.css';

export const Table = ({ children }: { children: React.ReactNode }) => {
	const { widths, showPrices, isCreator } = useTableColumnWidths();

	return (
		<AlpineTable.Root variant="surface" compact size="1" className={styles.table}>
			<colgroup>
				<col width={widths.itemName} />
				<col width={widths.description} />
				<col width={widths.properties} />
				<col width={widths.qty} />
				<col width={widths.weight} />
				{showPrices && <col width={widths.price} />}
				{isCreator && <col width={widths.actions} />}
			</colgroup>
			{children}
		</AlpineTable.Root>
	);
};
