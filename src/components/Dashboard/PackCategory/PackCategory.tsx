import { Table, Button, Icon } from "semantic-ui-react";
import "./PackCategory.css";
import TableRow from "./TableRow/TableRow";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addPackItem } from "../../../redux/slices/packSlice";

interface Category {
  packCategoryName: string;
  packCategoryId: number;
  packId: number;
  packItems: [PackItem];
}

interface PackCategoryProps {
  category: Category;
  key: number;
}

interface PackItem {
  packItemName: string;
  packItemId: number;
  packItemDescription: string;
  packItemWeight: number;
}

const PackCategory = (props: PackCategoryProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { packCategoryName, packItems } = props.category;

  const handleAddItem = () => {
    const { packId, packCategoryId } = props.category;
    dispatch(addPackItem({ packId, packCategoryId }));
  };

  return (
    <div className="table-container">
      <h3>{packCategoryName}</h3>
      <Table celled striped color="olive">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Item</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell width={1}>Weight</Table.HeaderCell>
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
