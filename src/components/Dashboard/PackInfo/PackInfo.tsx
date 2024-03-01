import { type UserProfile } from '../../../types/profileTypes';
import { type Category, type Pack } from '../../../types/packTypes';
import { type Settings } from '../../../types/settingsTypes';
import styled from 'styled-components';
import { Header, Icon, Button } from 'semantic-ui-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mobile } from '../../../shared/mixins/mixins';
import { useUserContext } from '../../../views/Dashboard/hooks/useViewerContext';
import {
	useDeletePackMutation,
	useDeletePackAndItemsMutation,
} from '../../../queries/packQueries';
import PackGraphic from './PackGraphic';
import PackFormModal from './PackFormModal/PackFormModal';
import { DeleteModal } from '../../../shared/ui/Modals';
import { Panel } from '../../../shared/ui/TidyUI';
import ShareSettings from './ShareSettings/ShareSettings';
import PackLabels from './PackLabels/PackLabels';
import { DisplayLink } from '../../../shared/ui/Link';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PackInfoProps = {
	currentPack: Pack;
	packCategories: Category[];
	userProfile: UserProfile | undefined;
	settings: Settings | null;
	fetching: boolean;
};

const PackInfo = (props: PackInfoProps) => {
	const { fetching, currentPack, packCategories, userProfile, settings } = props;
	const { profileInfo, socialLinks } = userProfile || {};

	const userView = useUserContext();
	const { packId: paramPackId } = useParams();

	const navigate = useNavigate();

	const { mutate: deletePack } = useDeletePackMutation();
	const { mutate: deletePackAndItems } = useDeletePackAndItemsMutation();

	const [showIcon, setShowIcon] = useState(false);
	const [showPackModal, setShowPackModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showPackChart, setShowPackChart] = useState(false);

	const handleToggleModal = () => setShowPackModal(!showPackModal);
	const handleToggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
	const handleTogglePackChart = () => setShowPackChart(!showPackChart);

	const handleShowDeleteModal = () => {
		setShowPackModal(false);
		setShowDeleteModal(true);
	};

	const handleDeletePack = () => {
		const { packId } = currentPack;
		deletePack(packId);
		navigate('/');
		setShowDeleteModal(false);
	};

	const handleDeletePackAndItems = () => {
		const { packId } = currentPack;
		deletePackAndItems(packId);
		navigate('/');
		setShowDeleteModal(false);
	};

	const { packName, packDescription, packUrl, packUrlName, packPublic } = currentPack;

	const { publicProfile } = settings || {};

	return (
		<PackInfoContainer>
			<InfoPanel
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

				<Header as="h1">
					{packName}

					{userView && (
						<EditIcon
							name="pencil alternate"
							color="grey"
							onClick={handleToggleModal}
							$display={showIcon}
						/>
					)}
				</Header>

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

				<ToggleChartButton basic onClick={handleTogglePackChart}>
					<Icon name="pie chart" />
					Show Pack Chart
				</ToggleChartButton>
			</InfoPanel>

			{/* Right Hand Panel */}

			<PackGraphic
				fetching={fetching}
				packCategories={packCategories}
				display={showPackChart}
			/>

			<PackFormModal
				open={showPackModal}
				onClose={handleToggleModal}
				onClickDelete={handleShowDeleteModal}
				pack={currentPack}
			/>
			<DeleteModal
				open={showDeleteModal}
				onClose={handleToggleDeleteModal}
				onClickDelete={handleDeletePackAndItems}
				onClickMove={handleDeletePack}
			/>
		</PackInfoContainer>
	);
};

export default PackInfo;

const PackInfoContainer = styled.div`
	height: 40vh;
	display: inline-flex;
	align-items: center;
	margin-bottom: 2vh;
	width: 100%;
	${mobile(`
		width: 95%;
		height: fit-content;
		flex-direction: column;
		margin-top: 3vh;
		margin-bottom: 0;
	`)}
`;

const InfoPanel = styled(Panel)`
	${mobile(`margin-bottom: 25px;`)}
`;

const EditIcon = styled(Icon)<{ $display: boolean }>`
	&&& {
		font-size: 0.6em;
		margin-left: 15px;
		vertical-align: text-top;
		height: 0.6em;
		cursor: pointer;
		opacity: ${({ $display }) => ($display ? 1 : 0)};
		${mobile(`opacity: 1;`)}
	}
`;

const ToggleChartButton = styled(Button)`
	&&& {
		margin-top: 25px;
		width: 100%;
		display: none;
		${mobile(`display: block;`)}
	}
`;
