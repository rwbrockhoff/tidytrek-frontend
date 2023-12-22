import { Table, Input, Button, Icon } from "semantic-ui-react";
import "./PackTable.css";

const PackTable = () => {
  return (
    <div className="table-container">
      <h3>Category</h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell width={3}>Weight</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Input className="table-input" />
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
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
