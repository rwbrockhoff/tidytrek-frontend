import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@radix-ui/themes';
import { TrashIcon } from '@/components/ui/icons';
import { DeleteModal } from '@/components/ui';
import {
	useDeletePackMutation,
	useDeletePackAndItemsMutation,
} from '@/queries/pack-queries';
import { type Pack } from '@/types/pack-types';

type PackDeleteProps = {
	pack: Pick<Pack, 'packId' | 'packName'>;
	children?: React.ReactNode;
	buttonSize?: '2' | '3';
};

const deletePackMessage = `You can delete your pack permanently or move your pack items to your gear closet.`;

export const PackDelete = ({ pack, children, buttonSize = '2' }: PackDeleteProps) => {
	const navigate = useNavigate();
	const { mutate: deletePack } = useDeletePackMutation();
	const { mutate: deletePackAndItems } = useDeletePackAndItemsMutation();

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleToggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	const handleDeletePack = () => {
		deletePack(pack.packId);
		navigate('/');
	};

	const handleDeletePackAndItems = () => {
		deletePackAndItems(pack.packId);
		navigate('/');
	};

	// If children, use for the modal popup trigger
	if (children) {
		return (
			<>
				<div onClick={handleToggleDeleteModal}>{children}</div>

				<DeleteModal
					header={`Delete ${pack.packName} Pack?`}
					message={deletePackMessage}
					open={showDeleteModal}
					toggleOpen={handleToggleDeleteModal}
					onClickDelete={handleDeletePackAndItems}
					onClickMove={handleDeletePack}
				/>
			</>
		);
	}

	return (
		<>
			<Button
				variant="solid"
				color="tomato"
				size={buttonSize}
				onClick={handleToggleDeleteModal}>
				<TrashIcon />
				Delete Pack
			</Button>

			<DeleteModal
				header={`Delete ${pack.packName} Pack?`}
				message={deletePackMessage}
				open={showDeleteModal}
				toggleOpen={handleToggleDeleteModal}
				onClickDelete={handleDeletePackAndItems}
				onClickMove={handleDeletePack}
			/>
		</>
	);
};
