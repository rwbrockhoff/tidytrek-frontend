import { type HeaderInfo } from '@/types/pack-types';
import { Flex } from '@radix-ui/themes';
import { Button, Table } from '@/components/alpine';
import { CategoryNameCell } from '@/features/dashboard/components/table';
import { ActionButtons } from '../action-buttons/action-buttons';
import { HeaderCell } from './header-cell';
import {
	useDeletePackCategoryMutation,
	useDeletePackCategoryAndItemsMutation,
} from '@/queries/pack-queries';
import { usePricingContext } from '@/hooks/auth/use-pricing-context';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { DeleteModal } from '@/components/ui';
import { MinusIcon, PlusIcon, TrashIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from './table-header.module.css';

type TableHeaderProps = {
	categoryHeaderInfo: HeaderInfo;
	isMinimized: boolean;
	dragProps: object;
	minimizeCategory: () => void;
};

export const TableHeader = (props: TableHeaderProps) => {
	const { mutate: deletePackCategory } = useDeletePackCategoryMutation();
	const { mutate: deletePackCategoryAndItems } = useDeletePackCategoryAndItemsMutation();
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
						<HeaderCell textAlign="center">Qty</HeaderCell>

						<HeaderCell textAlign="center">Weight</HeaderCell>

						{showPrices && <HeaderCell textAlign="center">Price</HeaderCell>}
					</>
				)}
				{userView && (
					<ActionButtons header>
						<Flex align="center">
							<Button
								onClick={minimizeCategory}
								variant="ghost"
								size="md"
								override
								className={styles.tableActionButton}
								data-testid="minimize-category-button"
								iconLeft={isMinimized ? <PlusIcon /> : <MinusIcon />}
								aria-label={isMinimized ? 'Expand category' : 'Minimize category'}
							/>
						</Flex>
						<DeleteModal
							header="Are you sure?"
							message={deleteCategoryMessage}
							onClickMove={() => deletePackCategory(packCategoryId)}
							onClickDelete={() => deletePackCategoryAndItems(packCategoryId)}>
							<Flex align="center" aria-label="Delete category">
								<Button
									variant="ghost"
									size="md"
									override
									className={styles.tableActionButton}
									data-testid="delete-category-button"
									iconLeft={<TrashIcon />}
									aria-label="Delete category"
								/>
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

