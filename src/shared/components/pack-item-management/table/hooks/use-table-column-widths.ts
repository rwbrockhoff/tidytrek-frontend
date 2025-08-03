import { useMemo } from 'react';
import { usePackPricing } from '@/hooks/pack/use-pack-pricing';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';

export const useTableColumnWidths = () => {
	const showPrices = usePackPricing() || false;
	const { isCreator } = useUserPermissionsContext();

	return useMemo(() => {
		// Fixed columns that always exist
		const fixedWidth = 8 + 10; // qty + weight = 18%
		const conditionalWidth = (showPrices ? 12 : 0) + (isCreator ? 10 : 0); // price + actions
		const propertiesWidth = 10;

		// Remaining width for the two main columns (item + description)
		const remainingWidth = 100 - fixedWidth - conditionalWidth - propertiesWidth;
		// Give item name cell 5% more than description cell
		const itemNameWidth = remainingWidth / 2 + 5;
		const descriptionWidth = remainingWidth / 2 - 5;

		const widths = {
			itemName: `${itemNameWidth}%`,
			description: `${descriptionWidth}%`,
			properties: '10%',
			qty: '8%',
			weight: '10%',
			price: '12%',
			actions: '10%',
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