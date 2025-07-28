import { Root as FormRoot } from '@radix-ui/react-form';
import { Select } from '@radix-ui/themes';
import { TextField } from '@/components/alpine';
import { PropertyButtons } from '@/shared/components/pack-item-management/property-buttons';
import { type BaseTableRowItem, type PackItemProperty, WeightUnit } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import mx from '@/styles/utils/mixins.module.css';
import styles from './pack-item-edit-form.module.css';

type PackItemEditFormProps = {
	formData: BaseTableRowItem;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
	getFormattedPrice: () => string | number;
	onInputChange: (e: InputEvent) => void;
	onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onWeightUnitChange: (unit: WeightUnit) => void;
	onPropertyChange: (property: PackItemProperty) => void;
	onPriceFocus: () => void;
	onPriceBlur: () => void;
};

export const PackItemEditForm = ({
	formData,
	formErrors,
	getFormattedPrice,
	onInputChange,
	onPriceChange,
	onWeightUnitChange,
	onPropertyChange,
	onPriceFocus,
	onPriceBlur,
}: PackItemEditFormProps) => {
	return (
		<FormRoot className={styles.formContainer}>
			<TextField.Input
				name="packItemName"
				label="Item Name"
				value={formData.packItemName || ''}
				onChange={onInputChange}
				placeholder="Enter item name"
				error={formErrors?.packItemName}
			/>

			<TextField.Input
				name="packItemDescription"
				label="Description"
				value={formData.packItemDescription || ''}
				onChange={onInputChange}
				placeholder="Enter description"
			/>

			<TextField.Input
				name="packItemUrl"
				label="Pack Item URL"
				value={formData.packItemUrl || ''}
				onChange={onInputChange}
				placeholder="Enter link"
			/>

			<TextField.Input
				name="packItemQuantity"
				label="Quantity"
				type="number"
				value={formData.packItemQuantity || ''}
				onChange={onInputChange}
				placeholder="1"
				error={formErrors?.packItemQuantity}
			/>

			<div className={styles.weightGroup}>
				<TextField.Input
					name="packItemWeight"
					label="Weight"
					type="number"
					value={formData.packItemWeight || ''}
					onChange={onInputChange}
					placeholder="0"
					width="70%"
					error={formErrors?.packItemWeight}
				/>
				<div className={styles.weightUnit}>
					<label className={styles.unitLabel}>Unit</label>
					<Select.Root
						size="2"
						value={formData.packItemWeightUnit || WeightUnit.oz}
						onValueChange={onWeightUnitChange}>
						<Select.Trigger variant="surface" />
						<Select.Content>
							<Select.Item value={WeightUnit.oz}>oz</Select.Item>
							<Select.Item value={WeightUnit.lb}>lb</Select.Item>
							<Select.Item value={WeightUnit.g}>g</Select.Item>
							<Select.Item value={WeightUnit.kg}>kg</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			<TextField.Input
				name="packItemPrice"
				label="Price"
				value={getFormattedPrice()}
				onChange={onPriceChange}
				onFocus={onPriceFocus}
				onBlur={onPriceBlur}
				placeholder="0"
				error={formErrors?.packItemPrice}
			/>

			<div className={styles.propertiesSection}>
				<label id="properties-label" className={mx.visuallyHidden}>
					Pack Item Properties
				</label>
				<PropertyButtons
					wornWeight={formData.wornWeight || false}
					consumable={formData.consumable || false}
					favorite={formData.favorite || false}
					onClick={onPropertyChange}
					ariaLabelledBy="properties-label"
				/>
			</div>
		</FormRoot>
	);
};
