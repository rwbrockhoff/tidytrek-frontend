import { Table, Icon } from "semantic-ui-react";
import "./PropertyButton.css";

interface ButtonProps {
  size: number;
  wornWeight: boolean;
  consumable: boolean;
  favorite: boolean;
  display: boolean;
  onClick: ({}) => void;
}

const PropertyButtons: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { size, wornWeight, consumable, favorite, display, onClick } = props;
  return (
    <Table.Cell
      className="property-table-button"
      textAlign="center"
      colSpan={size}
    >
      <Icon
        name="favorite"
        color={favorite ? "yellow" : "grey"}
        style={{ opacity: display || favorite ? 100 : 0 }}
        onClick={() => onClick({ favorite: !favorite })}
      />

      <Icon
        name="food"
        color={consumable ? "olive" : "grey"}
        style={{ opacity: display || consumable ? 100 : 0 }}
        onClick={() => onClick({ consumable: !consumable })}
      />

      <i
        className={`fa-solid fa-shirt ${wornWeight && "worn-weight-item"}`}
        style={{ opacity: display || wornWeight ? 100 : 0 }}
        onClick={() => onClick({ wornWeight: !wornWeight })}
      />
    </Table.Cell>
  );
};

export default PropertyButtons;
