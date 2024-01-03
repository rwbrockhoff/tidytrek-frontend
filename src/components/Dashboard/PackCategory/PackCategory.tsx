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
  packItemUnit: string;
  packItemQuantity: number;
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
      <Table fixed striped columns="16" color="olive">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="12">
              <h3>{packCategoryName}</h3>
            </Table.HeaderCell>
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
