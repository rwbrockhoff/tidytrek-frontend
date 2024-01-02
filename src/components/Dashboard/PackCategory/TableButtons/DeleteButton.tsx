import { Table, Icon } from "semantic-ui-react";
import "./TableButtons.css";

interface ButtonProps {
  display: boolean;
  onClick: () => void;
}

const DeleteButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return props.display ? (
    <Table.Cell className="table-button">
      <button onClick={props.onClick}>
        <Icon name="trash" color="grey" />
      </button>
    </Table.Cell>
  ) : null;
};

export default DeleteButton;
