import { Table, Input } from 'semantic-ui-react';
import { useState } from 'react';
import '../TableCell/TableCell.css';
import './CategoryNameCell.css';

type CategoryNameCellProps = {
	size: number;
	categoryName: string;
	onToggleOff: (packCategoryName: string) => void;
};

const CategoryNameCell = (props: CategoryNameCellProps) => {
	const { size, onToggleOff, categoryName } = props;
	const [packCategoryName, setPackCategoryName] = useState(categoryName);
	const [toggleInput, setToggleInput] = useState(false);

	const toggleToEdit = () => !toggleInput && setToggleInput(true);

	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			if (props.categoryName !== packCategoryName) {
				onToggleOff(packCategoryName);
			}
		}
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPackCategoryName(e.target.value);
	};
	return (
		<Table.HeaderCell
			colSpan={size}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<Input
				className="table-cell-input header-title"
				value={packCategoryName || 'Category'}
				name={'packCategoryName'}
				onChange={handleInput}
				// Show input background when user interacts
				transparent={!toggleInput}
				style={{
					fontSize: '1.2em',
					width: 'fit-content',
					paddingLeft: !toggleInput ? '15px' : '0px',
				}}
			/>
		</Table.HeaderCell>
	);
};

export default CategoryNameCell;
