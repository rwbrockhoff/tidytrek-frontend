import { Button } from '@/components/alpine';
import { PlusIcon } from '@/components/icons';

export const AddCategoryButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button
			variant="outline"
			color="secondary"
			size="md"
			onClick={onClick}
			iconLeft={<PlusIcon />}>
			Add Category
		</Button>
	);
};
