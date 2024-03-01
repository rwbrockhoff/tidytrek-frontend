import { Modal, ModalHeader, ModalContent, ModalActions, Icon } from 'semantic-ui-react';
import { Button } from './SemanticUI';
import styled from 'styled-components';
import { absoluteCenter } from '../mixins/mixins';
import { tidyTheme } from '../theme/tidyTheme';

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
		<CustomModal size="mini" closeIcon open={open} onClose={onClose}>
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
		</CustomModal>
	);
};

const CustomModal = styled(Modal)`
	${absoluteCenter}
`;

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

export const TidyModal = ({ children }: { children: React.ReactNode }) => {
	return (
		<StyledModal>
			<TidyModalHeader>
				<ModalHeaderText>Are you sure?</ModalHeaderText>
				<ModalCloseButtonContainer>
					<Icon name="close" />
				</ModalCloseButtonContainer>
			</TidyModalHeader>
			<ModalBody>{children}</ModalBody>

			<ModalFooter>
				<Button>Save</Button>
			</ModalFooter>
		</StyledModal>
	);
};

const StyledModal = styled.div`
	background-color: white;
	width: 400px;
	height: fit-content;
	position: absolute;
	z-index: 1001;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	border-radius: 5px;
	overflow: hidden;
`;

const TidyModalHeader = styled.div`
	display: flex;
	align-items: center;
	min-height: 50px;
	padding: 1.5em 2em;
	border-bottom: 1px solid ${tidyTheme.lightGrey};
`;

const ModalBody = styled.div`
	padding: 1em 2em;
`;

const ModalFooter = styled.div`
	background-color: #f9fafb;
	border-top: 1px solid ${tidyTheme.lightGrey};
	min-height: 50px;
	padding: 1em 2em;
	display: flex;
	justify-content: flex-end;
`;

const ModalHeaderText = styled.h3``;

const ModalCloseButtonContainer = styled.div``;
