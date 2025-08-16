import { type PackListItem, type Category } from '@/types/pack-types';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { PackCategory } from './pack-category';
import { PackCategoryCard } from './pack-category-card/pack-category-card';

type ResponsivePackCategoryProps = {
	category: Category;
	packList: PackListItem[];
};

export const ResponsivePackCategory = ({
	category,
	packList,
}: ResponsivePackCategoryProps) => {
	const { isMobile } = useCheckScreen();

	if (isMobile) {
		return <PackCategoryCard category={category} packList={packList} />;
	}

	return <PackCategory category={category} packList={packList} />;
};
