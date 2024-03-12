import {
	Table as SemTable,
	Input as SemInput,
	Header as SemHeader,
} from 'semantic-ui-react';
import { ThemeButton } from '../table-buttons/theme-button';
import { GripButton } from '../table-buttons/table-buttons';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { type InputEvent } from '../../../types/formTypes';
import { type HeaderInfo } from '../../../features/dashboard/handlers/usePackCategoryHandlers';
import { useUserContext } from '../../../features/dashboard/hooks/useViewerContext';
import { usePackCategoryHandlers } from '../../../features/dashboard/handlers/usePackCategoryHandlers';

type CategoryNameCellProps = {
	categoryHeaderInfo: HeaderInfo;
	size: number;
	disabled: boolean;
};

export const CategoryNameCell = (props: CategoryNameCellProps) => {
	const userView = useUserContext();
	const { editCategory } = usePackCategoryHandlers().handlers;

	const { size, disabled, categoryHeaderInfo } = props;
	const {
		packCategoryName: categoryName,
		packCategoryColor,
		packCategoryId,
	} = categoryHeaderInfo;

	const [packCategoryName, setPackCategoryName] = useState(categoryName);
	const [toggleInput, setToggleInput] = useState(false);
	const [showGrip, setShowGrip] = useState(false);

	const toggleToEdit = () => !toggleInput && setToggleInput(true);

	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			if (categoryName !== packCategoryName) {
				editCategory({ packCategoryName, packCategoryId });
			}
		}
	};

	const handleChangeColor = (packCategoryColor: string) =>
		editCategory({ packCategoryColor, packCategoryId });

	const handleOnMouseOver = () => {
		if (!disabled && userView) toggleToEdit();
		setShowGrip(true);
	};

	const handleOnMouseLeave = () => {
		if (!disabled && userView) toggleToCell();
		setShowGrip(false);
	};

	const handleInput = (e: InputEvent) => setPackCategoryName(e.target.value);

	const displayInput = !toggleInput || !userView;

	return (
		<HeaderCell
			colSpan={size}
			onMouseOver={handleOnMouseOver}
			onMouseLeave={handleOnMouseLeave}
			onBlur={!disabled ? toggleToCell : undefined}
			onClick={!disabled ? toggleToEdit : undefined}>
			<GripButton display={showGrip && userView} />

			{userView ? (
				<Input
					value={packCategoryName || 'Category'}
					name="packCategoryName"
					onChange={handleInput}
					disabled={!userView}
					// Show input background when user interacts
					$displayInput={displayInput}>
					<ThemeButton color={packCategoryColor} onClick={handleChangeColor} />
					<input />
				</Input>
			) : (
				<Header>{packCategoryName}</Header>
			)}
		</HeaderCell>
	);
};

const HeaderCell = styled(SemTable.HeaderCell)`
	&&& {
		position: relative;
		overflow: visible;
		${({ theme: t }) =>
			t.mx.mobile(`
			display: inline-flex;
			flex: 1;
		`)}
	}
`;

const Input = styled(SemInput)`
	&&& {
		font-size: 1.2em;
		height: 30px;
		input {
			padding-left: 0.5em;
		}
		${({ theme: t }) =>
			t.mx.mobile(`
			height: 40px;
			font-size: 1.3em;
		`)}
		${(props) =>
			props.$displayInput &&
			css`
				input {
					border-color: transparent;
					background-color: transparent;
					box-shadow: none;
					border-radius: 0;
				}
			`};
	}
`;

const Header = styled(SemHeader)`
	margin-left: 15px;
	opacity: 0.8;
`;
