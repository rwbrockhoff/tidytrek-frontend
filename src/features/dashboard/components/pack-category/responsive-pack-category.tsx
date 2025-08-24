import { type PackListItem, type Category } from '@/types/pack-types';
import { useScreen } from '@/hooks/ui/use-screen';
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
	const { isMobile } = useScreen();

	if (isMobile) {
		return <PackCategoryCard category={category} packList={packList} />;
	}

	return <PackCategory category={category} packList={packList} />;
};
