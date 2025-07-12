import { Flex, HoverCard, Text } from '@radix-ui/themes';
import { InfoIcon, TreeIcon } from '@/components/icons';
import styles from './tooltip.module.css';

export const Tooltip = ({ content }: { content: string }) => {
	return (
		<HoverCard.Root>
			<HoverCard.Trigger>
				<span className={styles.tooltipSpan}>
					<InfoIcon />
				</span>
			</HoverCard.Trigger>
			<HoverCard.Content style={{ maxWidth: 300 }} side="top">
				<Flex align="center">
					<TreeIcon size={40} />
					<Text ml="4">{content}</Text>
				</Flex>
			</HoverCard.Content>
		</HoverCard.Root>
	);
};
