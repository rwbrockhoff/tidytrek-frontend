import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Icon,
} from "semantic-ui-react";
import "./PackModal.css";

interface PackModalProps {
  open: boolean;
  onClose: () => void;
  onClickDelete: () => void;
}

const PackModal = (props: PackModalProps) => {
  const { open, onClose, onClickDelete } = props;
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
        <Button positive>Move to Gear Closet</Button>
      </ModalActions>
    </Modal>
  );
};

export default PackModal;
