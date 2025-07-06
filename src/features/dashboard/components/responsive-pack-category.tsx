import { type PackListItem, type Category } from '@/types/pack-types';
import { useCheckScreen } from '@/hooks/use-check-screen';
import { PackCategory } from './pack-category';
import { PackCategoryCards } from './pack-category-cards';

type ResponsivePackCategoryProps = {
	category: Category;
	packList: PackListItem[];
	index: number;
};

export const ResponsivePackCategory = ({ category, packList, index }: ResponsivePackCategoryProps) => {
	const { isMobile } = useCheckScreen();

	if (isMobile) {
		return <PackCategoryCards category={category} packList={packList} index={index} />;
	}

	return <PackCategory category={category} packList={packList} index={index} />;
};