import { type HeaderInfo } from '@/types/pack-types';
import { Flex, Table } from '@radix-ui/themes';
import { CategoryNameCell } from './table-cells';
import { ActionButtons } from './table-buttons/';
import { usePackCategoryHandlers } from '@/features/dashboard/handlers/use-pack-category-handlers';
import { usePricingContext, useUserContext } from '@/hooks/use-viewer-context';
import { DeleteModal, MinusIcon, PlusIcon, TrashIcon } from '../ui';
import { cn } from '@/styles/utils';
import styles from './table-header.module.css';

type TableHeaderProps = {
	categoryHeaderInfo: HeaderInfo;
	isMinimized: boolean;
	dragProps: object;
	minimizeCategory: () => void;
};

export const TableHeader = (props: TableHeaderProps) => {
	const { deleteCategory, deleteCategoryAndItems } = usePackCategoryHandlers().handlers;
	const userView = useUserContext();
	const showPrices = usePricingContext();

	const { categoryHeaderInfo, isMinimized, dragProps, minimizeCategory } = props;
	const { packCategoryId, packCategoryColor } = categoryHeaderInfo;

	// Create inline style for dynamic border color
	const headerStyle = packCategoryColor 
		? { borderTop: `3px solid var(--palette-color-${packCategoryColor}, var(--color-primary))` }
		: {};

	return (
		<Table.Header className={cn(styles.header, !packCategoryColor && styles.borderPrimary)} style={headerStyle}>
			<Table.Row className={cn(styles.tableRow, isMinimized ? styles.minimized : styles.normal)}>
				<CategoryNameCell
					categoryHeaderInfo={categoryHeaderInfo}
					disabled={isMinimized}
					dragProps={dragProps}
				/>

				<HeaderCell colSpan={2} />
				{isMinimized && <HeaderCell colSpan={showPrices ? 3 : 2} />}

				{!isMinimized && (
					<>
						<HeaderCell align="center">Qty</HeaderCell>

						<HeaderCell align="center">Weight</HeaderCell>

						{showPrices && <HeaderCell align="center">Price</HeaderCell>}
					</>
				)}
				{userView && (
					<ActionButtons header>
						<Flex align="center" onClick={minimizeCategory}>
							{isMinimized ? <PlusIcon /> : <MinusIcon />}
						</Flex>
						<DeleteModal
							header="Are you sure?"
							message={deleteCategoryMessage}
							onClickMove={() => deleteCategory(packCategoryId)}
							onClickDelete={() => deleteCategoryAndItems(packCategoryId)}>
							<Flex align="center">
								<TrashIcon />
							</Flex>
						</DeleteModal>
					</ActionButtons>
				)}
			</Table.Row>
		</Table.Header>
	);
};

// defaults
const deleteCategoryMessage =
	'You can permanently delete your category or move the items to your gear closet.';

export const HeaderCell = ({ children, colSpan, align, paddingLeft }: {
	children?: React.ReactNode;
	colSpan?: number;
	align?: 'center' | 'left' | 'right';
	paddingLeft?: string;
}) => (
	<Table.ColumnHeaderCell 
		className={styles.headerCell}
		colSpan={colSpan}
		align={align}
		style={{ paddingLeft }}
	>
		{children}
	</Table.ColumnHeaderCell>
);

export const TableText = ({ children, width, paddingLeft, paddingRight }: {
	children: React.ReactNode;
	width?: string;
	paddingLeft?: string;
	paddingRight?: string;
}) => (
	<p 
		className={styles.tableText}
		style={{ width, paddingLeft, paddingRight }}
	>
		{children}
	</p>
);
