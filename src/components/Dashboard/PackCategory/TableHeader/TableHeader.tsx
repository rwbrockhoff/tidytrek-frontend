import { Table } from 'semantic-ui-react';
import CategoryNameCell from '../TableCells/CategoryNameCell/CategoryNameCell';
import {
	ActionButtons,
	MinimizeButton,
	DeleteButton,
} from '../TableButtons/TableButtons';
import { type HeaderInfo } from '../../../../views/Dashboard/handlers/usePackCategoryHandlers';
import { useState } from 'react';
import { useUserContext } from '../../../../views/Dashboard/useUserContext';

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

	const minSpanSize = isMinimized ? 15 : 11;
	const spanSize = userView ? minSpanSize : 12;
	return (
		<Table.Header
			{...dragProps}
			onMouseOver={() => setToggleRow(true)}
			onMouseLeave={() => setToggleRow(false)}>
			<Table.Row style={{ opacity: isMinimized ? 0.5 : 1 }}>
				<CategoryNameCell
					categoryHeaderInfo={categoryHeaderInfo}
					size={spanSize}
					disabled={isMinimized}
				/>

				{!isMinimized && (
					<>
						<Table.HeaderCell
							textAlign="center"
							colSpan="2"
							style={{ paddingLeft: '50px' }}>
							Qty
						</Table.HeaderCell>

						<Table.HeaderCell
							textAlign="center"
							colSpan="2"
							style={{ paddingLeft: userView ? '25px' : 0 }}>
							Weight
						</Table.HeaderCell>
					</>
				)}
				{userView && (
					<ActionButtons header size={1}>
						<MinimizeButton
							display={toggleRow}
							isMinimized={isMinimized}
							minimize={minimizeCategory}
						/>
						<DeleteButton display={toggleRow} onClickDelete={deleteCategory} />
					</ActionButtons>
				)}
			</Table.Row>
		</Table.Header>
	);
};

export default TableHeader;
