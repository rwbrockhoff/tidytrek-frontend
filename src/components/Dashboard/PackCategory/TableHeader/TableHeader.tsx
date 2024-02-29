import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import CategoryNameCell from '../TableCells/CategoryNameCell/CategoryNameCell';
import {
	ActionButtons,
	MinimizeButton,
	DeleteButton,
} from '../TableButtons/TableButtons';
import {
	usePackCategoryHandlers,
	type HeaderInfo,
} from '../../../../views/Dashboard/handlers/usePackCategoryHandlers';
import { useState } from 'react';
import {
	usePricingContext,
	useUserContext,
} from '../../../../views/Dashboard/hooks/useViewerContext';

type TableHeaderProps = {
	categoryHeaderInfo: HeaderInfo;
	isMinimized: boolean;
	dragProps: object;
	minimizeCategory: () => void;
};

const TableHeader = (props: TableHeaderProps) => {
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
							<TableText $width="100px" $paddingRight="13px">
								Weight
							</TableText>
						</HeaderCell>

						{showPrices && (
							<HeaderCell textAlign="left" colSpan="3" $paddingLeft="25px">
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

export default TableHeader;

const TableRow = styled(Table.Row)<{ $isMinimized: boolean }>`
	opacity: ${(props) => (props.$isMinimized ? 0.5 : 1)};
	transition: opacity 250ms ease;
`;

export const HeaderCell = styled(Table.HeaderCell)<{ $paddingLeft?: string }>`
	&&&& {
		padding-left: ${({ $paddingLeft }) => $paddingLeft};
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
