import { Skeleton, SkeletonText } from '@/components/ui/skeleton/skeleton';
import { Stack } from '@/components/layout';
import { SegmentGroup, Segment } from '@/components/primitives';

export const AccountSkeleton = () => (
	<Stack>
		<SegmentGroup>
			<Segment>
				<Stack className="gap-6">
					<Skeleton height="80px" width="80px" variant="circular" />
					<SkeletonText lines={2} />
				</Stack>
			</Segment>
			<Segment>
				<Stack className="gap-6">
					<SkeletonText lines={4} />
					<Skeleton height="40px" width="120px" />
				</Stack>
			</Segment>
			<Segment>
				<SkeletonText lines={3} />
			</Segment>
			<Segment>
				<SkeletonText lines={2} />
			</Segment>
		</SegmentGroup>
	</Stack>
);