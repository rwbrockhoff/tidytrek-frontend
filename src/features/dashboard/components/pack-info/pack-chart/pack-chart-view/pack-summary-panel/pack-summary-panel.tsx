import styles from './pack-summary-panel.module.css';
import { cn } from '@/styles/utils';
import { Flex, Stack } from '@/components/layout';
import { Badge, Separator, HoverCard } from '@radix-ui/themes';
import { usePackPricing } from '@/hooks/pack/use-pack-pricing';
import { usePackContext } from '../../../../../hooks/use-pack-context';
import {
	ConsumableIcon,
	WeightIcon,
	WornIcon,
	MoneyIcon,
	BackpackIcon,
} from '@/components/icons';

type PackSummaryPanelProps = {
	totalWeight: number;
	descriptivePackWeight: { baseWeight: string; consumables: string; wornWeight: string };
	totalPackPrice: string | number;
};

export const PackSummaryPanel = (props: PackSummaryPanelProps) => {
	const { totalWeight, descriptivePackWeight, totalPackPrice } = props;
	const { baseWeight, consumables, wornWeight } = descriptivePackWeight;
	const showPrices = usePackPricing();
	const { weightUnit } = usePackContext();

	return (
		<>
			<HoverCard.Root>
				<HoverCard.Trigger>
					<Flex className={cn(styles.popupListItem, 'mt-2')} style={{ cursor: 'pointer' }}>
						<BackpackIcon /> Total Weight: <Badge ml="auto">{totalWeight} {weightUnit.base}</Badge>
					</Flex>
				</HoverCard.Trigger>
				<HoverCard.Content side="top">
					<Stack>
						<Flex className={cn(styles.popupListItem, 'my-2')}>
							<WeightIcon />
							Base Weight:
							<Badge ml="auto">{baseWeight}</Badge>
						</Flex>

						<Flex className={cn(styles.popupListItem, 'my-2')}>
							<ConsumableIcon />
							Consumables:
							<Badge ml="auto">{consumables}</Badge>
						</Flex>
						<Flex className={cn(styles.popupListItem, 'my-2')}>
							<WornIcon />
							Worn Weight:
							<Badge ml="auto">{wornWeight}</Badge>
						</Flex>

						<Separator size="4" mb="4" mt="2" />

						<Flex className={styles.popupListItem}>
							Total Weight:
							<Badge ml="auto">{totalWeight} {weightUnit.base}</Badge>
						</Flex>
				</Stack>
				</HoverCard.Content>
			</HoverCard.Root>

			{showPrices && (
				<Flex className={cn(styles.popupListItem, 'mt-2')}>
					<MoneyIcon /> Total Price:
					<Badge ml="auto">{totalPackPrice}</Badge>
				</Flex>
			)}
		</>
	);
};
