import { Table, Button, Icon } from "semantic-ui-react";
import { Category, PackItem } from "../../../redux/packs/packTypes";
import "./PackCategory.css";
import TableRow from "./TableRow/TableRow";
import CategoryNameCell from "./CategoryNameCell/CategoryNameCell";
import DeleteButton from "./TableButtonCells/DeleteButton";
import DeleteModal from "./DeleteModal/DeleteModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  addPackItem,
  deletePackCategory,
  editPackCategory,
  deleteCategoryAndItems,
} from "../../../redux/packs/packThunks";
import { Droppable } from "react-beautiful-dnd";
import weightConverter from "../../../utils/weightConverter";

interface PackCategoryProps {
  category: Category;
  index: number;
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

  const convertedCategoryWeight = weightConverter(packItems, "lb");
  const itemQuantity = packItems[0] ? packItems.length : 0;
  return (
    <div className="table-container">
      <Table fixed striped compact columns="16" color="olive" size="small">
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
            <Table.HeaderCell
              textAlign="center"
              colSpan="2"
              style={{ paddingLeft: "50px" }}
            >
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

        {packItems[0] && (
          <Droppable droppableId={`${props.category.packCategoryId}`}>
            {(provided) => (
              <>
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {packItems.map((item: PackItem, idx) => (
                    <TableRow
                      item={item}
                      key={`${item.packCategoryId}${item.packItemId}`}
                      index={idx}
                    />
                  ))}
                  {provided.placeholder}
                </tbody>
              </>
            )}
          </Droppable>
        )}
        <Table.Footer>
          <Table.Row className="footer-container">
            <Table.Cell colSpan={12}>
              <Button
                size="mini"
                floated="left"
                compact
                basic
                className="add-item-table-button"
                onClick={handleAddItem}
              >
                <Icon name="add" />
                Add Item
              </Button>
            </Table.Cell>
            <Table.Cell colSpan={2}>{itemQuantity} Items</Table.Cell>
            <Table.Cell colSpan={2}>
              {`${convertedCategoryWeight} lbs`}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <DeleteModal
        open={showModal}
        onClose={handleToggleModal}
        onClickMoveItems={handleDeleteCategory}
        onClickDelete={handleDeleteCategoryAndItems}
      />
    </div>
  );
};

export default PackCategory;
