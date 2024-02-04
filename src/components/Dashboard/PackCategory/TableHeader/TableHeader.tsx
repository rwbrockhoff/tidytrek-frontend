import { Table } from 'semantic-ui-react';
import CategoryNameCell from '../TableCells/CategoryNameCell/CategoryNameCell';
import {
	ActionButtons,
	MinimizeButton,
	DeleteButton,
} from '../TableButtons/TableButtons';
import { useState } from 'react';

type TableHeaderProps = {
	headerName: string;
	isMinimized: boolean;
	minimizeCategory: () => void;
	editCategory: (packCategoryName: string) => void;
	deleteCategory: () => void;
};

const TableHeader = (props: TableHeaderProps) => {
	const { headerName, isMinimized, minimizeCategory, editCategory, deleteCategory } =
		props;
	const [toggleRow, setToggleRow] = useState(false);

	return (
		<Table.Header
			className="category-table-header"
			onMouseOver={() => setToggleRow(true)}
			onMouseLeave={() => setToggleRow(false)}>
			<Table.Row style={{ opacity: isMinimized ? 0.5 : 1 }}>
				<CategoryNameCell
					size={isMinimized ? 15 : 12}
					disabled={isMinimized}
					categoryName={headerName}
					onToggleOff={editCategory}
				/>
				{!isMinimized && (
					<>
						<Table.HeaderCell textAlign="center" colSpan="1">
							Qty
						</Table.HeaderCell>
						<Table.HeaderCell
							textAlign="center"
							colSpan="2"
							style={{ paddingLeft: '50px' }}>
							Weight
						</Table.HeaderCell>
					</>
				)}
				<ActionButtons header size={1}>
					<MinimizeButton
						display={toggleRow}
						isMinimized={isMinimized}
						minimize={minimizeCategory}
					/>
					<DeleteButton display={toggleRow} onClickDelete={deleteCategory} />
				</ActionButtons>
			</Table.Row>
		</Table.Header>
	);
};

export default TableHeader;
