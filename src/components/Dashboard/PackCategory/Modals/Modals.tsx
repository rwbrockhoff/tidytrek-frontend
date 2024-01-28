import {
	Modal,
	ModalHeader,
	ModalContent,
	ModalActions,
	Button,
	Icon,
} from 'semantic-ui-react';

type DeleteModalProps = {
	open: boolean;
	onClose: () => void;
	onClickDelete: () => void;
	onClickMove: () => void;
};

type DeleteItemModalProps = {
	open: boolean;
	id: number | null;
	onClose: () => void;
	onClickDelete: (packItemId: number) => void;
	onClickMove: () => void;
};

export const DeleteModal = ({
	open,
	onClose,
	onClickDelete,
	onClickMove,
}: DeleteModalProps) => {
	return (
		<Modal size="mini" closeIcon open={open} onClose={onClose}>
			<ModalHeader>Are you sure?</ModalHeader>
			<ModalContent>
				<p>Do you want to delete or move your items?</p>
			</ModalContent>
			<ModalActions>
				<Button negative onClick={onClickDelete}>
					<Icon name="trash alternate outline" />
					Delete
				</Button>
				<Button positive onClick={onClickMove}>
					Move to Gear Closet
				</Button>
			</ModalActions>
		</Modal>
	);
};

export const DeleteItemModal = ({
	open,
	id,
	onClose,
	onClickDelete,
	onClickMove,
}: DeleteItemModalProps) => {
	const handleDelete = () => {
		if (id) onClickDelete(id);
	};

	return (
		<Modal size="mini" closeIcon open={open} onClose={onClose}>
			<ModalHeader>Are you sure?</ModalHeader>
			<ModalContent>
				<p>Do you want to delete or move your item to your gear closet?</p>
			</ModalContent>
			<ModalActions>
				<Button negative onClick={handleDelete}>
					<Icon name="trash alternate outline" />
					Delete
				</Button>
				<Button positive onClick={onClickMove}>
					Move to Gear Closet
				</Button>
			</ModalActions>
		</Modal>
	);
};
