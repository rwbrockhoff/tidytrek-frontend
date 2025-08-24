import { Skeleton } from '@/components/ui/skeleton/skeleton';

export const PackListSkeleton = () => (
	<div className="space-y-2">
		{Array.from({ length: 3 }).map((_, i) => (
			<Skeleton
				key={`pack-skeleton-${i}`}
				height="24px"
				width={i === 2 ? '75%' : '90%'}
				variant="rectangular"
			/>
		))}
	</div>
);