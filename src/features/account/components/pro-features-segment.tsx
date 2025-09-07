import { Flex, Text } from '@radix-ui/themes';
import { Check } from 'lucide-react';
import { Segment, SegmentHeader } from '@/components/primitives';
import { Stack } from '@/components/layout';
import styles from '../routes/subscription-settings.module.css';

export const ProFeaturesSegment = () => {
	return (
		<Segment>
			<SegmentHeader
				title="Pro Features"
				description="Everything included with your Pro subscription:"
			/>
			<Stack className="gap-3">
				{[
					'Unlimited pack lists',
					'Photo attachments',
					'Gear closet for organization',
					'Priority support',
				].map((feature) => (
					<Flex key={feature} gap="2" align="center">
						<Check size={16} className={styles.checkIcon} />
						<Text size="2">{feature}</Text>
					</Flex>
				))}
			</Stack>
		</Segment>
	);
};
