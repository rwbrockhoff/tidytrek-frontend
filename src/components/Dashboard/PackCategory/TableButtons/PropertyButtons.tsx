import { Table, Icon } from "semantic-ui-react";
import "./PropertyButton.css";

interface ButtonProps {
  size: number;
  onClick: () => void;
}

const PropertyButtons: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { size } = props;
  return (
    <Table.Cell
      className="property-table-button"
      textAlign="center"
      colSpan={size}
    >
      <Icon name="favorite" />

      <Icon name="food" />

      <i className="fa-solid fa-shirt" />
    </Table.Cell>
  );
};

export default PropertyButtons;
