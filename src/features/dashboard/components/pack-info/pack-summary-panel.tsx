import styles from './pack-summary-panel.module.css';
import { Flex, Badge, Separator, HoverCard } from '@radix-ui/themes';
import { usePricingContext } from '@/hooks/auth/use-pricing-context';
import {
	ConsumableIcon,
	WeightIcon,
	WornIcon,
	MoneyIcon,
	BackpackIcon,
} from '@/components/ui';

type PackSummaryPanelProps = {
	totalWeight: number;
	descriptivePackWeight: { baseWeight: string; consumables: string; wornWeight: string };
	totalPackPrice: string | number;
};

export const PackSummaryPanel = (props: PackSummaryPanelProps) => {
	const { totalWeight, descriptivePackWeight, totalPackPrice } = props;
	const { baseWeight, consumables, wornWeight } = descriptivePackWeight;
	const showPrices = usePricingContext();

	return (
		<>
			<HoverCard.Root>
				<HoverCard.Trigger>
					<Flex mt="2" className={styles.popupListItem} style={{ cursor: 'pointer' }}>
						<BackpackIcon size={16} /> Total Weight: <Badge ml="auto">{totalWeight} lbs</Badge>
					</Flex>
				</HoverCard.Trigger>
				<HoverCard.Content side="top">
					<Flex direction="column">
						<Flex my="2" className={styles.popupListItem}>
							<WeightIcon size={16} />
							Base Weight:
							<Badge ml="auto">{baseWeight}</Badge>
						</Flex>

						<Flex my="2" className={styles.popupListItem}>
							<ConsumableIcon size={16} />
							Consumables:
							<Badge ml="auto">{consumables}</Badge>
						</Flex>
						<Flex my="2" className={styles.popupListItem}>
							<WornIcon size={16} />
							Worn Weight:
							<Badge ml="auto">{wornWeight}</Badge>
						</Flex>

						<Separator size="4" mb="4" mt="2" />

						<Flex className={styles.popupListItem}>
							Total Weight:
							<Badge ml="auto">{totalWeight} lbs</Badge>
						</Flex>
					</Flex>
				</HoverCard.Content>
			</HoverCard.Root>

			{showPrices && (
				<Flex mt="2" className={styles.popupListItem}>
					<MoneyIcon size={16} /> Total Price:
					<Badge ml="auto">{totalPackPrice}</Badge>
				</Flex>
			)}
		</>
	);
};
