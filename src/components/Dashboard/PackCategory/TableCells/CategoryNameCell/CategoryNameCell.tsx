import { Table, Input, Header } from 'semantic-ui-react';
import ThemeButton from '../../TableButtons/ThemeButton/ThemeButton';
import { GripButton } from '../../TableButtons/TableButtons';
import { useState } from 'react';
import '../TableCell/TableCell.css';
import './CategoryNameCell.css';
import { ReactInput } from '../../../../../types/generalTypes';
import { useUserContext } from '../../../../../views/Dashboard/useUserContext';

type CategoryNameCellProps = {
	categoryName: string;
	categoryColor: string;
	size: number;
	disabled: boolean;
	onToggleOff: (packCategoryName: string) => void;
};

const CategoryNameCell = (props: CategoryNameCellProps) => {
	const userView = useUserContext();

	const { size, disabled, onToggleOff, categoryName, categoryColor } = props;

	const [packCategoryName, setPackCategoryName] = useState(categoryName);
	const [toggleInput, setToggleInput] = useState(false);
	const [showGrip, setShowGrip] = useState(false);

	const toggleToEdit = () => !toggleInput && setToggleInput(true);

	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			if (categoryName !== packCategoryName) {
				onToggleOff(packCategoryName);
			}
		}
	};

	const handleOnMouseOver = () => {
		if (!disabled && userView) toggleToEdit();
		setShowGrip(true);
	};

	const handleOnMouseLeave = () => {
		if (!disabled && userView) toggleToCell();
		setShowGrip(false);
	};

	const handleInput = (e: ReactInput) => setPackCategoryName(e.target.value);

	const display = !toggleInput || !userView;
	return (
		<Table.HeaderCell
			className="table-header-cell"
			colSpan={size}
			onMouseOver={handleOnMouseOver}
			onMouseLeave={handleOnMouseLeave}
			onBlur={!disabled ? toggleToCell : undefined}
			onClick={!disabled ? toggleToEdit : undefined}>
			<GripButton display={showGrip && userView} />

			{userView ? (
				<>
					<Input
						className="table-cell-input header-title"
						value={packCategoryName || 'Category'}
						name={'packCategoryName'}
						onChange={handleInput}
						disabled={!userView}
						// Show input background when user interacts
						transparent={display}
						style={{
							fontSize: '1.2em',
							width: 'fit-content',
							paddingLeft: display ? '0px' : '0px',
						}}>
						<ThemeButton color={categoryColor} />
						<input />
					</Input>
				</>
			) : (
				<Header className="header-title">{packCategoryName}</Header>
			)}
		</Table.HeaderCell>
	);
};

export default CategoryNameCell;
