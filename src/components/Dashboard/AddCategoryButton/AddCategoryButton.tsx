import { Button, Icon } from "semantic-ui-react";

interface AddCategoryButtonProps {
  onClick: () => void;
}

const AddCategoryButton = (props: AddCategoryButtonProps) => {
  return (
    <div>
      <Button
        color="grey"
        basic
        size="small"
        className="add-item-table-button"
        onClick={props.onClick}
      >
        <Icon name="tree" />
        Add Category
      </Button>
    </div>
  );
};

export default AddCategoryButton;
