import { useState } from 'react';
import styles from './category-name-cell.module.css';
import { type HeaderInfo } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { Flex } from '@/components/layout';
import { TextField, Table } from '@/components/alpine';
import { ThemeButton } from '../theme-button/theme-button';
import { GripButton } from '@/shared/components/pack-item-management/table';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { useEditPackCategoryMutation } from '@/queries/pack-queries';
import hoverStyles from '@/shared/components/pack-item-management/table/hover-styles.module.css';
import { cn, mx } from '@/styles/utils';

type CategoryNameCellProps = {
	categoryHeaderInfo: HeaderInfo;
	disabled: boolean;
	dragProps: object;
};

export const CategoryNameCell = (props: CategoryNameCellProps) => {
	const userView = useUserContext();
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
			<div className={hoverStyles.showOnHoverAbsolute}>
				<GripButton testId="pack-category-grip" {...dragProps} />
			</div>

			<Flex className="items-center">
				<ThemeButton
					paletteColor={packCategoryColor}
					disabled={!userView}
					onClick={handleChangeColor}
				/>
				<TextField.Standalone
					className={cn(styles.headerCellInput, mx.textEllipsis)}
					value={packCategoryName}
					name="packCategoryName"
					placeholder={userView ? 'Category' : ''}
					variant="minimal"
					onChange={handleInput}
					onBlur={userView ? handleBlur : undefined}
					disabled={disabled || !userView}
				/>
			</Flex>
		</Table.HeaderCell>
	);
};
