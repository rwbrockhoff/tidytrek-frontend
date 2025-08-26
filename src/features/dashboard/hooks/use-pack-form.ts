import { useState } from 'react';
import { type InputEvent, type TextAreaEvent, type FormError } from '@/types/form-types';
import { type Pack } from '@/types/pack-types';
import { type PaletteName } from '@/styles/palette/palette-constants';
import { normalizeURL } from '@/utils/link-utils';
import { useEditPackMutation } from '@/queries/pack-queries';
import { useZodError, clearZodErrors } from '@/hooks/form/use-zod-error';
import { z } from 'zod';
import { packFormSchema } from '@/schemas/pack-schemas';
import { extractErrorMessage } from '@/utils/error-utils';

type Checkboxes = {
	packAffiliate?: boolean;
	packPublic?: boolean;
	packPricing?: boolean;
};

type PackFormInputs = z.infer<typeof packFormSchema>;

/**
 * Handles pack form state, validation, and submission.
 * Includes form changes, checkbox updates, and Zod validation with error handling.
 *
 * @param pack - Initial pack data for form
 * @returns Form state, handlers, validation errors, and submission function
 */

export const usePackForm = (pack: Pack) => {
	const { mutateAsync: editPack } = useEditPackMutation();

	const [packChanged, setPackChanged] = useState(false);
	const [modifiedPack, setModifiedPack] = useState<Pack>(pack);
	const [serverError, setServerError] = useState<FormError>({ error: false, message: '' });

	const { formErrors, updateFormErrors, resetFormErrors } = useZodError<PackFormInputs>([
		'packName',
		'packDescription',
		'packUrlName',
		'packUrl',
		'packAffiliateDescription',
		'packLocationTag',
		'packDurationTag',
		'packSeasonTag',
		'packDistanceTag',
	]);

	const handleClearErrors = (e: InputEvent | TextAreaEvent) => {
		clearZodErrors<PackFormInputs>(e, formErrors as Record<keyof PackFormInputs, FormError>, resetFormErrors);
		setServerError({ error: false, message: '' });
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

	const handleSubmitPack = async () => {
		if (packChanged) {
			const result = packFormSchema.safeParse(modifiedPack);
			if (!result.success) {
				const errors = JSON.parse(result.error.message);
				updateFormErrors(errors);
				return false;
			}

			try {
				const { packId } = pack;
				const { packUrl } = modifiedPack;
				const cleanUrl = normalizeURL(packUrl);
				await editPack({ packId, modifiedPack: { ...modifiedPack, packUrl: cleanUrl } });
				setServerError({ error: false, message: '' });
				return true;
			} catch (error) {
				const errorMessage = extractErrorMessage(error) || 'Failed to save pack';
				setServerError({ error: true, message: errorMessage });
				return false;
			}
		}
		return true;
	};

	const resetForm = () => {
		setModifiedPack(pack);
		setPackChanged(false);
		resetFormErrors();
		setServerError({ error: false, message: '' });
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
		serverError,
	};
};
