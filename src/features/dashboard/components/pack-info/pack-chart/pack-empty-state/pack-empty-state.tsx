import { Flex, Stack } from '@/components/layout';
import { Text } from '@radix-ui/themes';
import { cn, mx } from '@/styles/utils';
import { DownArrowIcon } from '@/components/icons';
import CampGraphic from '@/assets/camping.svg';
import styles from './pack-empty-state.module.css';

export const PackEmptyState = () => {
	return (
		<Flex className={cn(styles.graphicPanel, mx.mobileHidden, 'items-center justify-end')}>
			<Stack className="h-auto items-center">
				<img src={CampGraphic} alt="Camping illustration" className={styles.campingImage} />
				<Flex className="justify-center items-center">
					<DownArrowIcon />
					<Text>Add items below to get started</Text>
				</Flex>
			</Stack>
		</Flex>
	);
};
