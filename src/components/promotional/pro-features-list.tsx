import { Text } from '@radix-ui/themes';
import { Stack, Flex } from '@/components/layout';
import { Check } from 'lucide-react';
import mx from '@/styles/utils/mixins.module.css';

const features = [
	'Unlimited pack lists',
	'Unlimited photo uploads',
	"Save other users' packs",
	'Priority support',
];

export const ProFeaturesList = () => {
	return (
		<Stack className="gap-3">
			{features.map((feature) => (
				<Flex key={feature} className="items-center gap-2">
					<Check className={mx.primaryText} />
					<Text size="3">{feature}</Text>
				</Flex>
			))}
		</Stack>
	);
};
