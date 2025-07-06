import { useState, useCallback } from 'react';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { type Pack } from '@/types/pack-types';
import { cleanUpLink } from '@/utils/link-utils';
import { useEditPackMutation } from '@/queries/pack-queries';

type Checkboxes = {
	packAffiliate?: boolean;
	packPublic?: boolean;
	packPricing?: boolean;
};

export const usePackForm = (pack: Pack) => {
	const { mutate: editPack } = useEditPackMutation();
	
	const [packChanged, setPackChanged] = useState(false);
	const [modifiedPack, setModifiedPack] = useState<Pack>(pack);

	const handleFormChange = useCallback((e: InputEvent | TextAreaEvent) => {
		setModifiedPack((prevFormData) => ({
			...prevFormData,
			[e?.target?.name]: e?.target?.value,
		}));
		if (!packChanged) setPackChanged(true);
	}, [packChanged]);

	const handleCheckBox = useCallback((updatedCheckbox: Checkboxes) => {
		setModifiedPack((prev) => ({
			...prev,
			...updatedCheckbox,
		}));
		if (!packChanged) setPackChanged(true);
	}, [packChanged]);

	const handleSubmitPack = useCallback(() => {
		if (packChanged) {
			const { packId } = pack;
			const { packUrl } = modifiedPack;
			const cleanUrl = cleanUpLink(packUrl);
			editPack({ packId, modifiedPack: { ...modifiedPack, packUrl: cleanUrl } });
		}
	}, [packChanged, pack, modifiedPack, editPack]);

	const resetForm = useCallback(() => {
		setModifiedPack(pack);
		setPackChanged(false);
	}, [pack]);

	return {
		modifiedPack,
		packChanged,
		handleFormChange,
		handleCheckBox,
		handleSubmitPack,
		resetForm,
	};
};