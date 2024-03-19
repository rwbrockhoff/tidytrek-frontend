import { useState } from 'react';
import styled, { css } from 'styled-components';
import { type InputEvent } from '@/types/form-types';
import { Flex, Heading, Table, TextFieldInput } from '@radix-ui/themes';
import { ThemeButton, GripButton } from '../table-buttons';
import { useUserContext } from '@/hooks/use-viewer-context';
import {
	usePackCategoryHandlers,
	type HeaderInfo,
} from '@/features/dashboard/handlers/use-pack-category-handlers';

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
				<Flex>
					<ThemeButton color={packCategoryColor} onClick={handleChangeColor} />
					<Input
						size="3"
						value={packCategoryName || 'Category'}
						name="packCategoryName"
						onChange={handleInput}
						disabled={!userView}
						// Show input background when user interacts
						$displayInput={displayInput}
					/>
				</Flex>
			) : (
				<Heading size="4" ml="2">
					{packCategoryName}
				</Heading>
			)}
		</HeaderCell>
	);
};

const HeaderCell = styled(Table.ColumnHeaderCell)`
	position: relative;
	overflow: visible;
	${({ theme: t }) =>
		t.mx.mobile(`
			display: inline-flex;
			flex: 1;
		`)}
`;

const Input = styled(TextFieldInput)<{ $displayInput: boolean }>`
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
`;
