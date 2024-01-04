import { Header, Label, Icon } from "semantic-ui-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import "./PackInfo.css";

const PackInfo = () => {
  const packInfo = useSelector((state: RootState) => state.packs.pack);
  const [showIcon, setShowIcon] = useState(false);
  const {
    packName,
    packDescription,
    packLocationTag,
    packDurationTag,
    packSeasonTag,
  } = packInfo;
  return (
    <div className="pack-info-container">
      <div
        className="pack-info-left-panel"
        onMouseOver={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        <Header as="h1">
          {packName}
          {showIcon && <Icon name="edit outline" color="grey" />}
        </Header>
        <p>{packDescription}</p>
        <div className="pack-info-tag-container">
          <Label color="olive">
            <Icon name="location arrow" />
            {packLocationTag}
          </Label>
          <Label color="blue">
            <Icon name="time" />
            {packDurationTag}
          </Label>
          <Label color="yellow">
            <Icon name="sun" />
            {packSeasonTag}
          </Label>
          <Label color="teal">
            <i className="fa-solid fa-person-hiking" /> Thruhike
          </Label>
        </div>
      </div>
      {/* Right Hand Panel */}
      <div className="pack-info-right-panel"></div>
    </div>
  );
};

export default PackInfo;
