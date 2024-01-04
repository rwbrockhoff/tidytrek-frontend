import { Table } from "semantic-ui-react";
import TableCell from "../TableCell/TableCell";
import "./TableRow.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { PackItem } from "../../../../redux/packs/packTypes";
import {
  editPackItem,
  deletePackItem,
} from "../../../../redux/packs/packThunks";
import PackWeightCell from "../PackWeightCell/PackWeightCell";
import DeleteButton from "../TableButtons/DeleteButton";
import QuantityButton from "../TableButtons/QuantityButton";
import PropertyButtons from "../TableButtons/PropertyButtons";

interface TableRowProps {
  item: PackItem;
  key: number;
}

interface PackItemPropUpdate {
  consumable?: boolean;
  wornWeight?: boolean;
  favorite?: boolean;
}

const TableRow = (props: TableRowProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [toggleRow, setToggleRow] = useState(false);
  const [packItemChanged, setPackItemChanged] = useState(false);
  const [packItem, setPackItem] = useState({
    packItemName: "",
    packItemId: 0,
    packCategoryId: 0,
    packItemDescription: "",
    packItemWeight: 0,
    packItemUnit: "oz",
    packItemQuantity: 1,
    wornWeight: false,
    consumable: false,
    favorite: false,
  });

  useEffect(() => {
    setPackItem({
      ...props.item,
    });
  }, [props.item]);

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPackItem((prevFormData) => ({
      ...prevFormData,
      [e?.target?.name]: e?.target?.value,
    }));
    if (!packItemChanged) {
      setPackItemChanged(true);
    }
  };

  const handlePropButtons = (packItemPropUpdate: PackItemPropUpdate) => {
    const { packItemId } = props.item;
    dispatch(
      editPackItem({
        packItemId,
        packItem: { ...packItem, ...packItemPropUpdate },
      })
    );
  };

  const handleToggleOff = () => {
    if (packItemChanged) {
      const { packItemId } = props.item;
      dispatch(editPackItem({ packItemId, packItem }));
      setPackItemChanged(false);
    }
  };

  const handleDelete = () => {
    const { packItemId } = props.item;
    packItemId && dispatch(deletePackItem(packItemId));
  };

  const {
    packItemName,
    packItemDescription,
    packItemWeight,
    packItemUnit,
    packItemQuantity,
    wornWeight,
    consumable,
    favorite,
  } = packItem;
  return (
    <>
      <Table.Row
        verticalAlign="middle"
        className="table-row"
        onMouseOver={() => setToggleRow(true)}
        onMouseLeave={() => setToggleRow(false)}
      >
        <TableCell
          value={packItemName}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          itemName="packItemName"
          placeholder="Name"
          size={4}
        />
        <TableCell
          value={packItemDescription}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          itemName="packItemDescription"
          placeholder="Description"
          size={6}
        />
        <PropertyButtons
          wornWeight={wornWeight}
          consumable={consumable}
          favorite={favorite}
          onClick={handlePropButtons}
          display={toggleRow}
          size={2}
        />
        <QuantityButton
          quantity={packItemQuantity}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          size={1}
        />
        <PackWeightCell
          weight={packItemWeight}
          unit={packItemUnit}
          placeholder={0}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          itemName="packItemWeight"
          size={2}
        />
        <DeleteButton display={toggleRow} size={1} onClick={handleDelete} />
      </Table.Row>
    </>
  );
};

export default TableRow;
