import { tablePackItemSchema } from '@/schemas/pack-schemas';
import { type BaseTableRowItem } from '@/types/pack-types';
import { extractValidationErrors } from '@/utils/error-utils';

export const useTableRowValidation = () => {
	const validatePackItem = (packItem: BaseTableRowItem) => {
		const data = tablePackItemSchema.safeParse(packItem);

		if (!data.success) {
			const errors = extractValidationErrors(data.error);
			return { isValid: false, errors };
		}

		return { isValid: true, errors: null };
	};

	return { validatePackItem };
};
