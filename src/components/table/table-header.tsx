import { useState } from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import { CategoryNameCell } from './table-cells';
import { ActionButtons, MinimizeButton, DeleteButton } from './table-buttons/';
import {
	usePackCategoryHandlers,
	type HeaderInfo,
} from '@/features/dashboard/handlers/use-pack-category-handlers';
import {
	usePricingContext,
	useUserContext,
} from '@/features/dashboard/hooks/useViewerContext';

type TableHeaderProps = {
	categoryHeaderInfo: HeaderInfo;
	isMinimized: boolean;
	dragProps: object;
	minimizeCategory: () => void;
};

export const TableHeader = (props: TableHeaderProps) => {
	const { deleteCategoryPrompt } = usePackCategoryHandlers().handlers;
	const userView = useUserContext();
	const showPrices = usePricingContext();
	const { categoryHeaderInfo, isMinimized, dragProps, minimizeCategory } = props;
	const [toggleRow, setToggleRow] = useState(false);

	const minSpanSize = isMinimized ? 22 : 14 + (showPrices ? 0 : 3);
	const spanSize = userView ? minSpanSize : showPrices ? 16 : 19;

	return (
		<Table.Header
			{...dragProps}
			onMouseOver={() => setToggleRow(true)}
			onMouseLeave={() => setToggleRow(false)}>
			<TableRow $isMinimized={isMinimized}>
				<CategoryNameCell
					categoryHeaderInfo={categoryHeaderInfo}
					size={spanSize}
					disabled={isMinimized}
				/>

				{!isMinimized && (
					<>
						<HeaderCell textAlign="left" colSpan="2" $paddingLeft="15px">
							Qty
						</HeaderCell>

						<HeaderCell textAlign="center" colSpan="3">
							<TableText $width="100px" $paddingRight="5px">
								Weight
							</TableText>
						</HeaderCell>

						{showPrices && (
							<HeaderCell textAlign="left" colSpan="3" $paddingLeft="15px">
								<TableText $width="75px" $paddingLeft="13px">
									Price
								</TableText>
							</HeaderCell>
						)}
					</>
				)}
				{userView && (
					<ActionButtons header size={2}>
						<MinimizeButton
							display={toggleRow}
							isMinimized={isMinimized}
							minimize={minimizeCategory}
						/>
						<DeleteButton
							display={toggleRow}
							onClickDelete={() =>
								deleteCategoryPrompt(categoryHeaderInfo.packCategoryId)
							}
						/>
					</ActionButtons>
				)}
			</TableRow>
		</Table.Header>
	);
};

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
export const HeaderCell = styled(Table.HeaderCell)<{ $paddingLeft?: string }>`
	&&&& {
		padding-left: ${({ $paddingLeft }) => $paddingLeft};
		${({ theme: t }) =>
			t.mx.mobile(`
			display: none !important;
		`)}
	}
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
