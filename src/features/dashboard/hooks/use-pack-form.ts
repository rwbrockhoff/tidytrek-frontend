import { useState } from 'react';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { type Pack } from '@/types/pack-types';
import { type PaletteName } from '@/styles/palette/palette-constants';
import { normalizeURL } from '@/utils/link-utils';
import { useEditPackMutation } from '@/queries/pack-queries';
import { useZodError, clearZodErrors } from '@/hooks/form/use-zod-error';
import { packNameSchema } from '@/schemas/zod-schemas';
import { z } from 'zod';

type Checkboxes = {
	packAffiliate?: boolean;
	packPublic?: boolean;
	packPricing?: boolean;
};

const packFormSchema = z.object({
	packName: packNameSchema,
});

type PackFormInputs = z.infer<typeof packFormSchema>;

/**
 * Handles pack form state, validation, and submission.
 * Includes form changes, checkbox updates, and Zod validation with error handling.
 *
 * @param pack - Initial pack data for form
 * @returns Form state, handlers, validation errors, and submission function
 */
export const usePackForm = (pack: Pack) => {
	const { mutate: editPack } = useEditPackMutation();

	const [packChanged, setPackChanged] = useState(false);
	const [modifiedPack, setModifiedPack] = useState<Pack>(pack);

	const { formErrors, updateFormErrors, resetFormErrors } = useZodError<PackFormInputs>([
		'packName',
	]);

	const handleClearErrors = (e: InputEvent | TextAreaEvent) => {
		clearZodErrors<PackFormInputs>(e, formErrors, resetFormErrors);
	};

	const handleFormChange = (e: InputEvent | TextAreaEvent) => {
		setModifiedPack((prevFormData) => ({
			...prevFormData,
			[e?.target?.name]: e?.target?.value,
		}));
		// Clear validation errors when user starts typing
		handleClearErrors(e);
		if (!packChanged) setPackChanged(true);
	};

	const handleCheckBox = (updatedCheckbox: Checkboxes) => {
		setModifiedPack((prev) => ({
			...prev,
			...updatedCheckbox,
		}));
		if (!packChanged) setPackChanged(true);
	};

	const handlePaletteChange = (palette: PaletteName) => {
		setModifiedPack((prev) => ({
			...prev,
			palette,
		}));
		if (!packChanged) setPackChanged(true);
	};

	const handleSubmitPack = () => {
		if (packChanged) {
			// Validate pack form before submitting
			const result = packFormSchema.safeParse(modifiedPack);
			if (!result.success) {
				const errors = JSON.parse(result.error.message);
				updateFormErrors(errors);
				return false; // Validation failed
			}

			const { packId } = pack;
			const { packUrl } = modifiedPack;
			const cleanUrl = normalizeURL(packUrl);
			editPack({ packId, modifiedPack: { ...modifiedPack, packUrl: cleanUrl } });
			return true; // Success
		}
		return true; // No changes, can close
	};

	const resetForm = () => {
		setModifiedPack(pack);
		setPackChanged(false);
		resetFormErrors();
	};

	return {
		modifiedPack,
		packChanged,
		handleFormChange,
		handleCheckBox,
		handlePaletteChange,
		handleSubmitPack,
		resetForm,
		formErrors,
	};
};
