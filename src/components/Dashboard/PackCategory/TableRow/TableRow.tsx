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
import ItemNameCell from "../ItemNameCell/ItemNameCell";
import PackWeightCell from "../PackWeightCell/PackWeightCell";
import DeleteButton from "../TableButtonCells/DeleteButton";
import QuantityButton from "../TableButtonCells/QuantityButton";
import PropertyButtons from "../TableButtonCells/PropertyButtons";
import { Draggable } from "react-beautiful-dnd";
import React from "react";

interface TableRowProps {
  item: PackItem;
  key: string;
  index: number;
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
    packItemUrl: "",
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
    packItemId,
    packCategoryId,
    packItemWeight,
    packItemUnit,
    packItemQuantity,
    packItemUrl,
    wornWeight,
    consumable,
    favorite,
  } = packItem;

  const dropId = `${packItemId}`;

  return (
    <Draggable key={dropId} draggableId={dropId} index={props.index}>
      {(provided) => (
        <tr
          className="table-row"
          onMouseOver={() => setToggleRow(true)}
          onMouseLeave={() => setToggleRow(false)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ItemNameCell
            value={packItemName}
            packItemUrl={packItemUrl}
            displayIcon={toggleRow}
            onChange={handleInput}
            onToggleOff={handleToggleOff}
            itemName="packItemName"
            placeholder="Name"
            size={3}
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
            size={3}
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
        </tr>
      )}
    </Draggable>
  );
};

export default TableRow;
