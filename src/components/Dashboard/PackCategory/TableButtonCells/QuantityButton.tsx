import { Table, Input } from "semantic-ui-react";
import { useState } from "react";
import "./TableButtons.css";

interface ButtonProps {
  quantity: number;
  size: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleOff: () => void;
}

const QuantityButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { quantity, size, onChange, onToggleOff } = props;

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
      className="table-button"
      textAlign="center"
      colSpan={size}
      onMouseOver={toggleToEdit}
      onMouseLeave={toggleToCell}
      onBlur={toggleToCell}
      onClick={toggleToEdit}
    >
      <Input
        fluid
        name="packItemQuantity"
        value={quantity}
        type="number"
        step={1}
        transparent={!toggleInput}
        onChange={onChange}
        style={{ paddingLeft: toggleInput ? "0px" : "12px" }}
      />
    </Table.Cell>
  );
};

export default QuantityButton;
