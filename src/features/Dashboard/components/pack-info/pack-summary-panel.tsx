import styled from 'styled-components';
import { Flex, Badge, Separator, HoverCard } from '@radix-ui/themes';
import { usePricingContext } from '@/hooks/use-viewer-context';
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
					<div>
						<PopupListItem style={{ cursor: 'pointer' }}>
							<BackpackIcon /> Total Weight:{' '}
							<Badge color="gray" ml="auto">
								{totalWeight} lbs
							</Badge>
						</PopupListItem>
					</div>
				</HoverCard.Trigger>
				<HoverCard.Content side="top">
					<Flex direction="column">
						<PopupListItem my="2">
							<WeightIcon />
							Base Weight:
							<Badge color="gray" ml="auto">
								{baseWeight}
							</Badge>
						</PopupListItem>

						<PopupListItem my="2">
							<ConsumableIcon />
							Consumables:
							<Badge color="gray" ml="auto">
								{consumables}
							</Badge>
						</PopupListItem>
						<PopupListItem my="2">
							<WornIcon />
							Worn Weight:
							<Badge color="gray" ml="auto">
								{wornWeight}
							</Badge>
						</PopupListItem>

						<Separator size="4" mb="4" mt="2" />

						<PopupListItem>
							Total Weight:
							<Badge color="gray" ml="auto">
								{totalWeight} lbs
							</Badge>
						</PopupListItem>
					</Flex>
				</HoverCard.Content>
			</HoverCard.Root>

			{showPrices && (
				<PopupListItem mt="4">
					<MoneyIcon /> Total Price:
					<Badge color="gray" ml="auto">
						{totalPackPrice}
					</Badge>
				</PopupListItem>
			)}
		</>
	);
};

const PopupListItem = styled(Flex)`
	font-size: 0.9em;
	align-items: center;
	p {
		margin-right: 0.5em;
		text-align: left;
	}
	svg {
		margin-right: 0.5em;
		overflow: visible;
		color: var(--gray-9);
	}
`;
