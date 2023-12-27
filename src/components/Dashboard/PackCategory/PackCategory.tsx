import { Table, Button, Icon } from "semantic-ui-react";
import "./PackCategory.css";
import TableRow from "./TableRow/TableRow";

interface Category {
  packCategoryName: string;
  packCategoryId: number;
  items: [];
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
  const { packCategoryName, items } = props.category;

  return (
    <div className="table-container">
      <h3>{packCategoryName}</h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Item</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell width={1}>Weight</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item: PackItem, idx) => (
            <TableRow item={item} key={item?.packItemId || idx} />
          ))}
        </Table.Body>
      </Table>
      <div className="footer-container">
        <Button color="blue" className="add-item-table-button">
          <Icon name="add" />
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default PackCategory;
