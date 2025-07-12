import { Button } from '@/components/ui/alpine';
import { PlusIcon } from '@/components/ui';

export const AddCategoryButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button variant="outline" size="md" onClick={onClick} iconLeft={<PlusIcon />}>
			Add Category
		</Button>
	);
};