import { Modal, ModalHeader, ModalContent, ModalActions, Icon } from 'semantic-ui-react';
import { Button } from './SemanticUI';

type DeleteModalProps = {
	open: boolean;
	onClose: () => void;
	onClickDelete: () => void;
	simple?: boolean;
	header?: string;
	message?: string;
	onClickMove?: () => void;
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
	simple,
	header,
	message,
	onClose,
	onClickDelete,
	onClickMove,
}: DeleteModalProps) => {
	return (
		<Modal size="mini" closeIcon open={open} onClose={onClose}>
			<ModalHeader>{header ? header : 'Are you sure?'}</ModalHeader>
			<ModalContent>
				<p>{message ? message : 'Do you want to delete or move your items?'}</p>
			</ModalContent>
			<ModalActions>
				<Button negative onClick={onClickDelete}>
					<Icon name="trash alternate outline" />
					Delete
				</Button>
				{!simple && (
					<Button $themeColor="primary" onClick={onClickMove}>
						Move to Gear Closet
					</Button>
				)}
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
				<Button $themeColor="primary" onClick={onClickMove}>
					Move to Gear Closet
				</Button>
			</ModalActions>
		</Modal>
	);
};
