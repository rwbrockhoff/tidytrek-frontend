import { Table, Button, Icon } from "semantic-ui-react";
import { Category, PackItem } from "../../../redux/packs/packTypes";
import "./PackCategory.css";
import TableRow from "./TableRow/TableRow";
import CategoryNameCell from "./CategoryNameCell/CategoryNameCell";
import DeleteButton from "./TableButtons/DeleteButton";
import PackModal from "../PackModal/PackModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  addPackItem,
  deletePackCategory,
  editPackCategory,
  deleteCategoryAndItems,
} from "../../../redux/packs/packThunks";

interface PackCategoryProps {
  category: Category;
  key: number;
}

const PackCategory = (props: PackCategoryProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { packCategoryName, packItems } = props.category;
  const [toggleRow, setToggleRow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddItem = () => {
    const { packId, packCategoryId } = props.category;
    dispatch(addPackItem({ packId, packCategoryId }));
  };

  const handleEditCategory = (packCategoryName: string) => {
    const { packCategoryId } = props.category;
    dispatch(editPackCategory({ packCategoryId, packCategoryName }));
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDeleteCategoryAndItems = () => {
    const { packCategoryId } = props.category;
    dispatch(deleteCategoryAndItems(packCategoryId));
    setShowModal(false);
  };

  const handleDeleteCategory = () => {
    const { packCategoryId } = props.category;
    dispatch(deletePackCategory(packCategoryId));
    setShowModal(false);
  };

  return (
    <div className="table-container">
      <Table fixed striped compact columns="16" color="olive">
        <Table.Header
          onMouseOver={() => setToggleRow(true)}
          onMouseLeave={() => setToggleRow(false)}
        >
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

            <DeleteButton
              header
              size={1}
              display={toggleRow}
              onClick={handleToggleModal}
            />
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
          compact
          basic
          className="add-item-table-button"
          onClick={handleAddItem}
        >
          <Icon name="add" />
          Add Item
        </Button>
      </div>
      <PackModal
        open={showModal}
        onClose={handleToggleModal}
        onClickMoveItems={handleDeleteCategory}
        onClickDelete={handleDeleteCategoryAndItems}
      />
    </div>
  );
};

export default PackCategory;
