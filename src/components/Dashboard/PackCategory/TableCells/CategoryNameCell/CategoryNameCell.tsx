import { Table, Input } from 'semantic-ui-react';
import { GripButton } from '../../TableButtons/TableButtons';
import { useState } from 'react';
import '../TableCell/TableCell.css';
import './CategoryNameCell.css';
import { ReactInput } from '../../../../../types/generalTypes';

type CategoryNameCellProps = {
	size: number;
	disabled: boolean;
	categoryName: string;
	onToggleOff: (packCategoryName: string) => void;
};

const CategoryNameCell = (props: CategoryNameCellProps) => {
	const { size, disabled, onToggleOff, categoryName } = props;
	const [packCategoryName, setPackCategoryName] = useState(categoryName);
	const [toggleInput, setToggleInput] = useState(false);
	const [showGrip, setShowGrip] = useState(false);

	const toggleToEdit = () => !toggleInput && setToggleInput(true);

	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			if (props.categoryName !== packCategoryName) {
				onToggleOff(packCategoryName);
			}
		}
	};

	const handleOnMouseOver = () => {
		if (!disabled) toggleToEdit();
		setShowGrip(true);
	};

	const handleOnMouseLeave = () => {
		if (!disabled) toggleToCell();
		setShowGrip(false);
	};

	const handleInput = (e: ReactInput) => setPackCategoryName(e.target.value);

	return (
		<Table.HeaderCell
			className="table-header-cell"
			colSpan={size}
			onMouseOver={handleOnMouseOver}
			onMouseLeave={handleOnMouseLeave}
			onBlur={!disabled ? toggleToCell : undefined}
			onClick={!disabled ? toggleToEdit : undefined}>
			<GripButton display={showGrip} />

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
