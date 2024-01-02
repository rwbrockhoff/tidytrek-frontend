import { Table, Input } from "semantic-ui-react";
import { useState } from "react";
import WeightDropdown from "../TableButtons/WeightDropdown";
import "./TableCell.css";

interface TableCellProps {
  value: string | number;
  itemName: string;
  placeholder?: string;
  showDropdown?: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onToggleOff: () => void;
}

const TableCell = (props: TableCellProps) => {
  const { value, itemName, placeholder, showDropdown, onChange, onToggleOff } =
    props;
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
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <p className="table-cell-text">{value || placeholder}</p>
      )}
      {showDropdown && <WeightDropdown onChange={onChange} />}
    </Table.Cell>
  );
};

export default TableCell;
