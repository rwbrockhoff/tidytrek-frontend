import { Table, Input } from "semantic-ui-react";
import { useState } from "react";
import WeightDropdown from "../TableButtons/WeightDropdown";
import "../TableCell/TableCell.css";
import "./PackWeightCell.css";

interface PackWeightCellProps {
  weight: string | number;
  unit: string;
  itemName: string;
  placeholder: number;
  showDropdown?: boolean;
  size: number;
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
    size,
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
      textAlign="right"
      colSpan={size}
      onMouseOver={toggleToEdit}
      onBlur={toggleToCell}
      onClick={toggleToEdit}
    >
      <div className="pack-weight-cell-container">
        {toggleInput ? (
          <Input
            className="weight-table-cell-input"
            value={weight || ""}
            name={itemName}
            placeholder={placeholder}
            onChange={onChange}
          />
        ) : (
          <p className="weight-table-cell-text">{weight || placeholder}</p>
        )}
        {showDropdown && <WeightDropdown unit={unit} onChange={onChange} />}
      </div>
    </Table.Cell>
  );
};

export default PackWeightCell;
