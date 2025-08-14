import { type KeyboardEvent, type RefObject } from 'react';
import { usePackPricing } from '@/hooks/pack/use-pack-pricing';

type TableField =
	| 'packItemName'
	| 'packItemDescription'
	| 'packItemQuantity'
	| 'packItemWeight'
	| 'packItemPrice';

type UseTableNavigationProps = {
	onSave: () => void;
	rowRef?: RefObject<HTMLElement>;
};

export const useTableNavigation = ({ onSave, rowRef }: UseTableNavigationProps) => {
	const showPrices = usePackPricing();
	const getFieldOrder = (): TableField[] => {
		const baseFields: TableField[] = [
			'packItemName',
			'packItemDescription',
			'packItemQuantity',
			'packItemWeight',
		];

		if (showPrices) {
			baseFields.push('packItemPrice');
		}

		return baseFields;
	};

	const focusNextField = (currentField: TableField) => {
		const fieldOrder = getFieldOrder();
		const currentIndex = fieldOrder.indexOf(currentField);
		const nextIndex = currentIndex + 1;

		if (nextIndex >= fieldOrder.length) {
			// Last field - save the row
			onSave();
			return;
		}

		// Focus next field within the same row
		const nextField = fieldOrder[nextIndex];
		const container = rowRef?.current || document;
		const nextInput = container.querySelector(
			`input[name="${nextField}"], textarea[name="${nextField}"]`,
		) as HTMLElement;

		if (nextInput) {
			nextInput.focus();
		}
	};

	const handleKeyDown = (e: KeyboardEvent, fieldName: TableField) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			focusNextField(fieldName);
		}
	};

	return { handleKeyDown };
};
