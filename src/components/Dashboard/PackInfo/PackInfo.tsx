import { Header, Label, Icon } from "semantic-ui-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import PackFormModal from "./PackFormModal/PackFormModal";
import "./PackInfo.css";

const PackInfo = () => {
  const currentPack = useSelector((state: RootState) => state.packs.pack);
  const [showIcon, setShowIcon] = useState(false);
  const [showPackModal, setShowPackModal] = useState(false);

  const handleToggleModal = () => setShowPackModal(!showPackModal);

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
        pack={currentPack}
      />
    </div>
  );
};

export default PackInfo;
