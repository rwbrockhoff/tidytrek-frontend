import { Table as RadixTable } from '@radix-ui/themes';
import { usePricingContext, useUserContext } from '@/hooks';
import { cn } from '@/styles/utils/cn';
import styles from './table.module.css';

export const Table = ({ children }: { children: React.ReactNode }) => {
	const showPrices = usePricingContext() || false;
	const isUser = useUserContext();

	// Simplified width calculation - more readable
	const getColumnWidths = () => {
		const baseWidth = isUser ? 25 : 30; // Main columns wider when no actions
		const adjustedWidth = showPrices ? baseWidth - 3 : baseWidth;
		
		return {
			main: `${adjustedWidth}%`,
			qty: '6%',
			weight: '12%',
			price: '10%',
			actions: '10%'
		};
	};

	const widths = getColumnWidths();

	return (
		<RadixTable.Root variant="surface" size="1" className={styles.table}>
			<colgroup>
				<col width={widths.main} />
				<col width={widths.main} />
				<col width="12%" />
				<col width={widths.qty} />
				<col width={widths.weight} />
				{showPrices && <col width={widths.price} />}
				{isUser && <col width={widths.actions} />}
			</colgroup>
			{children}
		</RadixTable.Root>
	);
};
