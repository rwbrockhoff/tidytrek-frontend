import "./PackList.css";
import { useSelector } from "react-redux";
import { Header, Divider, Icon } from "semantic-ui-react";
import { PackListItem } from "../../../redux/packs/packTypes";
import { RootState, AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { addNewPack } from "../../../redux/packs/packThunks";

const PackList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const packList = useSelector((state: RootState) => state.packs.packList);

  const handleClick = () => {
    dispatch(addNewPack());
  };
  return (
    <div className="pack-list-container">
      <Header as="h3" className="pack-title">
        Packs
      </Header>
      {packList.map((pack: PackListItem) => {
        return <p key={pack.packId}>{pack.packName}</p>;
      })}
      <Divider />
      <p onClick={handleClick}>
        <Icon name="add" />
        Create New Pack
      </p>
    </div>
  );
};

export default PackList;
