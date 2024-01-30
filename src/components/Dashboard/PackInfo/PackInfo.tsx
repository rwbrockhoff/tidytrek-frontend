import { Header, Label, Icon } from 'semantic-ui-react';
import { useState } from 'react';
import {
	useDeletePackMutation,
	useDeletePackAndItemsMutation,
} from '../../../redux/pack/packApiSlice';
import PackGraphic from './PackGraphic';
import PackFormModal from './PackFormModal/PackFormModal';
import { DeleteModal } from '../PackCategory/Modals/Modals';
import './PackInfo.css';
import { useNavigate } from 'react-router-dom';
import { type Category, type Pack } from '../../../types/packTypes';

type PackInfoProps = {
	currentPack: Pack;
	packCategories: Category[];
	fetching: boolean;
};

const PackInfo = ({ fetching, currentPack, packCategories }: PackInfoProps) => {
	const navigate = useNavigate();
	const [deletePack] = useDeletePackMutation();
	const [deletePackAndItems] = useDeletePackAndItemsMutation();

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

	const {
		packName,
		packDescription,
		packLocationTag,
		packDurationTag,
		packSeasonTag,
		packDistanceTag,
		packUrl,
		packUrlName,
	} = currentPack;

	return (
		<div className="pack-info-container">
			<div
				className="pack-info-left-panel"
				onMouseOver={() => setShowIcon(true)}
				onMouseLeave={() => setShowIcon(false)}>
				<Header as="h1">
					{packName}
					{showIcon && (
						<Icon name="pencil alternate" color="grey" onClick={handleToggleModal} />
					)}
				</Header>

				{packUrl && (
					<p>
						<a
							href={`https://${packUrl}`}
							target="_blank"
							rel="noopener noreferrer"
							className="pack-link">
							<Icon name="linkify" />
							{packUrlName || packUrl || 'Pack Link'}
						</a>
					</p>
				)}

				<p>{packDescription}</p>
				<div className="pack-info-tag-container">
					{packLocationTag && (
						<Label color="olive">
							<Icon name="location arrow" />
							{packLocationTag}
						</Label>
					)}
					{packSeasonTag && (
						<Label color="yellow">
							<Icon name="sun" />
							{packSeasonTag}
						</Label>
					)}
					{packDurationTag && (
						<Label color="blue">
							<Icon name="time" />
							{packDurationTag}
						</Label>
					)}
					{packDistanceTag && (
						<Label color="teal">
							<i className="fa-solid fa-person-hiking" style={{ paddingRight: '5px' }} />
							{packDistanceTag}
						</Label>
					)}
				</div>
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
