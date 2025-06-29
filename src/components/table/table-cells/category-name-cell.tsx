import { useState } from 'react';
import styles from './category-name-cell.module.css';
import { type HeaderInfo } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { Flex, Table } from '@radix-ui/themes';
import { TextField } from '@/components/ui/alpine';
import { ThemeButton, GripButton } from '../table-buttons';
import { useUserContext } from '@/hooks/use-viewer-context';
import { usePackCategoryActions } from '../../../features/dashboard/hooks/use-pack-category-actions';

type CategoryNameCellProps = {
	categoryHeaderInfo: HeaderInfo;
	disabled: boolean;
	dragProps: object;
};

export const CategoryNameCell = (props: CategoryNameCellProps) => {
	const userView = useUserContext();
	const { editPackCategory } = usePackCategoryActions();

	const { disabled, categoryHeaderInfo, dragProps } = props;

	const {
		packCategoryName: categoryName,
		packCategoryColor,
		packCategoryId,
	} = categoryHeaderInfo;

	const [packCategoryName, setPackCategoryName] = useState(categoryName);
	const [showGrip, setShowGrip] = useState(false);

	const handleBlur = () => {
		if (categoryName !== packCategoryName) {
			editPackCategory({ packCategoryName, packCategoryId });
		}
	};

	const handleChangeColor = (packCategoryColor: string) =>
		editPackCategory({ packCategoryColor, packCategoryId });

	const handleOnMouseOver = () => {
		setShowGrip(true);
	};

	const handleOnMouseLeave = () => {
		setShowGrip(false);
	};

	const handleInput = (e: InputEvent) => setPackCategoryName(e.target.value);

	return (
		<Table.ColumnHeaderCell
			className={styles.headerCell}
			onMouseOver={handleOnMouseOver}
			onMouseLeave={handleOnMouseLeave}>
			<GripButton
				display={showGrip && userView}
				testId="pack-category-grip"
				{...dragProps}
			/>

			<Flex align="center">
				<ThemeButton color={packCategoryColor} onClick={handleChangeColor} />
				<TextField.Standalone
					className={styles.input}
					value={packCategoryName}
					name="packCategoryName"
					placeholder={userView ? 'Category' : ''}
					variant="minimal"
					onChange={handleInput}
					onBlur={userView ? handleBlur : undefined}
					disabled={disabled || !userView}
				/>
			</Flex>
		</Table.ColumnHeaderCell>
	);
};
