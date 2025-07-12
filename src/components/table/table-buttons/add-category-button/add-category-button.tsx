import { Button } from '@/components/alpine';
import { PlusIcon } from '@/components/icons';

export const AddCategoryButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button variant="outline" size="md" onClick={onClick} iconLeft={<PlusIcon />}>
			Add Category
		</Button>
	);
};
