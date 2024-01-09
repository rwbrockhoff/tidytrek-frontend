import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Form,
  FormField,
  Checkbox,
  Input,
  Icon,
  TextArea,
  FormGroup,
  Divider,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { editPack } from '../../../../redux/packs/packThunks';
import { Pack } from '../../../../redux/packs/packTypes';
import './PackFormModal.css';
import PackTagProperties from './PackTagProperties/PackTagProperties';

interface PackFormModalProps {
  pack: Pack;
  open: boolean;
  onClose: () => void;
  onClickDelete: () => void;
}

const PackFormModal = (props: PackFormModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { pack, open, onClose, onClickDelete } = props;
  const [packChanged, setPackChanged] = useState(false);
  const [modifiedPack, setModifiedPack] = useState({
    packName: '',
    packDescription: '',
    packId: 0,
    userId: 0,
    packIndex: 0,
    packLocationTag: '',
    packSeasonTag: '',
    packDurationTag: '',
    packMilesTag: '',
    packPublic: false,
    packUrlName: '',
    packUrl: '',
    packAffiliate: false,
    packAffiliateDescription: '',
  });

  useEffect(() => {
    setModifiedPack({
      ...props.pack,
    });
  }, [props.pack]);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setModifiedPack((prevFormData) => ({
      ...prevFormData,
      [e?.target?.name]: e?.target?.value,
    }));
    if (!packChanged) {
      setPackChanged(true);
    }
  };

  const handleCheckBox = (updatedCheckbox: {
    packAffiliate?: boolean;
    packPublic?: boolean;
  }) => {
    setModifiedPack((prevFormData) => ({
      ...prevFormData,
      ...updatedCheckbox,
    }));
    if (!packChanged) {
      setPackChanged(true);
    }
  };

  const handleSubmitPack = () => {
    if (packChanged) {
      const { packId } = props.pack;
      dispatch(editPack({ packId, modifiedPack }));
      onClose();
    }
  };

  const {
    packPublic,
    packName,
    packDescription,
    packLocationTag,
    packSeasonTag,
    packDurationTag,
    packMilesTag,
    packUrl,
    packUrlName,
    packAffiliate,
    packAffiliateDescription,
  } = modifiedPack;

  return (
    <Modal size="small" closeIcon open={open} onClose={onClose}>
      <ModalHeader className="pack-form-modal-header">
        {packName ?? pack.packName ?? 'Pack'}
      </ModalHeader>
      <ModalContent>
        <Form>
          <FormField
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Checkbox
              toggle
              checked={packPublic}
              onClick={() => handleCheckBox({ packPublic: !packPublic })}
            />
            <label className="public-toggle-label">
              <Icon name="binoculars" /> Public
            </label>
          </FormField>
          <FormField>
            <label>Pack Name</label>
            <Input
              name="packName"
              value={packName ?? ''}
              onChange={handleFormChange}
              placeholder="Pack Name"
            />
          </FormField>
          <FormField>
            <label>Pack Description</label>
            <TextArea
              name="packDescription"
              value={packDescription ?? ''}
              onChange={handleFormChange}
              placeholder="Pack Description"
            />
          </FormField>

          <PackTagProperties
            packLocationTag={packLocationTag}
            packDurationTag={packDurationTag}
            packSeasonTag={packSeasonTag}
            packMilesTag={packMilesTag}
            handleFormChange={handleFormChange}
          />

          <FormGroup>
            <FormField width={6}>
              <label>Link Name</label>
              <Input
                name="packUrlName"
                value={packUrlName ?? ''}
                onChange={handleFormChange}
                placeholder="Gear Loadout Video"
              />
            </FormField>
            <FormField width={10}>
              <label>
                <Icon name="linkify" />
                Link
              </label>
              <Input
                name="packUrl"
                value={packUrl ?? ''}
                onChange={handleFormChange}
                placeholder="Blogpost, Youtube Video, etc."
              />
            </FormField>
          </FormGroup>

          <Divider />

          <FormField>
            <Checkbox
              toggle
              name="packAffiliate"
              checked={packAffiliate ?? false}
              onClick={() => handleCheckBox({ packAffiliate: !packAffiliate })}
              label="Click here if you use affiliate links for any of your pack items."
            />
          </FormField>
          {packAffiliate && (
            <FormField>
              <label>Custom Affiliate Message</label>
              <TextArea
                name="packAffiliateDescription"
                value={packAffiliateDescription ?? ''}
                onChange={handleFormChange}
                placeholder="You can include your own message. But by default we include the following affiliate message: Using the affiliate links in this pack helps support me at no extra cost to you!"
              />
            </FormField>
          )}
        </Form>
      </ModalContent>
      <ModalActions>
        <Button color="red" floated="left" basic onClick={onClickDelete}>
          <Icon name="trash" /> Delete Pack
        </Button>
        <Button color="blue" onClick={handleSubmitPack}>
          <Icon name="save outline" /> Save Pack
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default PackFormModal;
