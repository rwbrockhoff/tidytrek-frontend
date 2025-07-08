import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button, Heading, Select } from '@radix-ui/themes';
import { Root as FormRoot } from '@radix-ui/react-form';
import { TextField } from '@/components/ui/alpine';
import { SaveIcon, LeftDoubleChevronIcon } from '@/components/ui/icons';
import { PropertyButtons } from '@/components/ui/property-buttons/property-buttons';
import { useGetPackQuery } from '@/queries/pack-queries';
import mx from '@/styles/utils/mixins.module.css';
import {
	useEditPackItemMutation,
	useDeletePackItemMutation,
} from '@/queries/pack-queries';
import { Spinner } from '@/components/ui';
import { type PackItem } from '@/types/pack-types';
import { decodePackItemId, encode, convertCurrency } from '@/utils';
import { useToggle } from '@/hooks';
import styles from './pack-item-edit.module.css';

export const PackItemEdit = () => {
	const { packItemId } = useParams<{ packItemId: string }>();
	const location = useLocation();
	const navigate = useNavigate();
	const { packId, packCategoryId } = location.state || {};

	// decode/encode
	const decodedPackItemId = packItemId ? decodePackItemId(packItemId) : null;
	const encodedPackId = encode(packId);

	// mutations
	const { data: packData, isLoading, error } = useGetPackQuery(encodedPackId);
	const editItemMutation = useEditPackItemMutation();
	const deleteItemMutation = useDeletePackItemMutation();

	// Find packItem by id within query state pack
	const packItem = packData?.categories
		?.find((cat) => cat.packCategoryId === packCategoryId)
		?.packItems?.find((item) => item.packItemId === decodedPackItemId);

	const [formData, setFormData] = useState<PackItem | null>(packItem || null);
	const { isToggled: isPriceEditing, toggle: togglePriceEdit } = useToggle();

	// Update form data when pack item loads
	if (packItem && !formData) {
		setFormData(packItem);
	}

	const handleInputChange = (field: keyof PackItem, value: any) => {
		if (formData) {
			setFormData({ ...formData, [field]: value });
		}
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value) e.target.value = '0';
		e.target.value = e.target.value.replace(/[^0-9\.-]+/g, '');
		handleInputChange('packItemPrice', Number(e.target.value));
	};

	const handleWeightUnitChange = (unit: string) => {
		handleInputChange('packItemUnit', unit);
	};

	const handlePropertyChange = (property: any) => {
		if (formData) {
			setFormData({ ...formData, ...property });
		}
	};

	const handleSave = () => {
		if (formData && decodedPackItemId) {
			editItemMutation.mutate(
				{ packItemId: decodedPackItemId, packItem: formData },
				{
					onSuccess: () => {
						navigate(`/pack/${encodedPackId}`);
					},
				},
			);
		}
	};

	const handleDelete = () => {
		if (decodedPackItemId) {
			deleteItemMutation.mutate(decodedPackItemId, {
				onSuccess: () => {
					navigate(`/pack/${encodedPackId}`);
				},
			});
		}
	};

	const handleCancel = () => navigate(`/pack/${encodedPackId}`);

	if (isLoading) return <Spinner />;
	if (error || !packItem || !formData) return <div>Pack item not found</div>;

	return (
		<div className={styles.pageContainer}>
			<div className={styles.actionHeader}>
				<Button variant="ghost" color="gray" onClick={handleCancel}>
					<LeftDoubleChevronIcon />
					Back
				</Button>
			</div>
			<div className={styles.header}>
				<Heading size="6">Edit Pack Item</Heading>
			</div>

			<FormRoot className={styles.formContainer}>
				<TextField.Input
					name="packItemName"
					label="Item Name"
					value={formData.packItemName || ''}
					onChange={(e) => handleInputChange('packItemName', e.target.value)}
					placeholder="Enter item name"
				/>

				<TextField.Input
					name="packItemDescription"
					label="Description"
					value={formData.packItemDescription || ''}
					onChange={(e) => handleInputChange('packItemDescription', e.target.value)}
					placeholder="Enter description"
				/>

				<TextField.Input
					name="packItemUrl"
					label="Pack Item URL"
					value={formData.packItemUrl || ''}
					onChange={(e) => handleInputChange('packItemUrl', e.target.value)}
					placeholder="Enter link"
				/>

				<TextField.Input
					name="packItemQuantity"
					label="Quantity"
					type="number"
					value={formData.packItemQuantity || ''}
					onChange={(e) => handleInputChange('packItemQuantity', Number(e.target.value))}
					placeholder="1"
				/>

				<div className={styles.weightGroup}>
					<TextField.Input
						name="packItemWeight"
						label="Weight"
						type="number"
						step="0.1"
						value={formData.packItemWeight || ''}
						onChange={(e) => handleInputChange('packItemWeight', Number(e.target.value))}
						placeholder="0"
						width="70%"
					/>
					<div className={styles.weightUnit}>
						<label className={styles.unitLabel}>Unit</label>
						<Select.Root
							size="2"
							value={formData.packItemUnit || 'oz'}
							onValueChange={handleWeightUnitChange}>
							<Select.Trigger variant="surface" />
							<Select.Content style={{ height: 'fit-content' }}>
								<Select.Item value="oz">oz</Select.Item>
								<Select.Item value="lb">lb</Select.Item>
								<Select.Item value="g">g</Select.Item>
								<Select.Item value="kg">kg</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
				</div>

				<TextField.Input
					name="packItemPrice"
					label="Price"
					value={
						isPriceEditing
							? formData.packItemPrice === 0
								? ''
								: formData.packItemPrice?.toString() || ''
							: convertCurrency(formData.packItemPrice || 0, 'USD')
					}
					onChange={handlePriceChange}
					onFocus={() => !isPriceEditing && togglePriceEdit()}
					onBlur={() => isPriceEditing && togglePriceEdit()}
					placeholder="0"
				/>

				<div className={styles.propertiesSection}>
					<label id="properties-label" className={mx.visuallyHidden}>
						Pack Item Properties
					</label>
					<PropertyButtons
						wornWeight={formData.wornWeight || false}
						consumable={formData.consumable || false}
						favorite={formData.favorite || false}
						showAlways={true}
						onClick={handlePropertyChange}
						ariaLabelledBy="properties-label"
					/>
				</div>
			</FormRoot>

			<div className={styles.actionButtons}>
				<Button onClick={handleSave} size="3" disabled={editItemMutation.isPending}>
					<SaveIcon />
					Save Item
				</Button>

				<Button
					onClick={handleDelete}
					size="3"
					color="tomato"
					variant="outline"
					disabled={deleteItemMutation.isPending}>
					Delete Item
				</Button>
			</div>
		</div>
	);
};
