import { type UserProfile } from '@/types/profile-types';
import { type Category, type Pack } from '@/types/pack-types';
import { type Settings } from '@/types/settings-types';
import styles from './pack-info.module.css';
import { cn } from '@/styles/utils/cn';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditPencilIcon, ChartIcon, DeleteModal } from '@/components/ui';
import { Flex, Heading, Button, Text } from '@radix-ui/themes';
import { useUserContext } from '@/hooks/use-viewer-context';
import {
	useDeletePackAndItemsMutation,
	useDeletePackMutation,
} from '@/queries/pack-queries';
import { PackGraphic } from './pack-chart/pack-graphic';
import { PackModal } from '../pack-modal/pack-modal';
import { DisplayLink } from '@/components/ui';
import { Panel } from '@/components/ui/TidyUI';
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
	const { packId: paramPackId } = useParams();

	const { fetching, currentPack, packCategories, userProfile, settings } = props;
	const { profileInfo, socialLinks } = userProfile || {};

	const { mutate: deletePack } = useDeletePackMutation();
	const { mutate: deletePackAndItems } = useDeletePackAndItemsMutation();

	const [showPackChart, setShowPackChart] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleTogglePackChart = () => setShowPackChart(!showPackChart);

	const handleToggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

	const handleDeletePack = () => {
		const { packId } = currentPack;
		deletePack(packId);
		navigate('/');
	};

	const handleDeletePackAndItems = () => {
		const { packId } = currentPack;
		deletePackAndItems(packId);
		navigate('/');
	};

	const { packName, packDescription, packUrl, packUrlName, packPublic } = currentPack;

	const { publicProfile } = settings || {};

	return (
		<Flex 
			align="center" 
			display="inline-flex" 
			mt="6" 
			mb="9"
			className={styles.packInfoContainer}
		>
			<Panel width={'50%'} className={styles.userInfoPanel}>
				{!userView && (
					<ProfileInfo
						userInfo={profileInfo}
						socialLinks={socialLinks}
						publicProfile={publicProfile}
					/>
				)}

				<Heading as="h1" size="6" mb="2">
					<Flex>
						{packName}

						<PackModal pack={currentPack} showDeleteModal={handleToggleDeleteModal}>
							<EditPencilIcon
								className={cn(`editIcon ${styles.editIcon}`, !userView && styles.hidden)}
								name="pencil alternate"
								color="grey"
							/>
						</PackModal>
					</Flex>
				</Heading>

				<ShareSettings packPublic={packPublic} packId={paramPackId} />

				{packUrl && (
					<DisplayLink
						url={packUrl}
						text={packUrlName || packUrl || 'Pack Link'}
						showIcon
						margin="0 0 0 0"
					/>
				)}

				<Text my="2" className={styles.descriptionText}>{packDescription}</Text>

				<PackLabels pack={currentPack} />

				<Button
					variant="outline"
					my="6"
					size="3"
					onClick={handleTogglePackChart}
					className={styles.toggleChartButton}
				>
					<ChartIcon />
					Show Pack Chart
				</Button>
			</Panel>

			{/* Right Hand Panel */}

			<PackGraphic
				fetching={fetching}
				packCategories={packCategories}
				display={showPackChart}
			/>

			<DeleteModal
				header={`Delete ${packName} Pack?`}
				message={deletePackMessage}
				open={showDeleteModal}
				toggleOpen={handleToggleDeleteModal}
				onClickDelete={handleDeletePackAndItems}
				onClickMove={handleDeletePack}
			/>
		</Flex>
	);
};


const deletePackMessage = `You can delete your pack permanently or move your pack items to your gear closet.`;
