import { Table, Input } from "semantic-ui-react";
import { useState } from "react";
import "./TableCell.css";

interface TableCellProps {
  value: string;
}

const TableCell = (props: TableCellProps) => {
  const { value } = props;
  const [toggleInput, setToggleInput] = useState(false);
  const toggleToEdit = () => !toggleInput && setToggleInput(true);
  const toggleToCell = () => toggleInput && setToggleInput(false);

  return (
    <Table.Cell
      onMouseOver={toggleToEdit}
      onMouseLeave={toggleToCell}
      onClick={toggleToEdit}
    >
      {toggleInput ? (
        <Input className="table-cell-input" value={value} />
      ) : (
        <p className="table-cell">{value}</p>
      )}
    </Table.Cell>
  );
};

export default TableCell;
