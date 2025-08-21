import { type UserProfile } from '@/types/profile-types';
import { type Category, type Pack } from '@/types/pack-types';
import { type Settings } from '@/types/settings-types';
import styles from './pack-info.module.css';
import { cn, mx } from '@/styles/utils';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChartIcon, LinkIcon } from '@/components/icons';
import { Heading, Text } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { Button } from '@/components/alpine';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { useDashboardView } from '../../hooks/use-dashboard-view';
import { useCategoryInfo } from '../../hooks/use-category-info';
import { isUntouchedPack } from '../../utils/is-untouched-pack';
import { PackGraphic } from './pack-chart/pack-graphic';
import { ExternalLink } from '@/components/ui';
import { PackLabels } from '@/components';
import { ProfileInfo } from './profile-info/profile-info';
import { PackStarterCard } from './pack-starter-card/pack-starter-card';
import { AffiliateMessage } from './affiliate-message';
import { PackOptionsMenu } from './pack-options-menu';
import { PackVisibilityStatus } from './pack-visibility-status';

type PackInfoProps = {
	currentPack: Pack;
	packCategories: Category[];
	userProfile: UserProfile | undefined;
	settings: Settings | null;
	fetching: boolean;
};

export const PackInfo = (props: PackInfoProps) => {
	const { canEdit } = useDashboardView();
	const { isMobile } = useCheckScreen();
	const { packId: paramPackId } = useParams();

	const { fetching, currentPack, packCategories, userProfile, settings } = props;
	const { profileInfo, socialLinks } = userProfile || {};

	const [showPackChart, setShowPackChart] = useState(false);

	const handleTogglePackChart = () => setShowPackChart(!showPackChart);

	const {
		packName,
		packDescription,
		packUrl,
		packUrlName,
		packPublic,
		packAffiliate,
		packAffiliateDescription,
	} = currentPack;

	const { publicProfile } = settings || {};

	const { packHasWeight } = useCategoryInfo(packCategories);

	const isUntouched = isUntouchedPack(
		canEdit,
		packCategories,
		currentPack,
		packDescription,
		packUrl,
	);
	return (
		<Flex
			className={cn(
				styles.packInfoContainer,
				mx.responsiveContent,
				'flex-col items-center mb-4 gap-4 min-h-fit md:flex-row md:items-start md:justify-between md:mb-12 md:gap-8',
			)}>
			<Stack className={cn(mx.responsivePanel, styles.userInfoPanel, 'gap-1 max-w-lg')}>
				{!canEdit && (
					<ProfileInfo
						userInfo={profileInfo}
						socialLinks={socialLinks}
						publicProfile={publicProfile}
					/>
				)}

				<Flex className="items-center gap-3">
					<Heading as="h1" size="6" data-testid="pack-name-heading">
						{packName}
					</Heading>

					{canEdit && (
						<div className={styles.packOptionsMenu}>
							<PackOptionsMenu pack={currentPack} packId={paramPackId} />
						</div>
					)}
				</Flex>

				{canEdit && <PackVisibilityStatus isPublic={packPublic} />}

				{packUrl && (
					<ExternalLink href={packUrl}>
						<LinkIcon />
						{packUrlName || packUrl || 'Pack Link'}
					</ExternalLink>
				)}

				<Text className={styles.descriptionText}>{packDescription}</Text>

				<PackLabels pack={currentPack} />

				{packAffiliate && !canEdit && (
					<AffiliateMessage
						description={packAffiliateDescription || ''}
						username={profileInfo?.username}
					/>
				)}

				{/* Show starter card for untouched default packs */}
				{isUntouched && <PackStarterCard />}

				{/* mobile chart toggle button */}
				{packHasWeight && isMobile && (
					<Flex className="my-4">
						<Button
							variant="outline"
							size="md"
							onClick={handleTogglePackChart}
							iconLeft={<ChartIcon />}
							className={cn(styles.toggleChartButton, 'flex md:hidden')}>
							{showPackChart ? 'Hide' : 'Show'} Pack Chart
						</Button>
					</Flex>
				)}
			</Stack>

			{/* Right Hand Panel */}
			<PackGraphic
				fetching={fetching}
				packCategories={packCategories}
				display={isMobile ? showPackChart : true}
			/>
		</Flex>
	);
};
