import { useMemo } from 'react';
import { usePricingContext } from '@/hooks/auth/use-pricing-context';
import { useUserContext } from '@/hooks/auth/use-user-context';

export const useTableColumnWidths = () => {
	const showPrices = usePricingContext() || false;
	const isUser = useUserContext();

	return useMemo(() => {
		// Fixed columns that always exist
		const fixedWidth = 8 + 10; // qty + weight = 18%
		const conditionalWidth = (showPrices ? 12 : 0) + (isUser ? 10 : 0); // price + actions
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
		const totalColumns = 5 + (showPrices ? 1 : 0) + (isUser ? 1 : 0);

		return {
			widths,
			totalColumns,
			showPrices,
			isUser,
		};
	}, [showPrices, isUser]);
};