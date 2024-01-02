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

interface Item {
  packItemName: string;
  packItemId: number;
  packItemDescription: string;
  packItemWeight: number;
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
  });

  useEffect(() => {
    const { packItemName, packItemDescription, packItemWeight, packItemUnit } =
      props.item;
    setPackItem({
      packItemName,
      packItemDescription,
      packItemWeight,
      packItemUnit,
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

  const { packItemName, packItemDescription, packItemWeight, packItemUnit } =
    packItem;
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
        />
        <TableCell
          value={packItemDescription}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          itemName="packItemDescription"
          placeholder="Description"
        />
        <PackWeightCell
          weight={packItemWeight}
          unit={packItemUnit}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          itemName="packItemWeight"
          showDropdown={true}
        />
        {/* <TableCell
          value={packItemWeight}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          itemName="packItemWeight"
          showDropdown={true}
        /> */}
        <DeleteButton display={toggleRow} onClick={handleDelete} />
      </Table.Row>
    </>
  );
};

export default TableRow;
