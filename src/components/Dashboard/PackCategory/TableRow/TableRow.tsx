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
  });

  useEffect(() => {
    const { packItemName, packItemDescription, packItemWeight } = props.item;
    setPackItem({
      packItemName,
      packItemDescription,
      packItemWeight,
    });
  }, [props.item]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const { packItemName, packItemDescription, packItemWeight } = packItem;
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
        />
        <TableCell
          value={packItemDescription}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          itemName="packItemDescription"
        />
        <TableCell
          value={packItemWeight}
          onChange={handleInput}
          onToggleOff={handleToggleOff}
          itemName="packItemWeight"
        />
        <DeleteButton display={toggleRow} onClick={handleDelete} />
      </Table.Row>
    </>
  );
};

export default TableRow;
