import { Table } from 'semantic-ui-react';
import { type Category, type PackItem } from '../../../types/packTypes';
import './PackCategory.css';
import TableRow from './TableRow/TableRow';
import TableHeader from './TableHeader/TableHeader';
import { DeleteModal, DeleteItemModal } from './Modals/Modals';
import { useState } from 'react';
import {
	useAddNewPackItemMutation,
	useEditPackItemMutation,
	useEditPackCategoryMutation,
	useMoveItemToClosetMutation,
	useDeletePackItemMutation,
	useDeletePackCategoryMutation,
	useDeletePackCategoryAndItemsMutation,
} from '../../../queries/packQueries';
import { Droppable } from 'react-beautiful-dnd';
import { weightConverter, quantityConverter } from '../../../utils/weightConverter';
import TableFooter from './TableFooter/TableFooter';

type PackCategoryProps = {
	category: Category;
	index: number;
	key: number;
};

const PackCategory = (props: PackCategoryProps) => {
	const { mutate: addPackItem } = useAddNewPackItemMutation();
	const { mutate: editPackItem } = useEditPackItemMutation();

	const { mutate: editPackCategory } = useEditPackCategoryMutation();
	const { mutate: movePackItem } = useMoveItemToClosetMutation();

	const { mutate: deletePackItem } = useDeletePackItemMutation();
	const { mutate: deleteCategory } = useDeletePackCategoryMutation();
	const { mutate: deleteCategoryAndItems } = useDeletePackCategoryAndItemsMutation();

	const { packCategoryName, packItems } = props.category;

	const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
	const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
	const [packItemToChange, setPackItemToChange] = useState<number | null>(null);
	const [isMinimized, setMinimized] = useState(false);

	const handleToggleCategoryModal = () =>
		setShowDeleteCategoryModal(!showDeleteCategoryModal);

	const handleToggleItemModal = () => setShowDeleteItemModal(!showDeleteItemModal);

	const handleAddItem = () => {
		const { packId, packCategoryId } = props.category;
		addPackItem({ packId, packCategoryId });
	};

	const handleMinimizeCategory = () => setMinimized(!isMinimized);

	const handleEditCategory = (packCategoryName: string) => {
		const { packCategoryId } = props.category;
		editPackCategory({ packCategoryId, packCategoryName });
	};

	const handleDeleteCategoryAndItems = () => {
		const { packCategoryId } = props.category;
		deleteCategoryAndItems(packCategoryId);
		setShowDeleteCategoryModal(false);
	};

	const handleDeleteCategory = () => {
		const { packCategoryId } = props.category;
		deleteCategory(packCategoryId);
		setShowDeleteCategoryModal(false);
	};

	const handleMoveItem = () => {
		if (packItemToChange) movePackItem(packItemToChange);
		setShowDeleteItemModal(false);
	};

	const handleDeleteItem = () => {
		if (packItemToChange) deletePackItem(packItemToChange);
		setShowDeleteItemModal(false);
	};

	const handleOnSave = (packItem: PackItem) => {
		const { packItemId } = packItem;
		editPackItem({ packItemId, packItem });
	};

	const handleDeleteItemPrompt = (packItemId: number) => {
		setPackItemToChange(packItemId);
		setShowDeleteItemModal(true);
	};

	const convertedCategoryWeight = weightConverter(packItems, 'lb');
	const itemQuantity = packItems[0] ? quantityConverter(packItems) : 0;
	const showCategoryItems = packItems[0] && !isMinimized;
	return (
		<div className="table-container">
			<Table fixed striped compact columns="16" color="olive" size="small">
				<TableHeader
					headerName={packCategoryName}
					isMinimized={isMinimized}
					minimizeCategory={handleMinimizeCategory}
					editCategory={handleEditCategory}
					deleteCategory={handleToggleCategoryModal}
				/>

				{showCategoryItems && (
					<Droppable droppableId={`${props.category.packCategoryId}`}>
						{(provided) => (
							<>
								<tbody ref={provided.innerRef} {...provided.droppableProps}>
									{packItems.map((item: PackItem, idx) => (
										<TableRow
											item={item}
											key={`${item.packCategoryId}${item.packItemId}`}
											index={idx}
											handleOnSave={handleOnSave}
											handleDelete={handleDeleteItemPrompt}
										/>
									))}
									{provided.placeholder}
								</tbody>
							</>
						)}
					</Droppable>
				)}

				{!isMinimized && (
					<TableFooter
						itemQuantity={itemQuantity}
						weight={convertedCategoryWeight}
						handleAddItem={handleAddItem}
					/>
				)}
			</Table>

			<DeleteModal
				open={showDeleteCategoryModal}
				onClickMove={handleDeleteCategory}
				onClickDelete={handleDeleteCategoryAndItems}
				onClose={handleToggleCategoryModal}
			/>

			<DeleteItemModal
				id={packItemToChange}
				open={showDeleteItemModal}
				onClose={handleToggleItemModal}
				onClickMove={handleMoveItem}
				onClickDelete={handleDeleteItem}
			/>
		</div>
	);
};

export default PackCategory;
