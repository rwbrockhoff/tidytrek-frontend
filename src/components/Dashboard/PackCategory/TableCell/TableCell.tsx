import { Table, Input } from "semantic-ui-react";
import { useState } from "react";
import "./TableCell.css";

interface TableCellProps {
  value: string | number;
  itemName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleOff: () => void;
}

const TableCell = (props: TableCellProps) => {
  const { value, itemName, onChange, onToggleOff } = props;
  const [toggleInput, setToggleInput] = useState(false);
  const toggleToEdit = () => !toggleInput && setToggleInput(true);
  const toggleToCell = () => {
    if (toggleInput) {
      setToggleInput(false);
      onToggleOff();
    }
  };

  return (
    <Table.Cell
      onMouseOver={toggleToEdit}
      onMouseLeave={toggleToCell}
      onClick={toggleToEdit}
    >
      {toggleInput ? (
        <Input
          className="table-cell-input"
          value={value || ""}
          name={itemName}
          onChange={onChange}
        />
      ) : (
        <p className="table-cell">{value}</p>
      )}
    </Table.Cell>
  );
};

export default TableCell;
