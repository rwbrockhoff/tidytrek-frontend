import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import CategoryNameCell from '../TableCells/CategoryNameCell/CategoryNameCell';
import {
	ActionButtons,
	MinimizeButton,
	DeleteButton,
} from '../TableButtons/TableButtons';
import { type HeaderInfo } from '../../../../views/Dashboard/handlers/usePackCategoryHandlers';
import { useState } from 'react';
import { useUserContext } from '../../../../views/Dashboard/hooks/useUserContext';

type TableHeaderProps = {
	categoryHeaderInfo: HeaderInfo;
	isMinimized: boolean;
	dragProps: object;
	minimizeCategory: () => void;
	deleteCategory: () => void;
};

const TableHeader = (props: TableHeaderProps) => {
	const userView = useUserContext();
	const { categoryHeaderInfo, isMinimized, dragProps, minimizeCategory, deleteCategory } =
		props;
	const [toggleRow, setToggleRow] = useState(false);

	const minSpanSize = isMinimized ? 20 : 14;
	const spanSize = userView ? minSpanSize : 10;
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

						<HeaderCell textAlign="left" colSpan="3" $paddingLeft="25px">
							<TableText $width="75px" $paddingLeft="13px">
								Price
							</TableText>
						</HeaderCell>
					</>
				)}
				{userView && (
					<ActionButtons header size={2}>
						<MinimizeButton
							display={toggleRow}
							isMinimized={isMinimized}
							minimize={minimizeCategory}
						/>
						<DeleteButton display={toggleRow} onClickDelete={deleteCategory} />
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
	width: ${(props) => props.$width && props.$width};
	padding-left: ${(props) => props.$paddingLeft && props.$paddingLeft};
	padding-right: ${(props) => props.$paddingRight && props.$paddingRight};
`;
