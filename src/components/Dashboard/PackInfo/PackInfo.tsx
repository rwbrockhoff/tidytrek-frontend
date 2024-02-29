import { Header, Icon } from 'semantic-ui-react';
import { useState } from 'react';
import { useUserContext } from '../../../views/Dashboard/hooks/useViewerContext';
import {
	useDeletePackMutation,
	useDeletePackAndItemsMutation,
} from '../../../queries/packQueries';
import PackGraphic from './PackGraphic';
import PackFormModal from './PackFormModal/PackFormModal';
import { DeleteModal } from '../../../shared/ui/Modals';
import styled from 'styled-components';
import { Panel } from '../../../shared/ui/TidyUI';
import './PackInfo.css';
import { useNavigate, useParams } from 'react-router-dom';
import { type Category, type Pack } from '../../../types/packTypes';
import ShareSettings from './ShareSettings/ShareSettings';
import PackLabels from './PackLabels/PackLabels';
import Link from '../../../shared/ui/Link';
import { type UserProfile } from '../../../types/profileTypes';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { type Settings } from '../../../types/settingsTypes';

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

	const handleToggleModal = () => setShowPackModal(!showPackModal);
	const handleToggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

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
		<PackInfoContainer className="pack-info-container">
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

				<Header as="h1">
					{packName}
					{showIcon && userView && (
						<EditIcon name="pencil alternate" color="grey" onClick={handleToggleModal} />
					)}
				</Header>

				<ShareSettings packPublic={packPublic} packId={paramPackId} />

				{packUrl && (
					<Link
						url={packUrl}
						text={packUrlName || packUrl || 'Pack Link'}
						className="pack-link"
						showIcon
					/>
				)}

				<p>{packDescription}</p>

				<PackLabels pack={currentPack} />
			</Panel>

			{/* Right Hand Panel */}

			<PackGraphic fetching={fetching} packCategories={packCategories} />

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
	width: 100%;
	height: 40vh;
	display: inline-flex;
	align-items: center;
	margin-bottom: 2vh;
`;

const EditIcon = styled(Icon)`
	&&& {
		font-size: 0.6em;
		margin-left: 15px;
		vertical-align: text-top;
		height: 0.6em;
		cursor: pointer;
	}
`;
