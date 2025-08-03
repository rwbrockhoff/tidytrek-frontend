import { type UserProfile } from '@/types/profile-types';
import { type Category, type Pack } from '@/types/pack-types';
import { type Settings } from '@/types/settings-types';
import styles from './pack-info.module.css';
import { cn, mx } from '@/styles/utils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditPencilIcon, ChartIcon, LinkIcon } from '@/components/icons';
import { Heading, Text } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { Button } from '@/components/alpine';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { useCategoryInfo } from '../../hooks/use-category-info';
import { encode } from '@/utils';
import { PackGraphic } from './pack-chart/pack-graphic';
import { PackModal } from '../pack-modal/pack-modal';
import { ExternalLink } from '@/components/ui';
import { ShareSettings } from './share-settings/share-settings';
import { PackLabels } from '@/components';
import { ProfileInfo } from './profile-info/profile-info';
import { PackStarterCard } from './pack-starter-card/pack-starter-card';

type PackInfoProps = {
	currentPack: Pack;
	packCategories: Category[];
	userProfile: UserProfile | undefined;
	settings: Settings | null;
	fetching: boolean;
};

export const PackInfo = (props: PackInfoProps) => {
	const navigate = useNavigate();
	const { isCreator } = useUserPermissionsContext();
	const { isMobile } = useCheckScreen();
	const { packId: paramPackId } = useParams();

	const { fetching, currentPack, packCategories, userProfile, settings } = props;
	const { profileInfo, socialLinks } = userProfile || {};

	const [showPackChart, setShowPackChart] = useState(false);

	const handleTogglePackChart = () => setShowPackChart(!showPackChart);

	const { packName, packDescription, packUrl, packUrlName, packPublic } = currentPack;

	const { publicProfile } = settings || {};

	const { packHasWeight } = useCategoryInfo(packCategories);

	const isDefaultUntouchedPack = isUntouchedDefaultPack(
		isCreator,
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
			<Stack className={cn(mx.responsivePanel, styles.userInfoPanel, 'gap-1')}>
				{!isCreator && (
					<ProfileInfo
						userInfo={profileInfo}
						socialLinks={socialLinks}
						publicProfile={publicProfile}
					/>
				)}

				<Flex className="items-center gap-2">
					<Heading as="h1" size="6" data-testid="pack-name-heading">
						{packName}
					</Heading>

					{isMobile && isCreator ? (
						<Button
							variant="ghost"
							className={cn(`editIcon ${styles.editIcon}`, 'my-auto')}
							data-testid="pack-edit-button"
							aria-label="Edit pack details"
							onClick={() => navigate(`/pack/edit/${encode(currentPack.packId)}`)}>
							<EditPencilIcon />
						</Button>
					) : (
						isCreator && (
							<PackModal pack={currentPack}>
								<Button
									variant="ghost"
									className={cn(`editIcon ${styles.editIcon}`, 'my-auto')}
									data-testid="pack-edit-button"
									aria-label="Edit pack details">
									<EditPencilIcon />
								</Button>
							</PackModal>
						)
					)}
				</Flex>
				{isCreator && <ShareSettings packPublic={packPublic} packId={paramPackId} />}
				{packUrl && (
					<ExternalLink href={packUrl}>
						<LinkIcon />
						{packUrlName || packUrl || 'Pack Link'}
					</ExternalLink>
				)}
				<Text className={styles.descriptionText}>{packDescription}</Text>
				<PackLabels pack={currentPack} />

				{/* Show starter card for untouched default packs */}
				{isDefaultUntouchedPack && <PackStarterCard />}

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

// checks if pack is default/untouched
const isUntouchedDefaultPack = (
	isCreator: boolean,
	packCategories: Category[],
	currentPack: Pack,
	packDescription: string,
	packUrl: string,
): boolean => {
	return (
		isCreator &&
		packCategories.length <= 1 &&
		(packCategories.length === 0 || packCategories[0].packItems?.length <= 1) &&
		(packCategories.length === 0 ||
			!packCategories[0].packItems?.length ||
			!packCategories[0].packItems[0].packItemName ||
			packCategories[0].packItems[0].packItemName.trim() === '') &&
		!packDescription &&
		!packUrl &&
		!currentPack.packLocationTag &&
		!currentPack.packDurationTag &&
		!currentPack.packSeasonTag &&
		!currentPack.packDistanceTag
	);
};
