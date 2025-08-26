import { Flex, Stack } from '@/components/layout';
import { Text } from '@radix-ui/themes';
import { cn, mx } from '@/styles/utils';
import { DownArrowIcon } from '@/components/icons';
import { useAuth } from '@/hooks/auth/use-auth';
import campGraphicDay from '@/assets/defaults/camping-graphic-day.svg';
import campGraphicNight from '@/assets/defaults/camping-graphic-night.svg';
import styles from './pack-empty-graphic.module.css';

export const PackEmptyGraphic = () => {
	const { settings } = useAuth();
	const isDarkMode = settings?.darkMode || false;
	const campGraphic = isDarkMode ? campGraphicNight : campGraphicDay;

	return (
		<Flex className={cn(styles.graphicPanel, mx.mobileHidden, 'items-start justify-end')}>
			<Stack className="h-auto items-center">
				<img
					src={campGraphic}
					alt="Camping illustration"
					className={styles.campingImage}
				/>
				<Flex className="justify-center items-center mt-2">
					<DownArrowIcon />
					<Text size="2">Add items below to get started</Text>
				</Flex>
			</Stack>
		</Flex>
	);
};
