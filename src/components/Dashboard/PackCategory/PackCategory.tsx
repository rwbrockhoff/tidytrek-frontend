import { Table, Button, Icon } from "semantic-ui-react";
import { Category, PackItem } from "../../../redux/packs/packTypes";
import "./PackCategory.css";
import TableRow from "./TableRow/TableRow";
import CategoryNameCell from "./CategoryNameCell/CategoryNameCell";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addPackItem, editPackCategory } from "../../../redux/packs/packThunks";

interface PackCategoryProps {
  category: Category;
  key: number;
}

const PackCategory = (props: PackCategoryProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { packCategoryName, packItems } = props.category;

  const handleAddItem = () => {
    const { packId, packCategoryId } = props.category;
    dispatch(addPackItem({ packId, packCategoryId }));
  };

  const handleEditCategory = (packCategoryName: string) => {
    const { packCategoryId } = props.category;
    dispatch(editPackCategory({ packCategoryId, packCategoryName }));
  };

  return (
    <div className="table-container">
      <Table fixed striped compact columns="16" color="olive">
        <Table.Header>
          <Table.Row>
            <CategoryNameCell
              size={12}
              categoryName={packCategoryName}
              onToggleOff={handleEditCategory}
            />

            <Table.HeaderCell textAlign="center" colSpan="1">
              Qty
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" colSpan="2">
              Weight
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="1"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {packItems.map((item: PackItem, idx) => (
            <TableRow item={item} key={item?.packItemId || idx} />
          ))}
        </Table.Body>
      </Table>
      <div className="footer-container">
        <Button
          color="blue"
          size="small"
          className="add-item-table-button"
          onClick={handleAddItem}
        >
          <Icon name="add" />
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default PackCategory;
