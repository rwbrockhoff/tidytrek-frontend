import { useNavigate } from 'react-router-dom';
import { type PackListItem as PackListItemType } from '@/types/pack-types';
import { DragDropContext, DropResult } from '@/components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { PackListItem } from './pack-list-item';
import { Separator } from '@radix-ui/themes';
import { useMovePackMutation } from '@/queries/pack-queries';

import { encode, calculateAdjacentItems, applySynchronousDragUpdate } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { packListKeys } from '@/queries/query-keys';
import { CreatePackMenu } from './create-pack-menu';

type PackListProps = {
	currentPackId: number | undefined;
	packList: PackListItemType[];
};

export const PackList = ({ currentPackId, packList }: PackListProps) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: movePack } = useMovePackMutation();

	const handleGetPack = async (packId: number) => {
		const { pathname } = location;
		if (currentPackId === undefined) navigate('/');
		const encodedId = encode(packId);
		if (packId !== currentPackId) navigate(`/pack/${encodedId}`);
		if (pathname !== '/') navigate(`/pack/${encodedId}`);
	};

	const handleOnDragEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;
		const sameIndex = destination.index === source.index;
		if (sameIndex) return;

		applySynchronousDragUpdate<{ packList: PackListItemType[] }>(
			queryClient,
			packListKeys.all,
			source.index,
			destination.index,
			'packList',
		);

		// Calculate adjacent packs for fractional indexing
		const { prevItem: prevPack, nextItem: nextPack } = calculateAdjacentItems(
			packList,
			source.index,
			destination.index,
		);

		movePack({
			packId: draggableId,
			prevPackIndex: prevPack?.packIndex,
			nextPackIndex: nextPack?.packIndex,
		});
	};

	return (
		<div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable
					droppableId={'sidebar-pack-list'}
					type="packlist-item"
					// renderClone required in position absolute parent (sidebar)
					// in order to display item while isDragging
					renderClone={(provided, _snapshot, rubric) => {
						const index = rubric.source.index;
						const pack = packList[index];
						return (
							<div {...provided.draggableProps} ref={provided.innerRef}>
								<PackListItem
									pack={pack}
									onClick={handleGetPack}
									dragProps={{ ...provided.dragHandleProps }}
								/>
							</div>
						);
					}}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{packList.map((pack: PackListItemType, index: number) => {
								return (
									<Draggable
										key={pack.packId}
										draggableId={`${pack.packId}`}
										index={index}>
										{(provided) => (
											<div ref={provided.innerRef} {...provided.draggableProps}>
												<PackListItem
													pack={pack}
													onClick={handleGetPack}
													dragProps={{ ...provided.dragHandleProps }}
												/>
											</div>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<Separator my="4" />

			<CreatePackMenu />
		</div>
	);
};
