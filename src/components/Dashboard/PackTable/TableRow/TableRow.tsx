import { Table } from "semantic-ui-react";
import TableCell from "../TableCell/TableCell";

interface Item {
  packItemName: string;
  packItemDescription: string;
}

interface TableRowProps {
  item: Item;
  key: number;
}

const TableRow = (props: TableRowProps) => {
  const { packItemName, packItemDescription } = props.item;
  return (
    <Table.Row>
      <TableCell value={packItemName} />
      <TableCell value={packItemDescription} />
      <TableCell value={"Weight"} />
    </Table.Row>
  );
};

export default TableRow;
