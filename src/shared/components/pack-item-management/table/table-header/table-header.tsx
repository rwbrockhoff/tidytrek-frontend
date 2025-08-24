import { type HeaderInfo } from '@/types/pack-types';
import { Table } from '@/components/alpine';
import { CategoryNameCell } from '@/features/dashboard/components/table';
import { HeaderCell } from './header-cell';
import { CategoryActionsMenu } from '../category-actions-menu';
import {
	useDeletePackCategoryMutation,
	useDeletePackCategoryAndItemsMutation,
} from '@/queries/pack-queries';
import { usePackPricing } from '@/hooks/pack/use-pack-pricing';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { usePackDetails } from '@/hooks/pack/use-pack-details';
import { getPaletteColor } from '@/styles/palette/palette-map';
import { cn } from '@/styles/utils';
import styles from './table-header.module.css';
import tableStyles from '../table-main/table.module.css';

type TableHeaderProps = {
	categoryHeaderInfo: HeaderInfo;
	isMinimized: boolean;
	dragProps: object;
	minimizeCategory: () => void;
};

export const TableHeader = (props: TableHeaderProps) => {
	const { mutate: deletePackCategory } = useDeletePackCategoryMutation();
	const { mutate: deletePackCategoryAndItems } = useDeletePackCategoryAndItemsMutation();
	const { isCreator } = useUserPermissionsContext();
	const showPrices = usePackPricing();
	const { palette: currentPalette } = usePackDetails();

	const { categoryHeaderInfo, isMinimized, dragProps, minimizeCategory } = props;
	const { packCategoryId, packCategoryColor } = categoryHeaderInfo;

	const dynamicHeaderStyle = {
		borderTop: `3px solid ${getPaletteColor(currentPalette, packCategoryColor)}`,
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
						<HeaderCell
							className={cn(
								tableStyles.quantityColumn,
								tableStyles.quantityColumnText,
								!isCreator && tableStyles.quantityColumnGuestView,
							)}>
							Qty
						</HeaderCell>

						<HeaderCell
							className={cn(
								tableStyles.weightColumn,
								isCreator
									? tableStyles.weightColumnHeaderText
									: tableStyles.weightColumnGuestView,
							)}>
							Weight
						</HeaderCell>

						{showPrices && (
							<HeaderCell
								className={cn(
									tableStyles.priceColumn,
									isCreator
										? tableStyles.priceColumnHeaderText
										: tableStyles.priceColumnGuestView,
								)}>
								Price
							</HeaderCell>
						)}
					</>
				)}
				{isCreator && (
					<Table.HeaderCell className={tableStyles.actionButtons}>
						<CategoryActionsMenu
							isMinimized={isMinimized}
							onMinimizeCategory={minimizeCategory}
							onDeletePackCategory={() => deletePackCategory(packCategoryId)}
							onDeletePackCategoryAndItems={() =>
								deletePackCategoryAndItems(packCategoryId)
							}
						/>
					</Table.HeaderCell>
				)}
			</Table.Row>
		</Table.Header>
	);
};
