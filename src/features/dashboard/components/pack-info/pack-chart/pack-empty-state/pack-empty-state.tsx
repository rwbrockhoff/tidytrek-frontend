import { Flex, Text } from '@radix-ui/themes';
import { cn, mx } from '@/styles/utils';
import { DownArrowIcon } from '@/components/ui';
import CampGraphic from '@/assets/camping.svg';
import styles from './pack-empty-state.module.css';

export const PackEmptyState = () => {
	return (
		<Flex
			align="center"
			justify="end"
			className={cn(styles.graphicPanel, mx.mobileHidden, mx.responsiveContent)}>
			<Flex direction="column" height="auto">
				<img src={CampGraphic} alt="Camping illustration" />
				<Flex justify="center" align="center">
					<DownArrowIcon />
					<Text>Add items below to get started</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};