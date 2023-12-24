import { Table, Button, Icon } from "semantic-ui-react";
import "./PackTable.css";
import TableRow from "./TableRow/TableRow";

interface Category {
  packCategoryName: string;
  items: [];
}

interface PackTableProps {
  category: Category;
  key: number;
}

const PackTable = (props: PackTableProps) => {
  const { packCategoryName, items } = props.category;
  return (
    <div className="table-container">
      <h3>{packCategoryName}</h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Item</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell width={3}>Weight</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item, idx) => (
            <TableRow item={item} key={item.packItemId || idx} />
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

export default PackTable;
