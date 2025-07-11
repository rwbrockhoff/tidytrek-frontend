import { type UserProfile } from '@/types/profile-types';
import { type Category, type Pack } from '@/types/pack-types';
import { type Settings } from '@/types/settings-types';
import styles from './pack-info.module.css';
import { cn, mx } from '@/styles/utils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditPencilIcon, ChartIcon } from '@/components/ui';
import { Flex, Heading, Button, Text } from '@radix-ui/themes';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { encode } from '@/utils';
import { PackGraphic } from './pack-chart/pack-graphic';
import { PackModal } from '../pack-modal/pack-modal';
import { DisplayLink } from '@/components/ui';
import { ShareSettings } from './share-settings';
import { PackLabels } from '@/components';
import { ProfileInfo } from './profile-info';

type PackInfoProps = {
	currentPack: Pack;
	packCategories: Category[];
	userProfile: UserProfile | undefined;
	settings: Settings | null;
	fetching: boolean;
};

export const PackInfo = (props: PackInfoProps) => {
	const navigate = useNavigate();
	const userView = useUserContext();
	const { isMobile } = useCheckScreen();
	const { packId: paramPackId } = useParams();

	const { fetching, currentPack, packCategories, userProfile, settings } = props;
	const { profileInfo, socialLinks } = userProfile || {};

	const [showPackChart, setShowPackChart] = useState(false);

	const handleTogglePackChart = () => setShowPackChart(!showPackChart);

	const { packName, packDescription, packUrl, packUrlName, packPublic } = currentPack;

	const { publicProfile } = settings || {};

	return (
		<Flex
			align="center"
			display="inline-flex"
			mt="6"
			mb="9"
			className={cn(styles.packInfoContainer, mx.responsiveContent)}>
			<div className={cn(mx.responsivePanel, styles.userInfoPanel)}>
				{!userView && (
					<ProfileInfo
						userInfo={profileInfo}
						socialLinks={socialLinks}
						publicProfile={publicProfile}
					/>
				)}

				<Flex align="center" gap="2" mb="2">
					<Heading as="h1" size="6" data-testid="pack-name-heading">
						{packName}
					</Heading>

					{isMobile && userView ? (
						<Button
							variant="ghost"
							className={cn(`editIcon ${styles.editIcon}`)}
							data-testid="pack-edit-button"
							aria-label="Edit pack details"
							onClick={() => navigate(`/pack/edit/${encode(currentPack.packId)}`)}>
							<EditPencilIcon size={16} />
						</Button>
					) : (
						<PackModal pack={currentPack}>
							<Button
								variant="ghost"
								className={cn(`editIcon ${styles.editIcon}`, !userView && mx.hidden)}
								data-testid="pack-edit-button"
								aria-label="Edit pack details">
								<EditPencilIcon size={16} />
							</Button>
						</PackModal>
					)}
				</Flex>

				<ShareSettings packPublic={packPublic} packId={paramPackId} />

				{packUrl && (
					<DisplayLink
						url={packUrl}
						text={packUrlName || packUrl || 'Pack Link'}
						showIcon
						margin="var(--space-xs)0 0 0"
					/>
				)}

				<Text my="2" className={styles.descriptionText}>
					{packDescription}
				</Text>

				<PackLabels pack={currentPack} />

				<Button
					variant="outline"
					my="6"
					size="3"
					onClick={handleTogglePackChart}
					className={styles.toggleChartButton}>
					<ChartIcon />
					{showPackChart ? 'Hide' : 'Show'} Pack Chart
				</Button>
			</div>

			{/* Right Hand Panel */}

			<PackGraphic
				fetching={fetching}
				packCategories={packCategories}
				display={showPackChart}
			/>
		</Flex>
	);
};
