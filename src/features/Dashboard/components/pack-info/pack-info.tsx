import { type UserProfile } from '@/types/profile-types';
import { type Category, type Pack } from '@/types/pack-types';
import { type Settings } from '@/types/settings-types';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditPencilIcon, ChartIcon, DeleteModal } from '@/components/ui';
import { Flex, Heading, Button } from '@radix-ui/themes';
import { useUserContext } from '@/hooks/use-viewer-context';
import {
	// useDeletePackMutation,
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
	const { fetching, currentPack, packCategories, userProfile, settings } = props;
	const { profileInfo, socialLinks } = userProfile || {};

	const userView = useUserContext();
	const { packId: paramPackId } = useParams();

	const navigate = useNavigate();

	const { mutate: deletePack } = useDeletePackMutation();
	const { mutate: deletePackAndItems } = useDeletePackAndItemsMutation();

	const [showIcon, setShowIcon] = useState(false);
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
	const showEditIcon = userView && showIcon;
	return (
		<PackInfoContainer align="center" display="inline-flex" mt="6" mb="9">
			<Panel
				$width={'50%'}
				onMouseOver={() => setShowIcon(true)}
				onMouseLeave={() => setShowIcon(false)}>
				{!userView && (
					<ProfileInfo
						userInfo={profileInfo}
						socialLinks={socialLinks}
						publicProfile={publicProfile}
					/>
				)}

				<Heading as="h1" size="6" mb="0">
					<Flex>
						{packName}

						{showEditIcon && (
							<PackModal showDeleteModal={handleToggleDeleteModal} pack={currentPack}>
								<EditIcon name="pencil alternate" color="grey" />
							</PackModal>
						)}
					</Flex>
				</Heading>

				<ShareSettings packPublic={packPublic} packId={paramPackId} />

				{packUrl && (
					<DisplayLink
						url={packUrl}
						text={packUrlName || packUrl || 'Pack Link'}
						showIcon
						margin="0 0 10px 0"
					/>
				)}

				<p>{packDescription}</p>

				<PackLabels pack={currentPack} />

				<ToggleChartButton
					variant="outline"
					my="6"
					size="3"
					onClick={handleTogglePackChart}>
					<ChartIcon />
					Show Pack Chart
				</ToggleChartButton>
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
		</PackInfoContainer>
	);
};

const PackInfoContainer = styled(Flex)`
	width: 100%;
	${({ theme: t }) =>
		t.mx.mobile(`
			width: 95%;
			height: fit-content;
			flex-direction: column;
			margin-top: 3vh;
			margin-bottom: 0;
	`)}
`;

const EditIcon = styled(EditPencilIcon)<{ $display?: boolean }>`
	font-size: 0.9em;
	margin-left: 0.5em;
	cursor: pointer;
	${({ theme: t }) => t.mx.mobile(`opacity: 1;`)}
`;

const ToggleChartButton = styled(Button)`
	width: 100%;
	display: none;
	text-align: center;
	${({ theme: t }) => t.mx.mobile(`display: flex;`)}
`;

const deletePackMessage = `You can delete your pack permanently or move your pack items to your gear closet.`;
