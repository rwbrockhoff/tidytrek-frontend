import { Table } from "semantic-ui-react";
import "./TableButtons.css";

interface ButtonProps {
  quantity: number;
  size: number;
  onClick: () => void;
}

const QuantityButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { quantity, size } = props;
  return (
    <Table.Cell className="table-button" textAlign="center" colSpan={size}>
      <p>{quantity || 0}</p>
    </Table.Cell>
  );
};

export default QuantityButton;
