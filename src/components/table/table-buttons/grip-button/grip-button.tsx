import { Flex } from '@radix-ui/themes';
import { cn } from '@/styles/utils';
import { GripIcon } from '@/components/icons';
import styles from './grip-button.module.css';

export const GripButton = ({
	display,
	testId = 'grip-button',
	...props
}: {
	display: boolean;
	testId?: string;
}) => {
	return (
		<Flex
			align="center"
			justify="center"
			className={cn(styles.gripContainer, display && styles.gripContainerVisible)}
			data-testid={testId}
			{...props}>
			<GripIcon className="lucide-sm" />
		</Flex>
	);
};
