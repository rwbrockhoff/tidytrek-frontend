import { Table, Icon } from "semantic-ui-react";
import "./TableButtons.css";

interface ButtonProps {
  display: boolean;
  size: number;
  onClick: () => void;
}

const DeleteButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { size, display, onClick } = props;
  return (
    <Table.Cell className="table-button" textAlign="center" colSpan={size}>
      <button onClick={onClick} style={{ opacity: display ? 100 : 0 }}>
        <Icon name="trash" color="grey" />
      </button>
    </Table.Cell>
  );
};

export default DeleteButton;
