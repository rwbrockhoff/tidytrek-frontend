import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Icon,
} from 'semantic-ui-react';
import './DeleteModal.css';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onClickDelete: () => void;
  onClickMoveItems: () => void;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { open, onClose, onClickDelete, onClickMoveItems } = props;
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
        <Button positive onClick={onClickMoveItems}>
          Move to Gear Closet
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default DeleteModal;
