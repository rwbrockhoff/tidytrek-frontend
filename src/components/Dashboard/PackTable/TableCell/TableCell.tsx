import { Table, Input } from "semantic-ui-react";
import { useState } from "react";
import "./TableCell.css";

const TableCell: React.FC = () => {
  const [toggleInput, setToggleInput] = useState(false);
  const textInput = "This is a cell";
  const toggleToEdit = () => !toggleInput && setToggleInput(true);
  const toggleToCell = () => toggleInput && setToggleInput(false);

  return (
    <Table.Cell
      onMouseOver={toggleToEdit}
      onMouseLeave={toggleToCell}
      onClick={toggleToEdit}
    >
      {toggleInput ? (
        <Input className="table-cell-input" value={textInput} />
      ) : (
        <p className="table-cell">{textInput}</p>
      )}
    </Table.Cell>
  );
};

export default TableCell;
