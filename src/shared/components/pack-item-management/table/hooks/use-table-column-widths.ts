import { useMemo } from 'react';
import { usePackPricing } from '@/hooks/pack/use-pack-pricing';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';

export const useTableColumnWidths = () => {
	const showPrices = usePackPricing() || false;
	const { isCreator } = useUserPermissionsContext();

	return useMemo(() => {
		// Column widths - adjust based on pricing and user type
		const qtyWidth = 8;

		// Guest view with prices: weight smaller, price bigger
		// Guest view without prices: weight normal
		// Creator view: weight normal
		const weightWidth = !isCreator && showPrices ? 10 : showPrices ? 14 : 15;
		const priceWidth = !isCreator && showPrices ? 16 : 12;
		const actionsWidth = 5;

		// When price is hidden, distribute the 12% between weight (+3%), properties (+3%), and description (+6%)
		const propertiesWidth = showPrices ? 12 : 15;

		const fixedWidth = qtyWidth + weightWidth;
		const conditionalWidth =
			(showPrices ? priceWidth : 0) + (isCreator ? actionsWidth : 0);

		// Remaining width for the two main columns (item + description)
		const remainingWidth = 100 - fixedWidth - conditionalWidth - propertiesWidth;

		// Give item name cell 5% more than description cell
		const itemNameWidth = remainingWidth / 2 + 5;
		const descriptionWidth = remainingWidth / 2 - 5;

		const widths = {
			itemName: `${itemNameWidth}%`,
			description: `${descriptionWidth}%`,
			properties: `${propertiesWidth}%`,
			qty: `${qtyWidth}%`,
			weight: `${weightWidth}%`,
			price: `${priceWidth}%`,
			actions: `${actionsWidth}%`,
		};

		// Also calculate column counts for footer
		const totalColumns = 5 + (showPrices ? 1 : 0) + (isCreator ? 1 : 0);

		return {
			widths,
			totalColumns,
			showPrices,
			isCreator,
		};
	}, [showPrices, isCreator]);
};
