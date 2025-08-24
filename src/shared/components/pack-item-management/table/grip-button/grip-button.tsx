import { Flex } from '@/components/layout';
import { cn } from '@/styles/utils';
import { GripIcon } from '@/components/icons';
import styles from './grip-button.module.css';
import hoverStyles from '../hover-styles.module.css';
import { useDndContext } from '@dnd-kit/core';

export const GripButton = ({
	testId = 'grip-button',
	disabled = false,
	...props
}: {
	testId?: string;
	disabled?: boolean;
}) => {
	const { active } = useDndContext();
	const isAnyItemDragging = !!active;
	return (
		<Flex
			className={cn(
				styles.gripContainer, 
				!disabled && !isAnyItemDragging && hoverStyles.showOnHoverAbsolute, 
				'items-center justify-center'
			)}
			data-testid={testId}
			{...props}>
			<GripIcon className="lucide-sm" />
		</Flex>
	);
};
