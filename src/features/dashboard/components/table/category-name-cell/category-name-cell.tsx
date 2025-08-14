import { useState } from 'react';
import styles from './category-name-cell.module.css';
import { type HeaderInfo } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { Flex } from '@/components/layout';
import { TextField, Table } from '@/components/alpine';
import { ThemeButton } from '../theme-button/theme-button';
import { GripButton } from '@/shared/components/pack-item-management/table';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useEditPackCategoryMutation } from '@/queries/pack-queries';
import hoverStyles from '@/shared/components/pack-item-management/table/hover-styles.module.css';
import { cn, mx } from '@/styles/utils';

type CategoryNameCellProps = {
	categoryHeaderInfo: HeaderInfo;
	disabled: boolean;
	dragProps: object;
};

export const CategoryNameCell = (props: CategoryNameCellProps) => {
	const { isCreator } = useUserPermissionsContext();
	const { mutate: editPackCategory } = useEditPackCategoryMutation();

	const { disabled, categoryHeaderInfo, dragProps } = props;

	const {
		packCategoryName: categoryName,
		packCategoryColor,
		packCategoryId,
	} = categoryHeaderInfo;

	const [packCategoryName, setPackCategoryName] = useState(categoryName);

	const handleBlur = () => {
		if (categoryName !== packCategoryName) {
			editPackCategory({ packCategoryName, packCategoryId });
		}
	};

	const handleChangeColor = (packCategoryColor: string) =>
		editPackCategory({ packCategoryColor, packCategoryId });

	const handleInput = (e: InputEvent) => setPackCategoryName(e.target.value);

	return (
		<Table.HeaderCell className={styles.headerCell}>
			<div className={cn(isCreator && hoverStyles.showOnHoverAbsolute)}>
				<GripButton testId="pack-category-grip" disabled={!isCreator} {...dragProps} />
			</div>

			<Flex className="items-center">
				<ThemeButton
					paletteColor={packCategoryColor}
					disabled={!isCreator}
					onClick={handleChangeColor}
				/>
				{isCreator ? (
					<TextField.Standalone
						className={cn(styles.headerCellInput, mx.textEllipsis)}
						value={packCategoryName}
						name="packCategoryName"
						placeholder="Category"
						variant="minimal"
						compact
						onChange={handleInput}
						onBlur={handleBlur}
						disabled={disabled}
					/>
				) : (
					<span className={cn(styles.headerCellText, mx.textEllipsis)}>
						{packCategoryName || 'Category'}
					</span>
				)}
			</Flex>
		</Table.HeaderCell>
	);
};
