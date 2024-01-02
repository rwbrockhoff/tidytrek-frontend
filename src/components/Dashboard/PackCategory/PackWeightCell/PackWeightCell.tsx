import { Table, Input } from "semantic-ui-react";
import { useState } from "react";
import WeightDropdown from "../TableButtons/WeightDropdown";
import "../TableCell/TableCell.css";

interface PackWeightCellProps {
  weight: string | number;
  unit: string;
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

const PackWeightCell = (props: PackWeightCellProps) => {
  const {
    weight,
    unit,
    itemName,
    placeholder,
    showDropdown,
    onChange,
    onToggleOff,
  } = props;
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
          value={weight || ""}
          name={itemName}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <p className="table-cell-text">{weight || placeholder}</p>
      )}
      {showDropdown && <WeightDropdown unit={unit} onChange={onChange} />}
    </Table.Cell>
  );
};

export default PackWeightCell;
