import { Badge } from '@radix-ui/themes';
import { Segment, SegmentHeader } from '@/components/primitives';
import { Stack } from '@/components/layout';
import { SubscriptionDateDisplay } from '../subscription/components/subscription-date-display';
import { cn } from '@/styles/utils';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import styles from './current-plan-segment.module.css';

export const CurrentPlanSegment = () => {
	const { isSubscribed, isComplimentary, isPaidSubscription, subscription } =
		useSubscriptionDetails();

	const currentPlan = isSubscribed ? 'Pro' : 'Free';

	const description = !isSubscribed
		? "You're on the free plan. Upgrade to Pro for unlimited packs and advanced features."
		: isComplimentary
			? 'You have complimentary Pro access. Thanks for being here! ✌️'
			: 'Your Pro subscription is active';

	return (
		<Segment>
			<SegmentHeader title="Current Plan" description={description} />
			<Stack className="gap-2">
				<Badge
					color="gray"
					size="2"
					variant="soft"
					className={cn('self-start', isSubscribed && styles.proBadge)}>
					{currentPlan}
				</Badge>
				<SubscriptionDateDisplay
					isComplimentary={isComplimentary}
					isPaidSubscription={isPaidSubscription}
					subscription={subscription}
				/>
			</Stack>
		</Segment>
	);
};
