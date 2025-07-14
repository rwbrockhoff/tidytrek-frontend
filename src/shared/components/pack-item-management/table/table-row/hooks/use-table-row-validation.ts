import { z, quantitySchema, weightSchema, priceSchema } from '@/schemas';
import { type BaseTableRowItem } from '@/types/pack-types';

const packItemSchema = z.object({
	packItemWeight: weightSchema,
	packItemQuantity: quantitySchema,
	packItemPrice: priceSchema,
});

export const useTableRowValidation = () => {
	const validatePackItem = (packItem: BaseTableRowItem) => {
		const data = packItemSchema.safeParse(packItem);
		
		if (!data.success) {
			const result = JSON.parse(data.error.message);
			return { isValid: false, errors: result };
		}
		
		return { isValid: true, errors: null };
	};

	return { validatePackItem };
};