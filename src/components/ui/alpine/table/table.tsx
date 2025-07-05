import React, { forwardRef } from 'react';
import { cn } from '@/styles/utils';
import styles from './table.module.css';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
	variant?: 'default' | 'surface' | 'ghost';
	size?: '1' | '2' | '3';
	compact?: boolean;
	striped?: boolean;
	rounded?: boolean | 'sm' | 'md' | 'lg';
	shadow?: boolean | 'classic' | 'spread' | 'paper';
	highlight?: boolean;
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	children: React.ReactNode;
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	children: React.ReactNode;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	children: React.ReactNode;
}

export interface TableHeaderCellProps
	extends React.ThHTMLAttributes<HTMLTableCellElement> {
	children?: React.ReactNode;
	justify?: 'start' | 'center' | 'end';
	textAlign?: 'start' | 'center' | 'end';
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
	children?: React.ReactNode;
	textAlign?: 'start' | 'center' | 'end';
	verticalAlign?: 'top' | 'middle' | 'bottom';
}

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	children: React.ReactNode;
}

const TableRoot = forwardRef<HTMLTableElement, TableProps>(
	(
		{
			variant = 'default',
			size = '2',
			compact = false,
			striped = false,
			rounded = false,
			shadow = false,
			highlight = false,
			className,
			children,
			...props
		},
		ref,
	) => {
		const tableClasses = cn(
			styles.table,
			variant === 'default' && styles.tableDefault,
			variant === 'surface' && styles.tableSurface,
			variant === 'ghost' && styles.tableGhost,
			size === '1' && styles.tableSize1,
			size === '2' && styles.tableSize2,
			size === '3' && styles.tableSize3,
			compact && styles.tableCompact,
			striped && styles.tableStriped,
			highlight && styles.tableHighlight,
			// Rounded styles
			rounded === true && styles.tableRounded,
			rounded === 'sm' && styles.tableRoundedSm,
			rounded === 'md' && styles.tableRoundedMd,
			rounded === 'lg' && styles.tableRoundedLg,
			// Shadow styles
			shadow === true && styles.tableShadowClassic,
			shadow === 'classic' && styles.tableShadowClassic,
			shadow === 'spread' && styles.tableShadowSpread,
			shadow === 'paper' && styles.tableShadowPaper,
			className,
		);

		return (
			<table ref={ref} className={tableClasses} {...props}>
				{children}
			</table>
		);
	},
);

TableRoot.displayName = 'TableRoot';

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
	({ className, children, ...props }, ref) => {
		return (
			<thead ref={ref} className={cn(styles.header, className)} {...props}>
				{children}
			</thead>
		);
	},
);

TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
	({ className, children, ...props }, ref) => {
		return (
			<tbody ref={ref} className={cn(styles.body, className)} {...props}>
				{children}
			</tbody>
		);
	},
);

TableBody.displayName = 'TableBody';

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
	({ className, children, ...props }, ref) => {
		return (
			<tr ref={ref} className={cn(styles.row, className)} {...props}>
				{children}
			</tr>
		);
	},
);

TableRow.displayName = 'TableRow';

const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
	({ className, children, justify = 'start', textAlign = 'start', ...domProps }, ref) => {
		// Use textAlign if provided, otherwise fall back to justify
		const alignment = textAlign || justify;

		const cellClasses = cn(
			styles.headerCell,
			alignment === 'start' && styles.justifyStart,
			alignment === 'center' && styles.justifyCenter,
			alignment === 'end' && styles.justifyEnd,
			className,
		);

		return (
			<th ref={ref} className={cellClasses} {...domProps}>
				{children}
			</th>
		);
	},
);

TableHeaderCell.displayName = 'TableHeaderCell';

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
	(
		{ className, children, textAlign = 'start', verticalAlign = 'middle', ...domProps },
		ref,
	) => {
		const cellClasses = cn(
			styles.cell,
			textAlign === 'start' && styles.alignStart,
			textAlign === 'center' && styles.alignCenter,
			textAlign === 'end' && styles.alignEnd,
			verticalAlign === 'top' && styles.valignTop,
			verticalAlign === 'middle' && styles.valignMiddle,
			verticalAlign === 'bottom' && styles.valignBottom,
			className,
		);

		return (
			<td ref={ref} className={cellClasses} {...domProps}>
				{children}
			</td>
		);
	},
);

TableCell.displayName = 'TableCell';

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
	({ className, children, ...props }, ref) => {
		return (
			<tfoot ref={ref} className={cn(styles.footer, className)} {...props}>
				{children}
			</tfoot>
		);
	},
);

TableFooter.displayName = 'TableFooter';

// Export individual components for Fast Refresh compatibility
export {
	TableRoot,
	TableHeader,
	TableBody,
	TableRow,
	TableHeaderCell,
	TableCell,
	TableFooter,
};
