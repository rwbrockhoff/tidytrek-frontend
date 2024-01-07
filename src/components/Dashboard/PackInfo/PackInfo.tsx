import { Header, Label, Icon } from "semantic-ui-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import {
  deletePack,
  deletePackAndItems,
  getDefaultPack,
} from "../../../redux/packs/packThunks";
import PackFormModal from "./PackFormModal/PackFormModal";
import DeleteModal from "../PackCategory/DeleteModal/DeleteModal";
import "./PackInfo.css";

const PackInfo = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentPack = useSelector((state: RootState) => state.packs.pack);
  const [showIcon, setShowIcon] = useState(false);
  const [showPackModal, setShowPackModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggleModal = () => setShowPackModal(!showPackModal);

  const handleToggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const handleShowDeleteModal = () => {
    setShowPackModal(false);
    setShowDeleteModal(true);
  };

  const handleDeletePack = async () => {
    const { packId } = currentPack;
    await dispatch(deletePack(packId));
    await dispatch(getDefaultPack());
    setShowDeleteModal(false);
  };

  const handleDeletePackAndItems = async () => {
    const { packId } = currentPack;
    await dispatch(deletePackAndItems(packId));
    await dispatch(getDefaultPack());
    setShowDeleteModal(false);
  };

  const {
    packName,
    packDescription,
    packLocationTag,
    packDurationTag,
    packSeasonTag,
    packMilesTag,
    packUrl,
    packUrlName,
  } = currentPack;
  return (
    <div className="pack-info-container">
      <div
        className="pack-info-left-panel"
        onMouseOver={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        <Header as="h1">
          {packName}
          {showIcon && (
            <Icon
              name="pencil alternate"
              color="grey"
              onClick={handleToggleModal}
            />
          )}
        </Header>

        {packUrl && (
          <p>
            <a href={packUrl} target="_blank" className="pack-link">
              <Icon name="linkify" />
              {packUrlName || packUrl || "Pack Link"}
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
          {packMilesTag && (
            <Label color="teal">
              <i
                className="fa-solid fa-person-hiking"
                style={{ paddingRight: "5px" }}
              />
              {packMilesTag}
            </Label>
          )}
        </div>
      </div>
      {/* Right Hand Panel */}
      <div className="pack-info-right-panel"></div>
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
        onClickMoveItems={handleDeletePack}
      />
    </div>
  );
};

export default PackInfo;
