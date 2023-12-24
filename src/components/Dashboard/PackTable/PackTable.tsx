import { Table, Input, Button, Icon } from "semantic-ui-react";
import "./PackTable.css";
import TableCell from "./TableCell/TableCell";

const PackTable = () => {
  return (
    <div className="table-container">
      <h3>Category</h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Item</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell width={3}>Weight</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <TableCell />
            <TableCell />
            <TableCell />
          </Table.Row>
          <Table.Row>
            <TableCell />
            <TableCell />
            <TableCell />
          </Table.Row>
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
