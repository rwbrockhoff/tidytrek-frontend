import { Flex, Table, Button, IconButton } from '@radix-ui/themes';
import { cn, mx } from '@/styles/utils';
import styles from './table-buttons.module.css';
import { PlusIcon, CaretDownIcon, ShareIcon, GripIcon } from '@/components/ui';
import { useContext } from 'react';
import { TableRowContext } from '../context/table-row-context';
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
			<Table.ColumnHeaderCell className={styles.headerCell} justify="center">
				<Flex
					className={cn(
						styles.flexContainer,
						display ? styles.flexVisible : styles.flexHidden,
					)}>
					{children}
				</Flex>
			</Table.ColumnHeaderCell>
		);
	} else {
		return (
			<Table.Cell valign="middle" ref={ref} style={{ width }}>
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
			<CaretDownIcon />
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
			className={cn(styles.tableButton, !display && styles.tableButtonHidden)}>
			<ShareIcon />
		</IconButton>
	);
};

export const AddCategoryButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button variant="outline" color="gray" size="2" radius="medium" onClick={onClick}>
			<PlusIcon />
			Add Category
		</Button>
	);
};

export const GripButton = ({ display, ...props }: { display: boolean }) => {
	return (
		<Flex
			align="center"
			justify="center"
			className={cn(styles.gripContainer, display && styles.gripContainerVisible)}
			{...props}>
			<GripIcon />
		</Flex>
	);
};
