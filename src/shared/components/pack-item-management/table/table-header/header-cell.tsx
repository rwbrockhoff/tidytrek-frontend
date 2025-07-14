import { Table } from '@/components/alpine';
import { cn } from '@/styles/utils';
import styles from './table-header.module.css';

export const HeaderCell = ({
	children,
	colSpan,
	textAlign,
	paddingLeft,
	className,
}: {
	children?: React.ReactNode;
	colSpan?: number;
	textAlign?: 'center' | 'start' | 'end';
	paddingLeft?: string;
	className?: string;
}) => (
	<Table.HeaderCell
		className={cn(styles.headerCell, className)}
		colSpan={colSpan}
		textAlign={textAlign}
		style={{ paddingLeft }}>
		{children}
	</Table.HeaderCell>
);