import { Flex, Text, Badge } from '@radix-ui/themes';
import { CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/alpine';
import { SegmentGroup, Segment, SegmentHeader } from '@/components/primitives';
import { Stack } from '@/components/layout';
import { AccountSkeleton } from '../components/account-skeleton';
import { BackpackIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from './subscription-settings.module.css';

export const SubscriptionSettings = () => {
	// todo: Get actual subscription status from API
	const isSubscribed = false;
	const currentPlan = isSubscribed ? 'Pro' : 'Free';
	const isLoading = false; // todo: Add loading state from query

	if (isLoading) return <AccountSkeleton />;

	return (
		<SegmentGroup>
			{/* Current Plan  */}
			<Segment>
				<SegmentHeader
					title="Current Plan"
					description={
						!isSubscribed
							? "You're on the free plan. Upgrade to Pro for unlimited packs and advanced features."
							: 'Your Pro subscription is active'
					}
				/>
				<Stack className="gap-2">
					<Badge
						color={'gray'}
						size="2"
						variant="soft"
						className={cn('self-start', isSubscribed && styles.proBadge)}>
						{currentPlan}
					</Badge>
					{isSubscribed && (
						<Text size="2" color="gray">
							Next billing date: January 1, 2025
						</Text>
					)}
				</Stack>
			</Segment>

			{/* Pro Features */}
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

			{/* Subscription Sign Up CTA */}
			<Segment>
				<SegmentHeader
					title="Subscription"
					description={!isSubscribed ? 'Choose your plan' : 'Manage your subscription'}
				/>
				<Stack className="gap-3 max-w-md">
					{!isSubscribed ? (
						<>
							<Flex justify="between" align="center" className="p-4 border rounded-lg">
								<Stack className="gap-1">
									<Flex align="center" gap="2">
										<BackpackIcon />
										<Text size="3" weight="bold">
											Pro Plan
										</Text>
									</Flex>
									<Text size="2" color="gray">
										Billed monthly
									</Text>
								</Stack>
								<Text size="5" weight="bold">
									$5/mo
								</Text>
							</Flex>

							<Button size="md" className="w-full" iconLeft={<CreditCard size={16} />}>
								Upgrade to Pro
							</Button>
						</>
					) : (
						<Flex gap="3" className="max-w-sm">
							<Button variant="outline">Manage Subscription</Button>
							<Button variant="outline" color="danger">
								Cancel Subscription
							</Button>
						</Flex>
					)}
				</Stack>
			</Segment>

			{/* Payment Method */}
			{isSubscribed && (
				<Segment>
					<SegmentHeader
						title="Payment Method"
						description="Update your payment information"
					/>
					<Flex align="center" gap="4">
						<CreditCard size={20} />
						<Text size="2">•••• •••• •••• 4242</Text>
						<Button variant="ghost" size="sm">
							Update
						</Button>
					</Flex>
				</Segment>
			)}
		</SegmentGroup>
	);
};
