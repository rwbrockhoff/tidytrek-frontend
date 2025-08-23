import { useState } from 'react';
import styles from './category-name-cell.module.css';
import { type HeaderInfo } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { type PaletteColor } from '@/styles/palette/palette-constants';
import { Flex } from '@/components/layout';
import { TextField, Table } from '@/components/alpine';
import { ThemeButton } from '../theme-button/theme-button';
import { GripButton } from '@/shared/components/pack-item-management/table';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useEditPackCategoryMutation } from '@/queries/pack-queries';
import hoverStyles from '@/shared/components/pack-item-management/table/hover-styles.module.css';
import { cn, mx } from '@/styles/utils';
import { packCategoryNameSchema } from '@/schemas/pack-schemas';
import { useFieldState } from '@/hooks/form/use-field-state';

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

	const { validationError, validate, clearErrors } = useFieldState({
		initialValue: categoryName || '',
		validator: (value: string) => {
			const result = packCategoryNameSchema.safeParse(value);
			if (!result.success) {
				throw new Error(result.error.errors[0]?.message || 'Invalid category name');
			}
			return result.success;
		},
	});

	const handleBlur = () => {
		if (categoryName !== packCategoryName) {
			const isValid = validate(packCategoryName);
			if (!isValid) return;

			editPackCategory({ packCategoryName, packCategoryId });
		}
	};

	const handleChangeColor = (packCategoryColor: PaletteColor) =>
		editPackCategory({ packCategoryColor, packCategoryId });

	const handleInput = (e: InputEvent) => {
		setPackCategoryName(e.target.value);
		clearErrors();
	};

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
						collapsibleError
						error={validationError}
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
