import { type HeaderInfo } from '@/types/pack-types';
import { useState } from 'react';
import { Flex, Table } from '@radix-ui/themes';
import styled from 'styled-components';
import { CategoryNameCell } from './table-cells';
import { ActionButtons } from './table-buttons/';
import { usePackCategoryHandlers } from '@/features/dashboard/handlers/use-pack-category-handlers';
import { usePricingContext, useUserContext } from '@/hooks/use-viewer-context';
import { DeleteModal, MinusIcon, PlusIcon, TrashIcon } from '../ui';

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
	const [toggleRow, setToggleRow] = useState(false);

	return (
		<StyledHeader
			$borderColor={packCategoryColor || 'primary'}
			onMouseOver={() => setToggleRow(true)}
			onMouseLeave={() => setToggleRow(false)}>
			<TableRow $isMinimized={isMinimized}>
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
					<ActionButtons header display={toggleRow}>
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
			</TableRow>
		</StyledHeader>
	);
};

// defaults
const deleteCategoryMessage =
	'You can permanently delete your category or move the items to your gear closet.';

const StyledHeader = styled(Table.Header)<{ $borderColor: string }>`
	vertical-align: middle;
	border-top: 3px solid ${(props) => props.theme.mx.getThemeColor(props.$borderColor)};
	& th {
		height: 55px;
		box-shadow: none;
		border-bottom: 1px solid var(--gray-4);
	}
`;

const TableRow = styled(Table.Row)<{ $isMinimized: boolean }>`
	opacity: ${(props) => (props.$isMinimized ? 0.5 : 1)};
	transition: opacity 250ms ease;
	${({ theme: t }) =>
		t.mx.mobile(`
		opacity: 1;
		display: flex;
	`)}
`;

export const HeaderCell = styled(Table.ColumnHeaderCell)<{ $paddingLeft?: string }>`
	padding-left: ${({ $paddingLeft }) => $paddingLeft};
	vertical-align: middle;
	${({ theme: t }) =>
		t.mx.mobile(`
			display: none;
		`)}
`;

export const TableText = styled.p<{
	$width: string;
	$paddingLeft?: string;
	$paddingRight?: string;
}>`
	width: ${({ $width }) => $width && $width};
	padding-left: ${({ $paddingLeft }) => $paddingLeft && $paddingLeft};
	padding-right: ${({ $paddingRight }) => $paddingRight && $paddingRight};
`;
