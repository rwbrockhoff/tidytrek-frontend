import { Table, Input } from "semantic-ui-react";
import "./TableButtons.css";

interface ButtonProps {
  quantity: number;
  size: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleOff: () => void;
}

const QuantityButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { quantity, size, onChange, onToggleOff } = props;
  return (
    <Table.Cell className="table-button" textAlign="center" colSpan={size}>
      <Input
        fluid
        name="packItemQuantity"
        value={quantity}
        type="number"
        step={1}
        onChange={onChange}
        onBlur={onToggleOff}
      />
    </Table.Cell>
  );
};

export default QuantityButton;
