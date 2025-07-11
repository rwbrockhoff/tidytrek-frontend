import { Flex, Button, IconButton } from '@radix-ui/themes';
import { Table } from '@/components/ui/alpine';
import { cn, mx } from '@/styles/utils';
import styles from './table-buttons.module.css';
import { PlusIcon, CaretDownIcon, ShareIcon, GripIcon } from '@/components/ui';
import { useContext } from 'react';
import { TableRowContext } from '../../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type ActionButtonsProps = {
	header?: boolean;
	size?: number;
	display?: boolean;
	children: React.ReactNode;
};

export const ActionButtons = (props: ActionButtonsProps) => {
	const { header, display = true, children } = props;

	const { isDragging } = useContext(TableRowContext);
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

type MobileToggleProps = {
	onToggle: () => void;
};

export const MobileToggleButton = ({ onToggle }: MobileToggleProps) => {
	return (
		<IconButton
			onClick={onToggle}
			className={cn(
				styles.tableButton,
				styles.mobileToggleButton,
				styles.tableButtonMarginLeft,
				mx.hidden,
				mx.mobileBlock,
			)}>
			<CaretDownIcon size={16} />
		</IconButton>
	);
};

type MoveButtonProps = {
	display: boolean;
	onToggle: () => void;
};

export const MoveItemButton = ({ display, onToggle }: MoveButtonProps) => {
	return (
		<IconButton
			onClick={onToggle}
			className={cn(styles.tableButton, !display && styles.tableButtonHidden)}
			aria-label="Drag pack item">
			<ShareIcon size={16} />
		</IconButton>
	);
};

export const AddCategoryButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button variant="outline" color="gray" size="2" radius="medium" onClick={onClick}>
			<PlusIcon size={16} />
			Add Category
		</Button>
	);
};

export const GripButton = ({
	display,
	testId = 'grip-button',
	...props
}: {
	display: boolean;
	testId?: string;
}) => {
	return (
		<Flex
			align="center"
			justify="center"
			className={cn(styles.gripContainer, display && styles.gripContainerVisible)}
			data-testid={testId}
			{...props}>
			<GripIcon size={20} />
		</Flex>
	);
};
