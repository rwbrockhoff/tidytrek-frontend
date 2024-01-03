import { Table } from "semantic-ui-react";
import TableCell from "../TableCell/TableCell";
import "./TableRow.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import {
  editPackItem,
  deletePackItem,
} from "../../../../redux/slices/packSlice";
import PackWeightCell from "../PackWeightCell/PackWeightCell";
import DeleteButton from "../TableButtons/DeleteButton";
import QuantityButton from "../TableButtons/QuantityButton";
import PropertyButtons from "../TableButtons/PropertyButtons";

interface Item {
  packItemName: string;
  packItemId: number;
  packItemDescription: string;
  packItemWeight: number;
  packItemUnit: string;
  packItemQuantity: number;
}

interface TableRowProps {
  item: Item;
  key: number;
}

const TableRow = (props: TableRowProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [toggleRow, setToggleRow] = useState(false);
  const [packItemChanged, setPackItemChanged] = useState(false);
  const [packItem, setPackItem] = useState({
    packItemName: "",
    packItemDescription: "",
    packItemWeight: 0,
    packItemUnit: "oz",
    packItemQuantity: 1,
  });

  useEffect(() => {
    const {
      packItemName,
      packItemDescription,
      packItemWeight,
      packItemUnit,
      packItemQuantity,
    } = props.item;
    setPackItem({
      packItemName,
      packItemDescription,
      packItemWeight,
      packItemUnit,
      packItemQuantity,
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
        <PropertyButtons size={2} onClick={() => console.log("PROP BUTTONS")} />
        <QuantityButton
          quantity={packItemQuantity}
          size={1}
          onClick={handleInput}
        />
        <PackWeightCell
          weight={packItemWeight}
          unit={packItemUnit}
          placeholder={0}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          itemName="packItemWeight"
          showDropdown={true}
          size={2}
        />
        <DeleteButton display={toggleRow} size={1} onClick={handleDelete} />
      </Table.Row>
    </>
  );
};

export default TableRow;
