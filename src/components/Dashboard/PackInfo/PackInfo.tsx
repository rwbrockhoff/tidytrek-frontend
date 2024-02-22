import { Header, Icon } from 'semantic-ui-react';
import { useState } from 'react';
import { useUserContext } from '../../../views/Dashboard/useUserContext';
import {
	useDeletePackMutation,
	useDeletePackAndItemsMutation,
} from '../../../queries/packQueries';
import PackGraphic from './PackGraphic';
import PackFormModal from './PackFormModal/PackFormModal';
import { DeleteModal } from '../../../shared/ui/Modals';
import './PackInfo.css';
import { useNavigate, useParams } from 'react-router-dom';
import { type Category, type Pack } from '../../../types/packTypes';
import ShareSettings from './ShareSettings/ShareSettings';
import PackLabels from './PackLabels/PackLabels';
import Link from '../../../shared/ui/Link';
import Avatar from '../../../shared/ui/Avatar';
import { ProfileSettings, SocialLink } from '../../../types/profileSettingsTypes';
import SocialLinkList from '../../Account/ProfileForm/SocialLinkList';

type PackInfoProps = {
	currentPack: Pack;
	packCategories: Category[];
	profile: ProfileSettings | null;
	socialLinks: SocialLink[] | null;
	fetching: boolean;
};

const PackInfo = (props: PackInfoProps) => {
	const { fetching, currentPack, packCategories, profile, socialLinks } = props;

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

	const { profilePhotoUrl } = profile || {};

	return (
		<div className="pack-info-container">
			<div
				className="pack-info-left-panel"
				onMouseOver={() => setShowIcon(true)}
				onMouseLeave={() => setShowIcon(false)}>
				{!userView && (
					<>
						<Avatar src={profilePhotoUrl} size="small" />
						<SocialLinkList
							socialLinks={socialLinks || []}
							deleteEnabled={false}
							colorButton={false}
						/>
					</>
				)}

				<Header as="h1">
					{packName}
					{showIcon && userView && (
						<Icon name="pencil alternate" color="grey" onClick={handleToggleModal} />
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
			</div>

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
		</div>
	);
};

export default PackInfo;
