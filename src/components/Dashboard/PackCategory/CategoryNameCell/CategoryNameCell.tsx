import { Table, Input } from "semantic-ui-react";
import { useState } from "react";

interface CategoryNameCellProps {
  size: number;
  categoryName: string;
  onToggleOff: (packCategoryName: string) => void;
}

const CategoryNameCell = (props: CategoryNameCellProps) => {
  const { size, onToggleOff, categoryName } = props;
  const [packCategoryName, setPackCategoryName] = useState(categoryName);
  const [toggleInput, setToggleInput] = useState(false);

  const toggleToEdit = () => !toggleInput && setToggleInput(true);

  const toggleToCell = () => {
    if (toggleInput) {
      setToggleInput(false);
      if (props.categoryName !== packCategoryName) {
        onToggleOff(packCategoryName);
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPackCategoryName(e.target.value);
  };
  return (
    <Table.HeaderCell
      colSpan={size}
      onMouseOver={toggleToEdit}
      onMouseLeave={toggleToCell}
      onBlur={toggleToCell}
      onClick={toggleToEdit}
    >
      <Input
        className="table-cell-input"
        value={packCategoryName || "Category"}
        name={"packCategoryName"}
        onChange={handleInput}
        // Show input background when user interacts
        transparent={!toggleInput}
        style={{
          fontSize: "1.5em",
          width: "fit-content",
          paddingLeft: !toggleInput ? "21px" : "0px",
        }}
      />
    </Table.HeaderCell>
  );
};

export default CategoryNameCell;
