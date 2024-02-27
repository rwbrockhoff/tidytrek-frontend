import { useMemo } from 'react';
import { Category, PackListItem } from '../../../../types/packTypes';

const usePackDropdown = (
	availablePacks: PackListItem[],
	availableCategories: Category[],
) =>
	useMemo(() => {
		const categoryList = availableCategories.map((item) => ({
			key: item?.packCategoryId,
			value: item?.packCategoryId,
			text: item?.packCategoryName,
		}));

		const packList = availablePacks.map((item) => ({
			key: item.packId,
			value: item.packId,
			text: item.packName,
		}));

		return { packList, categoryList };
	}, [availablePacks, availableCategories]);

export default usePackDropdown;
