import { type HeaderInfo } from '@/types/pack-types';
import { Button, Flex, Table } from '@radix-ui/themes';
import { CategoryNameCell } from './table-cells';
import { ActionButtons } from './table-buttons/';
import { usePackCategoryActions } from '@/features/dashboard/hooks/use-pack-category-actions';
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
	const { deletePackCategory, deletePackCategoryAndItems } = usePackCategoryActions();
	const userView = useUserContext();
	const showPrices = usePricingContext();

	const { categoryHeaderInfo, isMinimized, dragProps, minimizeCategory } = props;
	const { packCategoryId, packCategoryColor } = categoryHeaderInfo;

	// Create inline style for dynamic border color
	const dynamicHeaderStyle = {
		borderTop: `3px solid var(--${packCategoryColor}, var(--color-primary))`,
	};

	return (
		<Table.Header className={styles.header} style={dynamicHeaderStyle}>
			<Table.Row
				className={cn(styles.tableRow, isMinimized ? styles.minimized : styles.normal)}>
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
						<Flex align="center">
							<Button
								onClick={minimizeCategory}
								variant="ghost"
								data-testid="minimize-category-button"
								aria-label={isMinimized ? 'Expand category' : 'Minimize category'}>
								{isMinimized ? <PlusIcon /> : <MinusIcon />}
							</Button>
						</Flex>
						<DeleteModal
							header="Are you sure?"
							message={deleteCategoryMessage}
							onClickMove={() => deletePackCategory(packCategoryId)}
							onClickDelete={() => deletePackCategoryAndItems(packCategoryId)}>
							<Flex align="center" aria-label="Delete category">
								<Button variant="ghost" data-testid="delete-category-button" aria-label="Delete category">
									<TrashIcon />
								</Button>
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

export const HeaderCell = ({
	children,
	colSpan,
	align,
	paddingLeft,
}: {
	children?: React.ReactNode;
	colSpan?: number;
	align?: 'center' | 'left' | 'right';
	paddingLeft?: string;
}) => (
	<Table.ColumnHeaderCell
		className={styles.headerCell}
		colSpan={colSpan}
		align={align}
		style={{ paddingLeft }}>
		{children}
	</Table.ColumnHeaderCell>
);

export const TableText = ({
	children,
	width,
	paddingLeft,
	paddingRight,
}: {
	children: React.ReactNode;
	width?: string;
	paddingLeft?: string;
	paddingRight?: string;
}) => (
	<p className={styles.tableText} style={{ width, paddingLeft, paddingRight }}>
		{children}
	</p>
);
