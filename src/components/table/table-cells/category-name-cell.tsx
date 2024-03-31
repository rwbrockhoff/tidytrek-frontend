import { useState } from 'react';
import styled from 'styled-components';
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
	disabled: boolean;
	dragProps: object;
};

export const CategoryNameCell = (props: CategoryNameCellProps) => {
	const userView = useUserContext();
	const { editCategory } = usePackCategoryHandlers().handlers;

	const { disabled, categoryHeaderInfo, dragProps } = props;

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

	return (
		<HeaderCell
			onMouseOver={handleOnMouseOver}
			onMouseLeave={handleOnMouseLeave}
			onBlur={!disabled ? toggleToCell : undefined}
			onClick={!disabled ? toggleToEdit : undefined}>
			<GripButton display={showGrip && userView} {...dragProps} />

			{userView ? (
				<Flex>
					<ThemeButton color={packCategoryColor} onClick={handleChangeColor} />
					<Input
						size="3"
						variant="soft"
						color="gray"
						value={packCategoryName}
						name="packCategoryName"
						placeholder="Category"
						onChange={handleInput}
						disabled={!userView}
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
			flex: 1;
			height: fit-content;
		`)}
`;

const Input = styled(TextFieldInput)`
	background-color: var(--gray-2) !important;
	font-weight: 500;
	${({ theme: t }) =>
		t.mx.mobile(`
			height: 40px;
			font-size: 1.3em;
		`)}
`;
