import { Segment, SegmentHeader } from '@/components/primitives';
import { ProFeaturesList } from '@/components/promotional/pro-features-list';

export const ProFeaturesSegment = () => {
	return (
		<Segment>
			<SegmentHeader
				title="Pro Features"
				description="Everything included with your Pro subscription:"
			/>
			<ProFeaturesList />
		</Segment>
	);
};
