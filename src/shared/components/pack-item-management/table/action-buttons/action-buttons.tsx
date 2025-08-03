import { Flex } from '@/components/layout';
import { Table } from '@/components/alpine';
import { cn } from '@/styles/utils';
import { useCellWidth } from '../hooks/use-cell-width';
import styles from './action-buttons.module.css';
import hoverStyles from '../hover-styles.module.css';

type ActionButtonsProps = {
	header?: boolean;
	size?: number;
	isDragging?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
};

export const ActionButtons = (props: ActionButtonsProps) => {
	const { header, isDragging = false, disabled = false, children } = props;
	const { ref, width } = useCellWidth(isDragging);

	if (header) {
		return (
			<Table.HeaderCell className={styles.headerCell} justify="center">
				<Flex className={styles.flexContainer}>{children}</Flex>
			</Table.HeaderCell>
		);
	} else {
		return (
			<Table.Cell verticalAlign="middle" ref={ref} style={{ width }}>
				<Flex className={cn(styles.flexContainer, !disabled && hoverStyles.showOnHover)}>
					{children}
				</Flex>
			</Table.Cell>
		);
	}
};
