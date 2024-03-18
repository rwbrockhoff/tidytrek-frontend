import { useState } from 'react';
import { Table } from '@radix-ui/themes';
import styled from 'styled-components';
import { CategoryNameCell } from './table-cells';
import { ActionButtons } from './table-buttons/';
import {
	usePackCategoryHandlers,
	type HeaderInfo,
} from '@/features/dashboard/handlers/use-pack-category-handlers';
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
	const { packCategoryId } = categoryHeaderInfo;
	const [toggleRow, setToggleRow] = useState(false);

	const minSpanSize = isMinimized ? 22 : 14 + (showPrices ? 0 : 3);
	const spanSize = userView ? minSpanSize : showPrices ? 16 : 19;

	return (
		<Table.Header
			{...dragProps}
			onMouseOver={() => setToggleRow(true)}
			onMouseLeave={() => setToggleRow(false)}
			style={{ verticalAlign: 'middle' }}>
			<TableRow $isMinimized={isMinimized}>
				<CategoryNameCell
					categoryHeaderInfo={categoryHeaderInfo}
					size={spanSize}
					disabled={isMinimized}
				/>

				{!isMinimized && (
					<>
						<HeaderCell align="left" colSpan={2} $paddingLeft="15px">
							Qty
						</HeaderCell>

						<HeaderCell align="center" colSpan={3}>
							<TableText $width="100px" $paddingRight="5px">
								Weight
							</TableText>
						</HeaderCell>

						{showPrices && (
							<HeaderCell align="left" colSpan={3} $paddingLeft="15px">
								<TableText $width="75px" $paddingLeft="13px">
									Price
								</TableText>
							</HeaderCell>
						)}
					</>
				)}
				{userView && (
					<ActionButtons header size={2} display={toggleRow}>
						<div onClick={minimizeCategory}>
							{isMinimized ? <PlusIcon /> : <MinusIcon />}
						</div>
						<DeleteModal
							header="Are you sure?"
							message={deleteCategoryMessage}
							onClickMove={() => deleteCategory(packCategoryId)}
							onClickDelete={() => deleteCategoryAndItems(packCategoryId)}>
							<div>
								<TrashIcon />
							</div>
						</DeleteModal>
					</ActionButtons>
				)}
			</TableRow>
		</Table.Header>
	);
};

// defaults
const deleteCategoryMessage =
	'You can permanently delete your category or move the items to your gear closet.';

const TableRow = styled(Table.Row)<{ $isMinimized: boolean }>`
	opacity: ${(props) => (props.$isMinimized ? 0.5 : 1)};
	transition: opacity 250ms ease;
	${({ theme: t }) =>
		t.mx.mobile(`
		opacity: 1;
		display: flex !important;
	`)}
`;

// display:block !important deeply nested in Semantic css
export const HeaderCell = styled(Table.ColumnHeaderCell)<{ $paddingLeft?: string }>`
	padding-left: ${({ $paddingLeft }) => $paddingLeft};
	${({ theme: t }) =>
		t.mx.mobile(`
			display: none !important;
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
