import { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Heading } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { SaveIcon, BackArrow } from '@/components/icons';
import { useGetPackQuery } from '@/queries/pack-queries';
import { useGetGearClosetQuery } from '@/queries/closet-queries';
import { Spinner } from '@/components/primitives';
import { decodePackItemId } from '@/utils';
import { usePackItemEditForm } from '@/features/dashboard/hooks/use-pack-item-edit-form';
import { usePackItemEditActions } from '@/features/dashboard/hooks/use-pack-item-edit-actions';
import { PackItemEditForm } from '@/features/dashboard/components/pack-item-edit-form/pack-item-edit-form';
import { Box, Stack } from '@/components/layout';
import { mx } from '@/styles/utils';

export const PackItemEdit = () => {
	const { packItemId } = useParams<{ packItemId: string }>();
	const location = useLocation();
	const { packId, packCategoryId, gearCloset } = location.state || {};
	const decodedPackItemId = packItemId ? decodePackItemId(packItemId) : null;

	// Data fetching
	const {
		data: packData,
		isLoading: packLoading,
		error: packError,
	} = useGetPackQuery(packId);

	const {
		data: gearClosetData,
		isLoading: closetLoading,
		error: closetError,
	} = useGetGearClosetQuery();

	// Find packItem by id within query state pack or gear closet
	const packItem = useMemo(() => {
		return gearCloset
			? gearClosetData?.gearClosetList?.find(
					(item) => item.packItemId === decodedPackItemId,
				)
			: packData?.categories
					?.find((cat) => cat.packCategoryId === packCategoryId)
					?.packItems?.find((item) => item.packItemId === decodedPackItemId);
	}, [gearCloset, gearClosetData, packData, decodedPackItemId, packCategoryId]);

	const isLoading = gearCloset ? closetLoading : packLoading;
	const error = gearCloset ? closetError : packError;

	// Custom hooks for form and actions
	const {
		formData,
		formErrors,
		handleInputChange,
		handlePriceChange,
		handleWeightUnitChange,
		handlePropertyChange,
		getFormattedPrice,
		handlePriceFocus,
		handlePriceBlur,
	} = usePackItemEditForm({ initialItem: packItem || null });

	const {
		handleSave,
		handleDelete,
		handleCancel,
		isLoading: isSaving,
		isDeleting,
	} = usePackItemEditActions({
		packItemId: decodedPackItemId,
		packId,
		gearCloset: !!gearCloset,
	});

	const onSave = () => {
		if (formData) {
			handleSave(formData);
		}
	};

	if (isLoading) return <Spinner />;
	if (error || !packItem) return <div>Pack item not found</div>;
	if (!formData) return <Spinner />;

	return (
		<Box className="mx-auto">
			<Box className="mb-2">
				<Button variant="ghost" onClick={handleCancel} iconLeft={<BackArrow />}>
					Back
				</Button>
			</Box>
			<Box className={mx.textCenter}>
				<Heading size="6">Edit Item</Heading>
			</Box>

			<PackItemEditForm
				formData={formData}
				formErrors={formErrors}
				getFormattedPrice={getFormattedPrice}
				onInputChange={handleInputChange}
				onPriceChange={handlePriceChange}
				onWeightUnitChange={handleWeightUnitChange}
				onPropertyChange={handlePropertyChange}
				onPriceFocus={handlePriceFocus}
				onPriceBlur={handlePriceBlur}
			/>

			<Stack className="gap-4 mt-6">
				<Button onClick={onSave} disabled={isSaving}>
					<SaveIcon />
					Save Item
				</Button>

				<Button onClick={handleDelete} variant="danger" disabled={isDeleting}>
					Delete Item
				</Button>
			</Stack>
		</Box>
	);
};
