import { cn } from '@/styles/utils';
import { GripIcon } from '@/components/icons';
import { AccessibleButton } from '@/components/ui';
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
		<AccessibleButton
			className={cn(
				styles.gripContainer, 
				!disabled && !isAnyItemDragging && hoverStyles.showOnHoverAbsolute, 
				'items-center justify-center flex'
			)}
			data-testid={testId}
			disabled={disabled}
			aria-label="Drag to reorder"
			{...props}>
			<GripIcon className="lucide-sm" />
		</AccessibleButton>
	);
};
