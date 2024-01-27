import { Table, Button, Icon } from 'semantic-ui-react';
import { type Category, type PackItem } from '../../../redux/packs/packTypes';
import './PackCategory.css';
import TableRow from './TableRow/TableRow';
import CategoryNameCell from './CategoryNameCell/CategoryNameCell';
import DeleteButton from './TableButtonCells/DeleteButton';
import DeleteModal from './DeleteModal/DeleteModal';
import { useState } from 'react';
import {
	useAddPackItemMutation,
	useEditPackItemMutation,
	useEditPackCategoryMutation,
	useDeletePackItemMutation,
	useDeletePackCategoryMutation,
	useDeletePackCategoryAndItemsMutation,
} from '../../../redux/newPacks/newPacksApiSlice';
import { Droppable } from 'react-beautiful-dnd';
import { weightConverter, quantityConverter } from '../../../utils/weightConverter';

type PackCategoryProps = {
	category: Category;
	index: number;
	key: number;
};

const PackCategory = (props: PackCategoryProps) => {
	const [addPackItem] = useAddPackItemMutation();
	const [editPackItem] = useEditPackItemMutation();
	const [editPackCategory] = useEditPackCategoryMutation();
	const [deletePackItem] = useDeletePackItemMutation();
	const [deleteCategory] = useDeletePackCategoryMutation();
	const [deleteCategoryAndItems] = useDeletePackCategoryAndItemsMutation();

	const { packCategoryName, packItems } = props.category;
	const [toggleRow, setToggleRow] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleAddItem = () => {
		const { packId, packCategoryId } = props.category;
		addPackItem({ packId, packCategoryId });
	};

	const handleEditCategory = (packCategoryName: string) => {
		const { packCategoryId } = props.category;
		editPackCategory({ packCategoryId, packCategoryName });
	};

	const handleToggleModal = () => {
		setShowModal(!showModal);
	};

	const handleDeleteCategoryAndItems = () => {
		const { packCategoryId } = props.category;
		deleteCategoryAndItems(packCategoryId);
		setShowModal(false);
	};

	const handleDeleteCategory = () => {
		const { packCategoryId } = props.category;
		deleteCategory(packCategoryId);
		setShowModal(false);
	};

	const handleToggleOff = (packItem: PackItem) => {
		const { packItemId } = packItem;
		editPackItem({ packItemId, packItem });
	};

	const handleDelete = (packItemId: number) => {
		packItemId && deletePackItem(packItemId);
	};

	const convertedCategoryWeight = weightConverter(packItems, 'lb');
	const itemQuantity = packItems[0] ? quantityConverter(packItems) : 0;
	return (
		<div className="table-container">
			<Table fixed striped compact columns="16" color="olive" size="small">
				<Table.Header
					className="category-table-header"
					onMouseOver={() => setToggleRow(true)}
					onMouseLeave={() => setToggleRow(false)}>
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
							style={{ paddingLeft: '50px' }}>
							Weight
						</Table.HeaderCell>

						<DeleteButton
							header
							size={1}
							display={toggleRow}
							onClickToggle={handleToggleModal}
							onClickDelete={handleToggleModal}
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
											gearClosetItem={false}
											handleToggleOff={handleToggleOff}
											handleDelete={handleDelete}
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
								onClick={handleAddItem}>
								<Icon name="add" />
								Add Item
							</Button>
						</Table.Cell>
						<Table.Cell colSpan={2}>{itemQuantity} Items</Table.Cell>
						<Table.Cell colSpan={2}>{`${convertedCategoryWeight} lbs`}</Table.Cell>
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
