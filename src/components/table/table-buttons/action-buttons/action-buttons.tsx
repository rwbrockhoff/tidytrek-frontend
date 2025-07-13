import { Flex } from '@radix-ui/themes';
import { Table } from '@/components/alpine';
import { cn } from '@/styles/utils';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';
import styles from './action-buttons.module.css';

type ActionButtonsProps = {
	header?: boolean;
	size?: number;
	display?: boolean;
	isDragging?: boolean;
	children: React.ReactNode;
};

export const ActionButtons = (props: ActionButtonsProps) => {
	const { header, display = true, isDragging = false, children } = props;
	const { ref, width } = useCellWidth(isDragging);

	if (header) {
		return (
			<Table.HeaderCell className={styles.headerCell} justify="center">
				<Flex
					className={cn(
						styles.flexContainer,
						display ? styles.flexVisible : styles.flexHidden,
					)}>
					{children}
				</Flex>
			</Table.HeaderCell>
		);
	} else {
		return (
			<Table.Cell verticalAlign="middle" ref={ref} style={{ width }}>
				<Flex
					className={cn(
						styles.flexContainer,
						display ? styles.flexVisible : styles.flexHidden,
					)}>
					{children}
				</Flex>
			</Table.Cell>
		);
	}
};
