import { Table, Input, Popup, Icon } from "semantic-ui-react";
import { useState } from "react";
import "./ItemNameCell.css";

interface ItemNameCellProps {
  value: string | number;
  itemName: string;
  placeholder?: string;
  size: number;
  displayIcon: boolean;
  packItemUrl: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onToggleOff: () => void;
}

const ItemNameCell = (props: ItemNameCellProps) => {
  const {
    value,
    itemName,
    placeholder,
    size,
    packItemUrl,
    displayIcon,
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
      colSpan={size}
      className="item-name-cell"
      onMouseOver={toggleToEdit}
      onMouseLeave={toggleToCell}
      onBlur={toggleToCell}
      onClick={toggleToEdit}
    >
      {displayIcon && (
        <div
          className="grip-icon"
          onMouseOver={toggleToEdit}
          onMouseLeave={toggleToCell}
        >
          <i className="fa-solid fa-grip-vertical" />
        </div>
      )}
      <Input
        className="item-name-input"
        value={value || ""}
        name={itemName}
        placeholder={placeholder}
        onChange={onChange}
        transparent={!toggleInput}
        fluid
        style={{
          paddingLeft: !toggleInput ? "13px" : "0px",
          paddingRight: "35px",
        }}
      />
      <Popup
        on="click"
        pinned
        className="url-popup-container"
        trigger={
          <Icon
            name="linkify"
            className="url-link-icon"
            color={packItemUrl ? "blue" : "grey"}
            style={{ opacity: displayIcon || packItemUrl ? 100 : 0 }}
          />
        }
      >
        <Input
          name="packItemUrl"
          value={packItemUrl ?? ""}
          onChange={onChange}
          placeholder="Item link"
          className="url-save-input"
        />
        {/* <Button color="blue" className="url-save-button">
          Save
        </Button> */}

        {/* <Icon name="trash" /> */}
      </Popup>
    </Table.Cell>
  );
};

export default ItemNameCell;
