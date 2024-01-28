import { Table } from 'semantic-ui-react';
import CategoryNameCell from '../TableCells/CategoryNameCell/CategoryNameCell';
import DeleteButton from '../TableButtons/DeleteButton';
import { useState } from 'react';

type TableHeaderProps = {
	headerName: string;
	handleEditCategory: (packCategoryName: string) => void;
	handleDeleteCategory: () => void;
};

const TableHeader = (props: TableHeaderProps) => {
	const { headerName, handleEditCategory, handleDeleteCategory } = props;
	const [toggleRow, setToggleRow] = useState(false);

	return (
		<Table.Header
			className="category-table-header"
			onMouseOver={() => setToggleRow(true)}
			onMouseLeave={() => setToggleRow(false)}>
			<Table.Row>
				<CategoryNameCell
					size={12}
					categoryName={headerName}
					onToggleOff={handleEditCategory}
				/>

				<Table.HeaderCell textAlign="center" colSpan="1">
					Qty
				</Table.HeaderCell>
				<Table.HeaderCell textAlign="center" colSpan="2" style={{ paddingLeft: '50px' }}>
					Weight
				</Table.HeaderCell>

				<DeleteButton header display={toggleRow} onClickDelete={handleDeleteCategory} />
			</Table.Row>
		</Table.Header>
	);
};

export default TableHeader;
