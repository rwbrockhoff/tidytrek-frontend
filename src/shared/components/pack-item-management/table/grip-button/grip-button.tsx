import { Flex } from '@/components/layout';
import { cn } from '@/styles/utils';
import { GripIcon } from '@/components/icons';
import styles from './grip-button.module.css';
import hoverStyles from '../hover-styles.module.css';

export const GripButton = ({
	testId = 'grip-button',
	...props
}: {
	testId?: string;
}) => {
	return (
		<Flex
			className={cn(styles.gripContainer, hoverStyles.showOnHoverAbsolute, 'items-center justify-center')}
			data-testid={testId}
			{...props}>
			<GripIcon className="lucide-sm" />
		</Flex>
	);
};
